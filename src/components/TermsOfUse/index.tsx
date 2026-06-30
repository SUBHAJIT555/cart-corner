import React from "react";
import LegalPage from "../Common/LegalPage";
import { siteConfig } from "@/config/site";

const TermsOfUse = () => {
  return (
    <LegalPage
      title="Terms and Conditions"
      description="Terms governing your use of our website and services."
      currentPath="/terms-of-use"
      introTitle="Terms and Conditions"
      intro={
        <p className="minimal-legal-page__text">
          Welcome to {siteConfig.brand.name}. We are an Indian e-commerce company
          selling electronics, stationery, books, and garments across India. These
          Terms and Conditions (&quot;Terms&quot;) govern your use of our website
          and services. By using {siteConfig.brand.name}, you agree to these
          Terms. If you do not agree, please do not use our website.
        </p>
      }
    >
      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Acceptance of Terms</h2>
        <p className="minimal-legal-page__text">
          By accessing or using our website, you accept and agree to be bound by
          these Terms and our Privacy Policy and Cookie Policy. If you do not
          agree, you must not use our services.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Use of Our Website</h2>
        <p className="minimal-legal-page__text">
          You may use {siteConfig.brand.name} for personal, non-commercial shopping
          only. You may not:
        </p>
        <ul className="minimal-legal-page__list">
          <li>Copy, modify, or misuse any content or software on the website</li>
          <li>Use the site for any commercial resale or unauthorized purpose</li>
          <li>Attempt to reverse engineer or interfere with the website or its security</li>
          <li>Remove any copyright or trademark notices</li>
          <li>Use the site in any way that is illegal or harms {siteConfig.brand.name} or other users</li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Account Registration</h2>
        <p className="minimal-legal-page__text">
          To access certain features of our website, you may be required to create
          an account. When creating an account, you agree to:
        </p>
        <ul className="minimal-legal-page__list">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and promptly update your account information</li>
          <li>Maintain the security of your password and identification</li>
          <li>Accept all responsibility for activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Products, Pricing, and Availability</h2>
        <p className="minimal-legal-page__text">
          We sell electronics, stationery, books, and garments. We try to keep
          product descriptions, images, and prices accurate, but we do not
          guarantee that everything on the site is error-free or always available.
          Prices are in Indian Rupees (₹) and may change. We may correct errors or
          update information at any time. Product availability is subject to stock.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Orders and Payment</h2>
        <p className="minimal-legal-page__text">
          When you place an order on {siteConfig.brand.name}:
        </p>
        <ul className="minimal-legal-page__list">
          <li>You must provide correct and complete delivery and payment details</li>
          <li>You are responsible for keeping your account and payment information up to date</li>
          <li>We may refuse or cancel an order (e.g. suspected fraud, pricing error, or stock issues)</li>
          <li>We may limit quantities or refuse orders that appear to be for commercial resale</li>
          <li>You agree to pay all charges for orders placed using your account (UPI, card, or other methods)</li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Prohibited Uses</h2>
        <p className="minimal-legal-page__text">You must not use our website:</p>
        <ul className="minimal-legal-page__list">
          <li>In any way that breaks applicable Indian laws or regulations</li>
          <li>To send unsolicited advertising or spam without our written consent</li>
          <li>To impersonate {siteConfig.brand.name}, our staff, or any other user</li>
          <li>To do anything fraudulent, harmful, or that infringes others&apos; rights</li>
          <li>To disrupt or misuse the website or other users&apos; experience</li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Intellectual Property</h2>
        <p className="minimal-legal-page__text">
          The {siteConfig.brand.name} website and its content (text, images, logos,
          design) are owned by us and protected by copyright and other intellectual
          property laws. You may not copy, modify, distribute, or use our content
          for commercial purposes without our prior written permission.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Returns and Refunds</h2>
        <p className="minimal-legal-page__text">
          We offer a 7-day return policy on eligible items in unused condition with
          original packaging. Refunds will be processed as per our Refund Policy.
          For details on how to return an item or claim a refund, please see our
          Refund Policy page or contact customer support.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Disclaimer of Warranties</h2>
        <p className="minimal-legal-page__text">
          Our website and services are provided &quot;as is.&quot; To the extent
          permitted by law, {siteConfig.brand.name} does not guarantee that the
          site will always be available, error-free, or free of viruses or other
          harmful elements. We do our best to keep the site secure and accurate but
          make no warranties beyond what is required by applicable law.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Limitation of Liability</h2>
        <p className="minimal-legal-page__text">
          To the fullest extent permitted by applicable law, {siteConfig.brand.name}{" "}
          and its directors, employees, or agents shall not be liable for any
          indirect, incidental, special, or consequential damages (including loss
          of profit, data, or business) arising from your use of the website or our
          services. Our total liability for any claim related to your use of the
          site shall not exceed the amount you paid to us for the order in question,
          or one thousand Indian Rupees (₹1,000), whichever is lower.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Indemnification</h2>
        <p className="minimal-legal-page__text">
          You agree to defend, indemnify, and hold harmless {siteConfig.brand.name}{" "}
          and its officers, directors, employees, and agents from and against any
          claims, liabilities, damages, losses, and expenses, including without
          limitation, reasonable legal and accounting fees, arising out of or in any
          way connected with your access to or use of the website or your violation
          of these Terms.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Termination</h2>
        <p className="minimal-legal-page__text">
          We may terminate or suspend your account and bar access to the website
          immediately, without prior notice or liability, under our sole discretion,
          for any reason whatsoever and without limitation, including but not
          limited to a breach of the Terms. If you wish to terminate your account,
          you may simply discontinue using the website.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Governing Law</h2>
        <p className="minimal-legal-page__text">
          These Terms are governed by the laws of India. Any dispute arising from
          or related to these Terms or your use of {siteConfig.brand.name} shall be
          subject to the exclusive jurisdiction of the courts in India. Our failure
          to enforce any part of these Terms does not waive our right to enforce it
          later.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Changes to These Terms</h2>
        <p className="minimal-legal-page__text">
          We may update these Terms from time to time. Changes will be posted on
          this page with an updated &quot;Last Updated&quot; date. For significant
          changes, we may give notice by email or a notice on the website. By
          continuing to use {siteConfig.brand.name} after changes take effect, you
          agree to the updated Terms.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Contact Us</h2>
        <p className="minimal-legal-page__text">
          For questions about these Terms and Conditions, please contact us:
        </p>
        <div className="minimal-legal-page__contact">
          <p>
            <strong>Email:</strong> {siteConfig.brand.email.legal}
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

export default TermsOfUse;
