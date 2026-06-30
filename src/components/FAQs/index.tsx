"use client";

import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { siteConfig } from "@/config/site";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CandyButtonLink } from "@/components/ui/candy-button";

const FAQs = () => {
  const brand = siteConfig.brand.name;

  const faqs = [
    {
      question: `What does ${brand} sell?`,
      answer: `${brand} is an Indian online store selling electronics (mobile accessories, smart gadgets, computer accessories, home electronics), books, stationery, and garments for men, women, and kids. We focus on honest pricing and great value for Indian customers.`,
    },
    {
      question: "Do you deliver across India?",
      answer:
        "Yes. We ship to all states and union territories in India. Delivery times vary by location—usually 3–7 business days. Free delivery is available on orders above ₹499.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept UPI, debit and credit cards (Visa, MasterCard, RuPay), net banking, and other popular Indian payment options. All payments are processed securely.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 7-day easy return policy. Items should be unused and in original packaging with tags. For full details, visit our Refund Policy or Terms and Conditions page.",
    },
    {
      question: "How do I track my order?",
      answer:
        "After your order is shipped, you'll get an email and SMS with a tracking link. You can track your order on our website or on the courier partner's site using that link.",
    },
    {
      question: "Can I cancel or change my order?",
      answer:
        "You can cancel or change your order before it is shipped. Contact our support as soon as possible with your order number so we can try to update it.",
    },
    {
      question: "What if I receive a damaged or wrong item?",
      answer:
        "If you receive a damaged or incorrect product, contact us within 48 hours with your order number and photos. We will arrange a replacement or refund as per our policy.",
    },
    {
      question: `What kind of prices does ${brand} offer?`,
      answer: `${brand} focuses on value for Indian customers. We offer honest prices on electronics, books, stationery, and garments—with regular offers and great deals.`,
    },
    {
      question: `How do I contact ${brand}?`,
      answer: `Reach us by email at ${siteConfig.brand.email.general} or use the contact form on ${siteConfig.brand.domain}. We're here to help during ${siteConfig.brand.businessHours}.`,
    },
    {
      question: "Do you have offers or discounts?",
      answer:
        "We run regular promotions and seasonal sales. Check the homepage and product pages for current offers. You can also subscribe to our newsletter for updates on deals and new arrivals.",
    },
    {
      question: `Is my data safe with ${brand}?`,
      answer:
        "We take privacy seriously. Your personal and payment information is protected. For full details on how we collect, use, and protect your data, see our Privacy Policy and Cookie Policy.",
    },
    {
      question: `Where is ${brand} based?`,
      answer: `${brand} is an Indian brand. Our registered address is ${siteConfig.brand.address.full}. For business hours and contact details, visit our Contact page.`,
    },
  ];

  return (
    <>
      <Breadcrumb
        title="FAQs"
        pages={["FAQs"]}
        description="Answers to common questions about shopping, delivery, returns, and more."
      />

      <section className="minimal-faq-page">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
          <div className="minimal-faq-page__intro">
            <p className="minimal-faq-page__eyebrow">Help centre</p>
            <h2 className="minimal-faq-page__title font-heading">
              Frequently Asked Questions
            </h2>
            <p className="minimal-faq-page__desc">
              Find answers to common questions about our products, shipping,
              returns, and more. If you can&apos;t find what you&apos;re looking
              for, please don&apos;t hesitate to contact us.
            </p>
          </div>

          <FaqAccordion items={faqs} className="minimal-faq-page__accordion" />

          <div className="minimal-faq-page__cta">
            <h3 className="minimal-faq-page__cta-title">Still have questions?</h3>
            <p className="minimal-faq-page__cta-text">
              Can&apos;t find the answer you&apos;re looking for? Our customer
              service team is here to help.
            </p>
            <div className="minimal-faq-page__cta-actions">
              <CandyButtonLink
                href="/contact"
                className="minimal-faq-page__cta-btn"
              >
                Contact Us
              </CandyButtonLink>
              <CandyButtonLink
                href={`mailto:${siteConfig.brand.email.support}`}
                variant="success"
                className="minimal-faq-page__cta-btn"
              >
                Email Support
              </CandyButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQs;
