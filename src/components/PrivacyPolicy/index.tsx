import React from "react";
import LegalPage from "../Common/LegalPage";
import { siteConfig } from "@/config/site";

const PrivacyPolicy = () => {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How we collect, use, and protect your personal information."
      currentPath="/privacy-policy"
      introTitle="Introduction"
      intro={
        <>
          <p className="minimal-legal-page__text">
            {siteConfig.brand.name} is an Indian e-commerce company selling
            electronics, stationery, books, and garments to customers across
            India. We are committed to protecting your privacy and the security
            of your personal information. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our website and services.
          </p>
          <p className="minimal-legal-page__text">
            By using {siteConfig.brand.name}, you agree to the practices
            described in this policy. If you do not agree, please do not use our
            website.
          </p>
        </>
      }
    >
      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Information We Collect</h2>
        <p className="minimal-legal-page__text">
          We collect information that you provide directly to us and information
          that is automatically collected when you use our services:
        </p>
        <ul className="minimal-legal-page__list">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, shipping and billing address when you place an order or
            create an account.
          </li>
          <li>
            <strong>Account Information:</strong> Login details and profile
            information if you register on {siteConfig.brand.name}.
          </li>
          <li>
            <strong>Transaction Information:</strong> Order details, payment
            method (e.g. UPI, card), and purchase history.
          </li>
          <li>
            <strong>Usage Information:</strong> How you use our site—pages
            visited, time on site, and interactions—to improve your experience.
          </li>
          <li>
            <strong>Device Information:</strong> IP address, browser, device
            type, and operating system for security and compatibility.
          </li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">How We Use Your Information</h2>
        <p className="minimal-legal-page__text">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="minimal-legal-page__list">
          <li>To process orders, deliver products across India, and manage your account</li>
          <li>To contact you about orders, delivery, returns, and customer support</li>
          <li>To send offers and updates (only with your consent)</li>
          <li>To improve our website, product range, and service for Indian customers</li>
          <li>To detect and prevent fraud and protect our platform</li>
          <li>To comply with applicable Indian laws and our Terms and Conditions</li>
          <li>To personalize your experience on {siteConfig.brand.name}</li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Information Sharing and Disclosure</h2>
        <p className="minimal-legal-page__text">
          {siteConfig.brand.name} does not sell your personal information. We may
          share it only in these situations:
        </p>
        <ul className="minimal-legal-page__list">
          <li>
            <strong>Service Providers:</strong> With partners who help us operate
            our business in India—e.g. payment gateways (for UPI, cards), couriers
            for delivery, and support tools—under strict confidentiality.
          </li>
          <li>
            <strong>Legal Requirements:</strong> When required by Indian law or in
            response to valid legal or government requests.
          </li>
          <li>
            <strong>Business Transfers:</strong> If our business or assets are
            merged, sold, or transferred, your information may be part of that
            process, subject to this policy.
          </li>
          <li>
            <strong>With Your Consent:</strong> When you have given us clear
            permission to share your information.
          </li>
        </ul>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Data Security</h2>
        <p className="minimal-legal-page__text">
          We use technical and organizational measures to protect your data from
          unauthorized access, alteration, or loss. No internet or electronic
          system can be completely secure; we work to keep your information safe
          and do not store full card details on our servers.
        </p>
        <p className="minimal-legal-page__text">
          Payments are processed through secure, compliant gateways. Your UPI,
          card, and other payment details are handled in line with industry
          standards so your transactions on {siteConfig.brand.name} remain
          protected.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Cookies and Tracking Technologies</h2>
        <p className="minimal-legal-page__text">
          We use cookies and similar technologies to improve your experience on{" "}
          {siteConfig.brand.name}, understand how the site is used, and show
          relevant content. You can manage cookies in your browser settings;
          turning them off may affect some features.
        </p>
        <p className="minimal-legal-page__text">
          We use session cookies (cleared when you close the browser) and
          persistent cookies (stored until they expire or you delete them). For
          more detail, see our Cookie Policy.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Your Rights and Choices</h2>
        <p className="minimal-legal-page__text">
          As a user of {siteConfig.brand.name}, you have the following rights
          regarding your personal information:
        </p>
        <ul className="minimal-legal-page__list">
          <li>
            <strong>Access:</strong> You can request access to your personal
            information.
          </li>
          <li>
            <strong>Correction:</strong> You can request correction of inaccurate
            information.
          </li>
          <li>
            <strong>Deletion:</strong> You can request deletion of your personal
            information.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can opt-out of marketing communications
            at any time.
          </li>
          <li>
            <strong>Data Portability:</strong> You can request a copy of your data
            in a portable format.
          </li>
        </ul>
        <p className="minimal-legal-page__text">
          To exercise these rights, please contact us using the contact
          information provided below.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Children&apos;s Privacy</h2>
        <p className="minimal-legal-page__text">
          {siteConfig.brand.name} is not directed at anyone under 18. We do not
          knowingly collect personal information from minors. If you think we
          have received information from a minor, please contact us and we will
          delete it promptly.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Third-Party Links</h2>
        <p className="minimal-legal-page__text">
          Our website may link to third-party sites (e.g. payment or social
          media). {siteConfig.brand.name} is not responsible for the privacy or
          content of those sites. We recommend reading their privacy policies
          before sharing your information.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Changes to This Privacy Policy</h2>
        <p className="minimal-legal-page__text">
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated &quot;Last Updated&quot; date. For
          significant changes, we may also notify you by email or a notice on our
          website. We encourage you to review this policy periodically.
        </p>
      </section>

      <section className="minimal-legal-page__section">
        <h2 className="minimal-legal-page__heading">Contact Us</h2>
        <p className="minimal-legal-page__text">
          For any questions about this Privacy Policy or how {siteConfig.brand.name}{" "}
          handles your data, please contact us:
        </p>
        <div className="minimal-legal-page__contact">
          <p>
            <strong>Email:</strong> {siteConfig.brand.email.privacy}
          </p>
          <p>
            <strong>Website:</strong> {siteConfig.brand.domain}
          </p>
          <p>
            <strong>Address:</strong> {siteConfig.brand.address.full}
          </p>
        </div>
      </section>
    </LegalPage>
  );
};

export default PrivacyPolicy;
