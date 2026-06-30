"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  selectCartItems,
  selectTotalPrice,
  removeAllItemsFromCart,
} from "@/redux/features/cart-slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormData } from "@/lib/schemas";
import Breadcrumb from "../Common/Breadcrumb";
import Billing from "./Billing";
import { CandyButton, CandyButtonLink } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

const CHECKOUT_STEPS = [
  {
    title: "Submit your details",
    text: "Fill in billing info and any notes for your order.",
  },
  {
    title: "We review your quote",
    text: "Our team confirms availability and pricing within 24 hours.",
  },
  {
    title: "Confirm & deliver",
    text: "Once approved, we'll arrange payment and shipping.",
  },
];

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useAppSelector(selectCartItems);
  const total = useAppSelector(selectTotalPrice);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
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

      const formData = new FormData();
      formData.append("formType", "quote");
      formData.append("billing_first_name", data.firstName);
      formData.append("billing_last_name", data.lastName);
      formData.append("billing_email", data.email);
      formData.append("billing_phone", data.phone);
      formData.append("billing_address", data.address);
      formData.append("billing_town", data.town);
      formData.append("billing_state", data.state || "");
      formData.append("cart_items", JSON.stringify(orderItems));
      formData.append("cart_total", total.toString());
      formData.append("order_total", total.toString());
      if (data.notes) formData.append("notes", data.notes);

      const res = await fetch("/api/submit.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit quote request");
      }

      dispatch(removeAllItemsFromCart());
      router.push("/mail-success");
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
        description="Share your details and we'll send a personalised quote for your cart."
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
                to request a quote.
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
              <p className="minimal-checkout-page__eyebrow">Request a quote</p>
              <h2 className="minimal-checkout-page__title font-heading">
                Complete your order ({cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"})
              </h2>
              <p className="minimal-checkout-page__text">
                Enter billing details below. We&apos;ll review your cart and get
                back to you with a confirmed quote — no payment required now.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="minimal-checkout-page__layout">
                <div className="minimal-checkout-page__main">
                  <Billing register={register} errors={errors} />

                  <div className="minimal-checkout-page__panel">
                    <div className="minimal-checkout-page__panel-bg" aria-hidden>
                      <div className="minimal-checkout-page__panel-lines" />
                    </div>

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
                        placeholder="Delivery preferences, bulk requirements, or anything else we should know…"
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
                        {submitting ? "Processing…" : "Ask for Quote"}
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
