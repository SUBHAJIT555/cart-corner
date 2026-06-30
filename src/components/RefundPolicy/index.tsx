import React from "react";
import LegalPage from "../Common/LegalPage";
import { siteConfig } from "@/config/site";

const RefundPolicy = () => {
  return (
    <LegalPage
      title="Refund Policy"
      description="Our 7-day return and refund policy for orders across India."
      currentPath="/refund-policy"
      introTitle="Refund Policy"
      intro={
        <p className="minimal-legal-page__text">
          {siteConfig.brand.name} is an Indian e-commerce company selling
          electronics, stationery, books, and garments across India. We want you
          to be satisfied with your purchase. If you are not, we offer an easy
          7-day return and refund policy.
        </p>
      }
    >
      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Eligibility for Refunds</h2>
        <p className="minimal-legal-page__text">
          To be eligible for a refund, the following must be met:
        </p>
        <ul className="minimal-legal-page__list">
          <li>Items must be returned within 7 days of delivery</li>
          <li>Items must be unused and in original condition with tags attached (where applicable)</li>
          <li>Items must be in original packaging where possible</li>
          <li>You must provide your order number or proof of purchase</li>
          <li>Personalized or custom-made items may not be eligible for refund</li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">How to Request a Refund</h2>
        <p className="minimal-legal-page__text">To request a refund:</p>
        <ol className="minimal-legal-page__list minimal-legal-page__list--ordered">
          <li>Contact us by email at {siteConfig.brand.email.support}</li>
          <li>Provide your order number and reason for the refund</li>
          <li>We will review your request and send you a Return Authorization (RA) number and return address</li>
          <li>Pack the item(s) securely, ideally in the original packaging</li>
          <li>Include the RA number and ship the package to the address we provide</li>
        </ol>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Refund Processing</h2>
        <p className="minimal-legal-page__text">
          Once we receive your returned item(s):
        </p>
        <ul className="minimal-legal-page__list">
          <li>We will inspect the item(s) within 3–5 business days of receipt</li>
          <li>If approved, your refund will be processed within 5–10 business days</li>
          <li>Refunds will be credited to the original payment method (UPI, card, net banking, etc.)</li>
          <li>You will receive an email/SMS once the refund has been processed</li>
        </ul>
        <p className="minimal-legal-page__text">
          Delivery charges are non-refundable unless the return is due to our error
          or a defective/wrong product.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Return Shipping</h2>
        <p className="minimal-legal-page__text">
          You are responsible for the cost of sending the item back to us, unless
          the return is due to our mistake, a defective product, or a wrong item.
          We recommend using a trackable courier and keeping proof of shipment.
        </p>
        <p className="minimal-legal-page__text">
          If you received a damaged or incorrect item, contact us within 48 hours
          and we will arrange a prepaid return at no cost to you.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Non-Refundable Items</h2>
        <p className="minimal-legal-page__text">
          The following are generally not eligible for refunds:
        </p>
        <ul className="minimal-legal-page__list">
          <li>Items that have been used, damaged, or altered by you</li>
          <li>Items without original tags or packaging where required</li>
          <li>Personalized or custom-made items</li>
          <li>Gift cards and certain promotional items</li>
          <li>Items returned after the 7-day return window</li>
          <li>Digital or downloadable products</li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Exchanges</h2>
        <p className="minimal-legal-page__text">
          We do not offer direct exchanges. To get a different size, colour, or
          item, return the original product for a refund and place a new order.
          This way you get the correct product without delay.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Damaged or Defective Items</h2>
        <p className="minimal-legal-page__text">
          If you receive a damaged or defective product, contact us within 48 hours
          of delivery. We will arrange a replacement or full refund, including
          return shipping. Please share photos of the damage or defect when you
          contact us.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Late or Missing Refunds</h2>
        <p className="minimal-legal-page__text">
          If you have not received your refund within the expected time:
        </p>
        <ul className="minimal-legal-page__list">
          <li>Check your bank account, UPI app, or card statement—refunds can take a few extra days to appear</li>
          <li>Contact your bank or payment provider if needed</li>
          <li>If you still have not received the refund after that, contact us at {siteConfig.brand.email.support}</li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Contact Us</h2>
        <p className="minimal-legal-page__text">
          For any questions about our Refund Policy, please contact us:
        </p>
        <div className="minimal-legal-page__contact">
          <p>
            <strong>Email:</strong> {siteConfig.brand.email.support}
          </p>
          <p>
            <strong>Website:</strong> {siteConfig.brand.domain}
          </p>
          <p>
            <strong>Address:</strong> {siteConfig.brand.address.full}
          </p>
          <p>
            <strong>Business Hours:</strong> {siteConfig.brand.businessHours}
          </p>
        </div>
      </section>
    </LegalPage>
  );
};

export default RefundPolicy;
