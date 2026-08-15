"use client";

import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { siteConfig } from "@/config/site";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { CandyButton } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";
import { submitToApi } from "@/lib/submit-api";
import { Clock, Globe, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("formType", "contact");
      formData.append("name", `${data.firstName} ${data.lastName}`);
      formData.append("email", data.email);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      if (data.subject) formData.append("subject", data.subject);
      if (data.phone) formData.append("phone", data.phone);
      if (data.message) formData.append("message", data.message);

      const result = await submitToApi(formData);
      if (!result.success) {
        throw new Error(result.error || "Failed to send message");
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

  const inputClass = (hasError: boolean) =>
    cn(
      "minimal-contact-page__input",
      hasError && "minimal-contact-page__input--error"
    );

  return (
    <>
      <Breadcrumb
        title="Contact"
        pages={["Contact"]}
        description="Questions about an order, product, or delivery? We're here to help."
      />

      <section className="minimal-contact-page">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
          <div className="minimal-contact-page__intro">
            <p className="minimal-contact-page__eyebrow">Get in touch</p>
            <h2 className="minimal-contact-page__title font-heading">Send us a message</h2>
            <p className="minimal-contact-page__text">
              Fill out the form and our team will get back to you within one
              business day.
            </p>
          </div>

          <div className="minimal-contact-page__grid">
            <aside className="minimal-contact-page__info">
              <div className="minimal-contact-page__info-bg" aria-hidden>
                <div className="minimal-contact-page__info-pattern" />
              </div>

              <div className="minimal-contact-page__info-head">
                Contact Information
              </div>

              <div className="minimal-contact-page__info-body">
                <div className="minimal-contact-page__detail">
                  <span className="minimal-contact-page__detail-icon" aria-hidden>
                    <Mail className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="minimal-contact-page__detail-label">Email</p>
                    <p className="minimal-contact-page__detail-value">
                      <a href={`mailto:${siteConfig.brand.email.general}`}>
                        {siteConfig.brand.email.general}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="minimal-contact-page__detail">
                  <span className="minimal-contact-page__detail-icon" aria-hidden>
                    <Globe className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="minimal-contact-page__detail-label">Website</p>
                    <p className="minimal-contact-page__detail-value">
                      <a
                        href={siteConfig.brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {siteConfig.brand.domain}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="minimal-contact-page__detail">
                  <span className="minimal-contact-page__detail-icon" aria-hidden>
                    <MapPin className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="minimal-contact-page__detail-label">Address</p>
                    <p className="minimal-contact-page__detail-value">
                      {siteConfig.brand.address.full}
                    </p>
                  </div>
                </div>

                <div className="minimal-contact-page__detail">
                  <span className="minimal-contact-page__detail-icon" aria-hidden>
                    <Clock className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="minimal-contact-page__detail-label">Hours</p>
                    <p className="minimal-contact-page__detail-value">
                      {siteConfig.brand.businessHours}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="minimal-contact-page__form-panel">
              <div className="minimal-contact-page__form-bg" aria-hidden>
                <div className="minimal-contact-page__form-lines" />
              </div>

              <div className="minimal-contact-page__form-inner">
                <h3 className="minimal-contact-page__form-head">
                  Contact form
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="minimal-contact-page__fields">
                    <div className="minimal-contact-page__row">
                      <div className="minimal-contact-page__field">
                        <label
                          htmlFor="firstName"
                          className="minimal-contact-page__label"
                        >
                          First Name{" "}
                          <span className="minimal-contact-page__required">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("firstName")}
                          id="firstName"
                          placeholder="John"
                          className={inputClass(Boolean(errors.firstName))}
                        />
                        {errors.firstName && (
                          <p className="minimal-contact-page__field-error">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="minimal-contact-page__field">
                        <label
                          htmlFor="lastName"
                          className="minimal-contact-page__label"
                        >
                          Last Name{" "}
                          <span className="minimal-contact-page__required">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("lastName")}
                          id="lastName"
                          placeholder="Doe"
                          className={inputClass(Boolean(errors.lastName))}
                        />
                        {errors.lastName && (
                          <p className="minimal-contact-page__field-error">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="minimal-contact-page__field">
                      <label
                        htmlFor="email"
                        className="minimal-contact-page__label"
                      >
                        Email{" "}
                        <span className="minimal-contact-page__required">*</span>
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        id="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={inputClass(Boolean(errors.email))}
                      />
                      {errors.email && (
                        <p className="minimal-contact-page__field-error">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="minimal-contact-page__row">
                      <div className="minimal-contact-page__field">
                        <label
                          htmlFor="subject"
                          className="minimal-contact-page__label"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          {...register("subject")}
                          id="subject"
                          placeholder="How can we help?"
                          className="minimal-contact-page__input"
                        />
                      </div>

                      <div className="minimal-contact-page__field">
                        <label
                          htmlFor="phone"
                          className="minimal-contact-page__label"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          {...register("phone")}
                          id="phone"
                          placeholder="+91 98765 43210"
                          autoComplete="tel"
                          className="minimal-contact-page__input"
                        />
                      </div>
                    </div>

                    <div className="minimal-contact-page__field">
                      <label
                        htmlFor="message"
                        className="minimal-contact-page__label"
                      >
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        id="message"
                        rows={5}
                        placeholder="Tell us more about your enquiry..."
                        className="minimal-contact-page__textarea"
                      />
                    </div>

                    {error && (
                      <p className="minimal-contact-page__message minimal-contact-page__message--error">
                        {error}
                      </p>
                    )}
                    {success && (
                      <p className="minimal-contact-page__message minimal-contact-page__message--success">
                        Message sent successfully! We&apos;ll be in touch soon.
                      </p>
                    )}

                    <CandyButton
                      type="submit"
                      variant={success ? "success" : "default"}
                      disabled={submitting}
                      className="minimal-contact-page__submit"
                    >
                      {submitting
                        ? "Sending..."
                        : success
                          ? "Message sent!"
                          : "Send Message"}
                    </CandyButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
