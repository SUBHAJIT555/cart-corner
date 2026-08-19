import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { QuoteFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const PAYMENT_OPTIONS = [
  {
    id: "upi",
    value: "upi",
    label: "UPI",
    hint: "Phone: open UPI app. Computer: scan QR with your phone",
    enabled: true,
  },
  {
    id: "card",
    value: "card",
    label: "Debit / Credit card",
    hint: "Coming soon. Use UPI for now.",
    enabled: false,
  },
  {
    id: "netbanking",
    value: "netbanking",
    label: "Net banking",
    hint: "Coming soon. Use UPI for now.",
    enabled: false,
  },
] as const;

type PaymentMethodProps = {
  register: UseFormRegister<QuoteFormData>;
  watch: UseFormWatch<QuoteFormData>;
};

const PaymentMethod = ({ register, watch }: PaymentMethodProps) => {
  const method = watch("paymentMethod");

  return (
    <div className="minimal-checkout-page__panel">
      <div className="minimal-checkout-page__panel-head">Payment method</div>

      <div className="minimal-checkout-page__panel-body">
        <p className="checkout-pay__intro">Pay with UPI for now</p>
        <div className="checkout-pay__options">
          {PAYMENT_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              htmlFor={opt.id}
              className={cn(
                "checkout-pay__option",
                !opt.enabled && "checkout-pay__option--disabled",
                opt.enabled && method === opt.value && "checkout-pay__option--active"
              )}
            >
              <input
                type="radio"
                id={opt.id}
                value={opt.value}
                className="sr-only"
                disabled={!opt.enabled}
                {...register("paymentMethod")}
              />
              <span
                className={cn(
                  "checkout-pay__radio",
                  opt.enabled && method === opt.value && "checkout-pay__radio--on"
                )}
              />
              <span>
                <span className="checkout-pay__label">
                  {opt.label}
                  {!opt.enabled ? " — coming soon" : ""}
                </span>
                <span className="checkout-pay__hint">{opt.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
