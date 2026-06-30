import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { QuoteFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface BillingProps {
  register: UseFormRegister<QuoteFormData>;
  errors: FieldErrors<QuoteFormData>;
}

const Billing = ({ register, errors }: BillingProps) => {
  const inputClass = (hasError: boolean) =>
    cn(
      "minimal-checkout-page__input",
      hasError && "minimal-checkout-page__input--error"
    );

  return (
    <div className="minimal-checkout-page__panel">
      <div className="minimal-checkout-page__panel-bg" aria-hidden>
        <div className="minimal-checkout-page__panel-pattern" />
      </div>

      <div className="minimal-checkout-page__panel-head">Billing details</div>

      <div className="minimal-checkout-page__panel-body">
        <div className="minimal-checkout-page__fields">
          <div className="minimal-checkout-page__row">
            <div className="minimal-checkout-page__field">
              <label htmlFor="firstName" className="minimal-checkout-page__label">
                First name <span className="minimal-checkout-page__required">*</span>
              </label>
              <input
                type="text"
                {...register("firstName")}
                id="firstName"
                placeholder="First name"
                className={inputClass(!!errors.firstName)}
              />
              {errors.firstName && (
                <p className="minimal-checkout-page__field-error">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="minimal-checkout-page__field">
              <label htmlFor="lastName" className="minimal-checkout-page__label">
                Last name <span className="minimal-checkout-page__required">*</span>
              </label>
              <input
                type="text"
                {...register("lastName")}
                id="lastName"
                placeholder="Last name"
                className={inputClass(!!errors.lastName)}
              />
              {errors.lastName && (
                <p className="minimal-checkout-page__field-error">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="minimal-checkout-page__field">
            <label htmlFor="address" className="minimal-checkout-page__label">
              Street address <span className="minimal-checkout-page__required">*</span>
            </label>
            <input
              type="text"
              {...register("address")}
              id="address"
              placeholder="House number and street name"
              className={inputClass(!!errors.address)}
            />
            {errors.address && (
              <p className="minimal-checkout-page__field-error">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="minimal-checkout-page__row">
            <div className="minimal-checkout-page__field">
              <label htmlFor="town" className="minimal-checkout-page__label">
                Town / city <span className="minimal-checkout-page__required">*</span>
              </label>
              <input
                type="text"
                {...register("town")}
                id="town"
                placeholder="Town or city"
                className={inputClass(!!errors.town)}
              />
              {errors.town && (
                <p className="minimal-checkout-page__field-error">
                  {errors.town.message}
                </p>
              )}
            </div>

            <div className="minimal-checkout-page__field">
              <label htmlFor="state" className="minimal-checkout-page__label">
                State / country
              </label>
              <input
                type="text"
                {...register("state")}
                id="state"
                placeholder="State or country"
                className="minimal-checkout-page__input"
              />
            </div>
          </div>

          <div className="minimal-checkout-page__field">
            <label htmlFor="postcode" className="minimal-checkout-page__label">
              Postcode / ZIP
            </label>
            <input
              type="text"
              {...register("postcode")}
              id="postcode"
              placeholder="Postcode or ZIP"
              className="minimal-checkout-page__input"
            />
          </div>

          <div className="minimal-checkout-page__row">
            <div className="minimal-checkout-page__field">
              <label htmlFor="email" className="minimal-checkout-page__label">
                Email <span className="minimal-checkout-page__required">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                placeholder="you@example.com"
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="minimal-checkout-page__field-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="minimal-checkout-page__field">
              <label htmlFor="phone" className="minimal-checkout-page__label">
                Phone <span className="minimal-checkout-page__required">*</span>
              </label>
              <input
                type="text"
                {...register("phone")}
                id="phone"
                placeholder="Phone number"
                className={inputClass(!!errors.phone)}
              />
              {errors.phone && (
                <p className="minimal-checkout-page__field-error">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
