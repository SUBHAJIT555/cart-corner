"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { newsletterSchema, type NewsletterFormData } from "@/lib/schemas";
import { CandyButton } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

const Newsletter = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("formType", "newsletter");
      formData.append("email", data.email);

      const res = await fetch("/api/submit.php", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="minimal-newsletter overflow-hidden pt-12 lg:pt-16 pb-16 lg:pb-20">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 xl:px-0">
        <div className="minimal-newsletter__panel">
          <div className="minimal-newsletter__accent" aria-hidden />

          <div className="minimal-newsletter__inner">
            <div className="minimal-newsletter__copy">
              <p className="minimal-newsletter__eyebrow">Newsletter</p>
              <h2 className="minimal-newsletter__title font-heading">
                Stay in the loop
              </h2>
              <p className="minimal-newsletter__text">
                Get deals, new arrivals, and updates delivered to your inbox.
                No spam — unsubscribe anytime.
              </p>
            </div>

            <div className="minimal-newsletter__form">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="minimal-newsletter__field-row">
                  <div className="minimal-newsletter__input-wrap">
                    <Mail
                      className="minimal-newsletter__input-icon"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      aria-invalid={Boolean(errors.email)}
                      className={cn(
                        "minimal-newsletter__input",
                        errors.email && "minimal-newsletter__input--error"
                      )}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="minimal-newsletter__field-error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <CandyButton
                    type="submit"
                    variant={success ? "success" : "default"}
                    disabled={submitting}
                    className="minimal-newsletter__submit"
                  >
                    {submitting
                      ? "Subscribing..."
                      : success
                        ? "Subscribed!"
                        : "Subscribe"}
                  </CandyButton>
                </div>

                {error && (
                  <p className="minimal-newsletter__message minimal-newsletter__message--error">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="minimal-newsletter__message minimal-newsletter__message--success">
                    Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
