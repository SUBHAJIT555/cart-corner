import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import Logo from "../Common/Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faqs" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="minimal-footer">
      <div className="minimal-footer__inner max-w-[1280px] w-full mx-auto px-4 sm:px-6 xl:px-0">
        <div className="minimal-footer__main">
          <div className="minimal-footer__brand-col">
            <Link href="/" className="inline-block">
              <Logo iconClassName="size-7" textClassName="text-xl" />
            </Link>
            <p className="minimal-footer__brand-desc">
              {siteConfig.brand.description}
            </p>
          </div>

          <div className="minimal-footer__col">
            <h2 className="minimal-footer__heading">Quick Links</h2>
            <ul className="minimal-footer__links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="minimal-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="minimal-footer__col">
            <h2 className="minimal-footer__heading">Legal</h2>
            <ul className="minimal-footer__links">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="minimal-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="minimal-footer__col minimal-footer__contact-col">
            <h2 className="minimal-footer__heading">Contact</h2>
            <div className="minimal-footer__contact">
              <div className="minimal-footer__contact-row">
                <span className="minimal-footer__icon-wrap" aria-hidden>
                  <MapPin className="size-4" strokeWidth={2} />
                </span>
                <span className="minimal-footer__contact-value">
                  {siteConfig.brand.address.location}
                </span>
              </div>
              <div className="minimal-footer__contact-row">
                <span className="minimal-footer__icon-wrap" aria-hidden>
                  <Mail className="size-4" strokeWidth={2} />
                </span>
                <a
                  href={`mailto:${siteConfig.brand.email.general}`}
                  className="minimal-footer__contact-value minimal-footer__contact-link"
                >
                  {siteConfig.brand.email.general}
                </a>
              </div>
              <p className="minimal-footer__contact-meta">
                {siteConfig.brand.domain}
              </p>
            </div>
          </div>
        </div>

        <div className="minimal-footer__bottom">
          <p className="minimal-footer__copyright">
            &copy; {year} {siteConfig.brand.name}. All rights reserved.
          </p>

          <div className="minimal-footer__payments">
            <span className="minimal-footer__payments-label">We accept</span>
            <div className="minimal-footer__payment-icons">
              <Image
                src="/images/payment/payment-01.svg"
                alt="Visa"
                width={66}
                height={22}
              />
              <Image
                src="/images/payment/payment-02.svg"
                alt="PayPal"
                width={18}
                height={21}
              />
              <Image
                src="/images/payment/payment-03.svg"
                alt="Mastercard"
                width={33}
                height={24}
              />
              <Image
                src="/images/payment/payment-04.svg"
                alt="Apple Pay"
                width={53}
                height={22}
              />
              <Image
                src="/images/payment/payment-05.svg"
                alt="Google Pay"
                width={56}
                height={22}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
