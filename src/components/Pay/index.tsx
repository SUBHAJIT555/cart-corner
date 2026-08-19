"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";
import Breadcrumb from "../Common/Breadcrumb";
import { CandyButtonLink } from "@/components/ui/candy-button";

const PENDING_ORDER_KEY = "cc_pending_order_id";
const HOSTED_CHECKOUT_URL_KEY = "cc_hosted_checkout_url";

type PayView = "loading" | "pay" | "success" | "failed" | "missing";

type StatusPayload = {
  status?: string;
  order_id?: string;
  amount?: string | number;
  txn_id?: string;
  error?: string;
  message?: string;
  qr_data?: string;
  intent_url?: string;
  payer_vpa?: string;
  payment_mode?: string;
};

function resolvePayStatus(result: StatusPayload) {
  const status = (result.status || "pending").toLowerCase();
  const msg = `${result.message || ""} ${result.error || ""}`.toLowerCase();
  if (
    status === "failed" &&
    /not found|database error|no record|does not exist/.test(msg)
  ) {
    return "pending";
  }
  return status;
}

function isSafeHostedCheckoutUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname.endsWith("mpurse.io");
  } catch {
    return false;
  }
}

function isPhoneBrowser() {
  if (typeof navigator === "undefined") {
    return false;
  }
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function qrImageSrc(qrData?: string, intentUrl?: string) {
  if (qrData) {
    return qrData.startsWith("data:")
      ? qrData
      : `data:image/png;base64,${qrData}`;
  }
  if (intentUrl) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&ecc=M&data=${encodeURIComponent(intentUrl)}`;
  }
  return "";
}

const Pay = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [view, setView] = useState<PayView>("loading");
  const [details, setDetails] = useState<StatusPayload>({});
  const [isPhone, setIsPhone] = useState(false);
  const [hostedUrl, setHostedUrl] = useState("");

  useEffect(() => {
    setIsPhone(isPhoneBrowser());
    const stored = sessionStorage.getItem(HOSTED_CHECKOUT_URL_KEY) || "";
    if (stored && isSafeHostedCheckoutUrl(stored)) {
      setHostedUrl(stored);
    }
  }, []);

  useEffect(() => {
    const orderId =
      searchParams.get("order_id") ||
      sessionStorage.getItem(PENDING_ORDER_KEY) ||
      "";

    if (!orderId) {
      setView("missing");
      return;
    }

    if (searchParams.get("flow") === "hosted") {
      setView("pay");
    }

    const poll = { cancelled: false, timer: 0 };

    const check = async () => {
      const res = await fetch("/api/mpurse.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "status", order_id: orderId }),
      });
      const raw = await res.text();
      let result: StatusPayload = {};
      try {
        result = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error("Payment PHP is not running.");
      }
      if (poll.cancelled) {
        return null;
      }
      setDetails(result);
      return resolvePayStatus(result);
    };

    const finish = (next: PayView) => {
      if (poll.timer) {
        window.clearInterval(poll.timer);
        poll.timer = 0;
      }
      if (next === "success") {
        dispatch(removeAllItemsFromCart());
        sessionStorage.removeItem(PENDING_ORDER_KEY);
        sessionStorage.removeItem(HOSTED_CHECKOUT_URL_KEY);
      }
      setView(next);
    };

    const run = async () => {
      try {
        const status = await check();
        if (poll.cancelled || !status) {
          return;
        }
        if (status === "success" || status === "failed") {
          finish(status);
          return;
        }
        setView("pay");
      } catch {
        if (!poll.cancelled) {
          setDetails({ error: "Unable to load payment." });
          setView("pay");
        }
        return;
      }

      poll.timer = window.setInterval(() => {
        void (async () => {
          try {
            const next = await check();
            if (poll.cancelled || !next) {
              return;
            }
            if (next === "success" || next === "failed") {
              finish(next);
            }
          } catch {
            /* keep waiting */
          }
        })();
      }, 3000);
    };

    void run();

    return () => {
      poll.cancelled = true;
      if (poll.timer) {
        window.clearInterval(poll.timer);
      }
    };
  }, [dispatch, searchParams]);

  const amountLabel =
    details.amount !== undefined && details.amount !== null && details.amount !== ""
      ? `₹${Number(details.amount).toLocaleString("en-IN")}`
      : "";
  const qrSrc = qrImageSrc(details.qr_data, details.intent_url);

  return (
    <>
      <Breadcrumb
        title="Payment"
        pages={["Pay"]}
        description="Complete your UPI payment. Keep this page open until you see success."
      />
      <section className="minimal-checkout-page">
        <div className="max-w-[560px] w-full mx-auto px-4 sm:px-6 xl:px-0">
          <div className="pay-status">
            {view === "loading" && (
              <>
                <h2 className="pay-status__title font-heading">Preparing payment…</h2>
                <p className="pay-status__text">Please wait.</p>
              </>
            )}

            {view === "pay" && (
              <>
                <h2 className="pay-status__title font-heading">Complete payment</h2>
                <p className="pay-status__text">
                  {amountLabel ? `Amount: ${amountLabel}. ` : ""}
                  {details.order_id ? `Order ${details.order_id}.` : ""}
                </p>

                {details.payer_vpa && (
                  <p className="pay-status__note">
                    A payment request was sent to <strong>{details.payer_vpa}</strong>.
                    Open GPay, PhonePe, Paytm, or your bank UPI app and approve it.
                    This page will update automatically.
                  </p>
                )}

                {hostedUrl && (
                  <button
                    type="button"
                    onClick={() => window.location.assign(hostedUrl)}
                    className="pay-status__upi"
                  >
                    Continue to secure card / net banking
                  </button>
                )}

                {isPhone && details.intent_url && (
                  <a href={details.intent_url} className="pay-status__upi">
                    Open UPI app
                  </a>
                )}

                {qrSrc && (
                  <>
                    <p className="pay-status__hint">
                      {isPhone
                        ? "Or scan this QR from another phone"
                        : "There is no UPI app on a computer. Scan this QR with GPay, PhonePe, Paytm, or any UPI app on your phone."}
                    </p>
                    <div className="pay-status__qr">
                      <img src={qrSrc} alt="UPI QR code" />
                    </div>
                  </>
                )}

                {!details.payer_vpa && !qrSrc && !details.intent_url && !hostedUrl && (
                  <p className="pay-status__error" role="alert">
                    {details.error ||
                      details.message ||
                      "Payment details are not available. Go back to checkout and try again."}
                  </p>
                )}

                <p className="pay-status__meta">
                  This page checks payment status automatically. Keep it open until
                  you see success.
                </p>
              </>
            )}

            {view === "success" && (
              <>
                <h2 className="pay-status__title font-heading">Payment successful</h2>
                <p className="pay-status__text">
                  {details.order_id ? `Order ID: ${details.order_id}. ` : ""}
                  {amountLabel ? `Amount paid: ${amountLabel}.` : ""}
                </p>
                <CandyButtonLink href="/" className="pay-status__cta">
                  Continue shopping
                </CandyButtonLink>
              </>
            )}

            {view === "failed" && (
              <>
                <h2 className="pay-status__title font-heading">Payment failed</h2>
                <p className="pay-status__text">
                  {details.message ||
                    details.error ||
                    "The UPI payment was not completed. Your cart is still saved."}
                </p>
                <CandyButtonLink href="/checkout" className="pay-status__cta">
                  Try again
                </CandyButtonLink>
              </>
            )}

            {view === "missing" && (
              <>
                <h2 className="pay-status__title font-heading">No order found</h2>
                <p className="pay-status__text">
                  Start checkout again to generate a new UPI payment.
                </p>
                <CandyButtonLink href="/checkout" className="pay-status__cta">
                  Go to checkout
                </CandyButtonLink>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Pay;
