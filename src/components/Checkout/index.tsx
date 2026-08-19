"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { selectCartItems, selectTotalPrice } from "@/redux/features/cart-slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormData } from "@/lib/schemas";
import Breadcrumb from "../Common/Breadcrumb";
import Billing from "./Billing";
import PaymentMethod from "./PaymentMethod";
import { CandyButton, CandyButtonLink } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

const PENDING_ORDER_KEY = "cc_pending_order_id";
const HOSTED_CHECKOUT_URL_KEY = "cc_hosted_checkout_url";

const CHECKOUT_STEPS = [
  {
    title: "Enter your details",
    text: "Billing address and a 10-digit Indian mobile number for UPI.",
  },
  {
    title: "Pay with UPI",
    text: "On phone, open your UPI app. On computer, scan the QR.",
  },
  {
    title: "Keep the pay page open",
    text: "We confirm payment automatically, then email you a receipt.",
  },
];

function preferredUpiMode() {
  if (typeof navigator === "undefined") {
    return "QR";
  }
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "INTENT"
    : "QR";
}

const Checkout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectTotalPrice);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      paymentMethod: "upi",
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    if (cartItems.length === 0) {
      setError("Your cart is empty. Add items before checkout.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const orderItems = cartItems.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        price: item.discountedPrice,
      }));

      const res = await fetch("/api/mpurse.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_session",
          payment_method: data.paymentMethod,
          upi_mode: preferredUpiMode(),
          billing_first_name: data.firstName,
          billing_last_name: data.lastName,
          billing_email: data.email,
          billing_phone: data.phone,
          billing_address: data.address,
          billing_town: data.town,
          billing_state: data.state || "",
          billing_postcode: data.postcode || "",
          notes: data.notes || "",
          cart_items: orderItems,
        }),
      });

      const raw = await res.text();
      let result: {
        error?: string;
        order_id?: string;
        flow?: string;
        checkout_url?: string;
      } = {};
      try {
        result = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(
          "Payment PHP is not running. Keep yarn dev open and in another terminal run: yarn php:api"
        );
      }

      if (!res.ok || !result?.order_id) {
        throw new Error(result.error || "Failed to start payment");
      }

      sessionStorage.setItem(PENDING_ORDER_KEY, result.order_id);

      if (result.flow === "hosted" && result.checkout_url) {
        sessionStorage.setItem(HOSTED_CHECKOUT_URL_KEY, result.checkout_url);
        window.location.replace(result.checkout_url);
        return;
      }

      sessionStorage.removeItem(HOSTED_CHECKOUT_URL_KEY);
      window.location.replace("/pay?order_id=" + encodeURIComponent(result.order_id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb
        title="Checkout"
        pages={["Checkout"]}
        description="Enter your delivery details and pay securely with UPI."
      />

      {cartItems.length === 0 ? (
        <section className="minimal-checkout-page">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
            <div className="checkout-empty">
              <div className="checkout-empty__icon" aria-hidden>
                <ShoppingBag className="size-8" strokeWidth={1.5} />
              </div>
              <h2 className="checkout-empty__title font-heading">Nothing to checkout</h2>
              <p className="checkout-empty__text">
                Your cart is empty. Add products from the shop, then return here
                to pay with UPI.
              </p>
              <CandyButtonLink href="/shop" className="checkout-empty__cta">
                Continue Shopping
              </CandyButtonLink>
            </div>
          </div>
        </section>
      ) : (
        <section className="minimal-checkout-page">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
            <div className="minimal-checkout-page__intro">
              <p className="minimal-checkout-page__eyebrow">Secure checkout</p>
              <h2 className="minimal-checkout-page__title font-heading">
                Complete your order ({cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"})
              </h2>
              <p className="minimal-checkout-page__text">
                Enter billing details and pay with UPI. Card and net banking will
                be added once the gateway enables them for this merchant.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="minimal-checkout-page__layout">
                <div className="minimal-checkout-page__main">
                  <Billing register={register} errors={errors} />
                  <PaymentMethod register={register} watch={watch} />

                  <div className="minimal-checkout-page__panel">
                    <div className="minimal-checkout-page__panel-head">
                      Order notes
                    </div>

                    <div className="minimal-checkout-page__panel-body">
                      <label htmlFor="notes" className="minimal-checkout-page__label">
                        Special instructions (optional)
                      </label>
                      <textarea
                        {...register("notes")}
                        id="notes"
                        rows={4}
                        placeholder="Delivery preferences or anything else we should know…"
                        className={cn(
                          "minimal-checkout-page__textarea",
                          errors.notes && "minimal-checkout-page__textarea--error"
                        )}
                      />
                    </div>
                  </div>
                </div>

                <aside className="minimal-checkout-page__aside">
                  <div className="minimal-checkout-page__panel">
                    <div className="minimal-checkout-page__panel-head">
                      Your order
                    </div>

                    <div className="minimal-checkout-page__panel-body">
                      <div className="checkout-summary__items">
                        {cartItems.map((item) => (
                          <div key={item.id} className="checkout-summary__item">
                            <div className="checkout-summary__item-image">
                              <Image
                                src={item.img}
                                alt={item.title}
                                width={56}
                                height={56}
                              />
                            </div>
                            <div className="checkout-summary__item-info">
                              <p className="checkout-summary__item-title">
                                {item.title}
                              </p>
                              <p className="checkout-summary__item-qty">
                                Qty {item.quantity}
                              </p>
                            </div>
                            <span className="checkout-summary__item-price">
                              ₹
                              {(item.discountedPrice * item.quantity).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="checkout-summary__total">
                        <span>Total</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                      </div>

                      {error && (
                        <p className="checkout-summary__error" role="alert">
                          {error}
                        </p>
                      )}

                      <CandyButton
                        type="submit"
                        variant="success"
                        disabled={submitting}
                        className="checkout-summary__submit"
                      >
                        {submitting ? "Processing…" : "Pay with UPI"}
                      </CandyButton>
                    </div>
                  </div>

                  <div className="checkout-steps">
                    <p className="checkout-steps__title">What happens next</p>
                    <ol className="checkout-steps__list">
                      {CHECKOUT_STEPS.map((step, index) => (
                        <li key={step.title} className="checkout-steps__item">
                          <span className="checkout-steps__num">{index + 1}</span>
                          <p className="checkout-steps__text">
                            <strong>{step.title}</strong>
                            {step.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Checkout;
