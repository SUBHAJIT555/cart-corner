"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";
import Breadcrumb from "../Common/Breadcrumb";
import { CandyButtonLink } from "@/components/ui/candy-button";

const PENDING_ORDER_KEY = "cc_pending_order_id";

type PaymentView = "checking" | "success" | "failed" | "pending" | "missing";

type StatusPayload = {
  status?: string;
  order_id?: string;
  amount?: string | number;
  txn_id?: string;
  error?: string;
  message?: string;
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

const OrderStatus = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const [view, setView] = useState<PaymentView>("checking");
  const [details, setDetails] = useState<StatusPayload>({});

  useEffect(() => {
    const orderId =
      searchParams.get("order_id") ||
      searchParams.get("orderId") ||
      sessionStorage.getItem(PENDING_ORDER_KEY) ||
      "";

    if (!orderId) {
      setView("missing");
      return;
    }

    const poll = { cancelled: false, timer: 0, attempts: 0 };
    const maxAttempts = 40;

    const check = async () => {
      try {
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
          throw new Error(
            "Payment PHP is not running. Run yarn php:api in another terminal."
          );
        }
        if (poll.cancelled) {
          return null;
        }
        setDetails(result);
        return resolvePayStatus(result);
      } catch {
        if (!poll.cancelled) {
          setDetails({ error: "Unable to verify payment right now." });
        }
        return "pending";
      }
    };

    const finish = (next: PaymentView) => {
      if (poll.timer) {
        window.clearInterval(poll.timer);
        poll.timer = 0;
      }
      if (next === "success") {
        dispatch(removeAllItemsFromCart());
        sessionStorage.removeItem(PENDING_ORDER_KEY);
      }
      setView(next);
    };

    const run = async () => {
      const status = await check();
      if (poll.cancelled || !status) {
        return;
      }
      if (status === "success" || status === "failed") {
        finish(status);
        return;
      }

      poll.timer = window.setInterval(() => {
        void (async () => {
          poll.attempts += 1;
          const next = await check();
          if (poll.cancelled || !next) {
            return;
          }
          if (next === "success" || next === "failed") {
            finish(next);
            return;
          }
          if (poll.attempts >= maxAttempts) {
            finish("pending");
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

  return (
    <>
      <Breadcrumb
        title="Payment status"
        pages={["Payment status"]}
        description="We confirm payment from the gateway, then email you a receipt."
      />
      <section className="minimal-checkout-page">
        <div className="max-w-[560px] w-full mx-auto px-4 sm:px-6 xl:px-0">
          <div className="pay-status">
            {view === "checking" && (
              <>
                <h2 className="pay-status__title font-heading">Checking payment…</h2>
                <p className="pay-status__text">
                  Please wait while we confirm your payment. Do not close this page.
                </p>
              </>
            )}

            {view === "success" && (
              <>
                <h2 className="pay-status__title font-heading">Payment successful</h2>
                <p className="pay-status__text">
                  {details.order_id ? `Order ID: ${details.order_id}. ` : ""}
                  {amountLabel ? `Amount paid: ${amountLabel}. ` : ""}
                  A confirmation has been sent to your email.
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
                    "The payment was not completed. Your cart is still saved."}
                </p>
                <CandyButtonLink href="/checkout" className="pay-status__cta">
                  Try again
                </CandyButtonLink>
              </>
            )}

            {view === "pending" && (
              <>
                <h2 className="pay-status__title font-heading">Payment is processing</h2>
                <p className="pay-status__text">
                  {details.order_id ? `Order ID: ${details.order_id}. ` : ""}
                  If money was deducted, it will be confirmed shortly. You can also
                  check your email or contact support with this order id.
                </p>
                <CandyButtonLink href="/" className="pay-status__cta">
                  Back to home
                </CandyButtonLink>
              </>
            )}

            {view === "missing" && (
              <>
                <h2 className="pay-status__title font-heading">No order found</h2>
                <p className="pay-status__text">
                  We could not find a payment to verify. If you completed checkout,
                  use the link from the payment page or contact support.
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

export default OrderStatus;
