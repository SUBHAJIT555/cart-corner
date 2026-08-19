import type { Metadata } from "next";
import { siteConfig } from "./site";

const brand = siteConfig.brand.name;

export const defaultTitle = `${brand} | Online Shopping for Electronics, Books, Stationery & Garments`;

export const rootMetadata = {
  metadataBase: new URL(siteConfig.brand.url),
  title: {
    default: defaultTitle,
    template: `%s | ${brand}`,
  },
  description: siteConfig.brand.description,
  applicationName: brand,
  icons: {
    icon: [{ url: "/images/logo/icon.png", type: "image/png" }],
    apple: [{ url: "/images/logo/icon.png", type: "image/png" }],
  },
} satisfies Metadata;

export function pageMetadata(
  title: string,
  description: string
): Metadata {
  return { title, description };
}

export const pageSeo = {
  home: {
    title: { absolute: defaultTitle },
    description: siteConfig.brand.description,
  },
  shop: pageMetadata(
    "Shop",
    `Browse electronics, books, stationery, and garments at ${brand}. Honest prices with fast delivery across India.`
  ),
  shopWithoutSidebar: pageMetadata(
    "Shop",
    `Browse electronics, books, stationery, and garments at ${brand}. Honest prices with fast delivery across India.`
  ),
  cart: pageMetadata(
    "Cart",
    `Review items in your cart at ${brand} and proceed to checkout.`
  ),
  checkout: pageMetadata(
    "Checkout",
    `Pay securely with UPI at ${brand}. Enter your details and complete payment.`
  ),
  wishlist: pageMetadata(
    "Wishlist",
    `Save your favourite products at ${brand} and add them to cart when you're ready.`
  ),
  about: pageMetadata(
    "About Us",
    `Learn about ${brand} — India's trusted store for electronics, books, stationery, and garments.`
  ),
  contact: pageMetadata(
    "Contact Us",
    `Get in touch with ${brand}. We're here to help with orders, products, and delivery across India.`
  ),
  faqs: pageMetadata(
    "FAQs",
    `Frequently asked questions about ${brand} — delivery, payments, returns, and more.`
  ),
  privacyPolicy: pageMetadata(
    "Privacy Policy",
    `How ${brand} collects, uses, and protects your personal information.`
  ),
  cookiePolicy: pageMetadata(
    "Cookie Policy",
    `How ${brand} uses cookies and similar technologies on our website.`
  ),
  terms: pageMetadata(
    "Terms and Conditions",
    `Terms and conditions for using the ${brand} website and services.`
  ),
  refundPolicy: pageMetadata(
    "Refund Policy",
    `${brand} refund and return policy. Easy 7-day returns on eligible items across India.`
  ),
  mailSuccess: pageMetadata(
    "Quote Request Sent",
    `Your message was received. ${brand} will get back to you shortly.`
  ),
  error: pageMetadata(
    "Something Went Wrong",
    `An error occurred. Please try again or contact ${brand} support.`
  ),
} satisfies Record<string, Metadata>;
