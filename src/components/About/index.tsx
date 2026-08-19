import React from "react";
import {
  BadgeCheck,
  Headphones,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Target,
  Truck,
  Users,
} from "lucide-react";
import Breadcrumb from "../Common/Breadcrumb";
import Logo from "../Common/Logo";
import { siteConfig } from "@/config/site";
import {
  CandyButtonLink,
  candyIconClassName,
  candyIconSuccessClassName,
} from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

const stats = [
  { value: "10K+", label: "Happy orders" },
  { value: "500+", label: "Products curated" },
  { value: "Pan-India", label: "Delivery coverage" },
  { value: "7-day", label: "Easy returns" },
];

const timeline = [
  {
    year: "The start",
    title: "Built for India",
    text: "A small team set out to offer honest prices on everyday essentials.",
    icon: Sparkles,
  },
  {
    year: "Growing",
    title: "Expanded our range",
    text: "Electronics, books, stationery, and fashion — all under one roof.",
    icon: Star,
  },
  {
    year: "Today",
    title: "Serving nationwide",
    text: "Trusted by shoppers across India with reliable delivery and support.",
    icon: MapPin,
  },
];

const values = [
  "Made for India — products and service built for Indian needs",
  "Quality and value — curated range at honest prices",
  "Transparency and trust — clear pricing, no hidden charges",
  "Reliable delivery and easy returns across India",
];

const features = [
  {
    icon: BadgeCheck,
    title: "Quality Guaranteed",
    text: "Every product is curated for Indian customers — electronics, stationery, books, and garments that meet our standards.",
    candy: "blue" as const,
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    text: "Shop with confidence — our 7-day return policy and simple process are designed for Indian shoppers.",
    candy: "green" as const,
  },
  {
    icon: Truck,
    title: "Delivery Across India",
    text: "We ship to every corner of India. Free delivery on orders above ₹499 so you get more value.",
    candy: "blue" as const,
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    text: "Pay safely with UPI. Card and net banking will be added when the gateway enables them.",
    candy: "green" as const,
  },
  {
    icon: Headphones,
    title: "India-Focused Support",
    text: "Our support team understands Indian shoppers. Reach out anytime for help.",
    candy: "blue" as const,
  },
  {
    icon: Tag,
    title: "Honest Prices",
    text: "No inflated prices — just fair value for Indian customers on everything we sell.",
    candy: "green" as const,
  },
];

const About = () => {
  return (
    <div className="minimal-about">
      <Breadcrumb
        title="About Us"
        pages={["About Us"]}
        description={`The story behind ${siteConfig.brand.name} — India's trusted everyday store.`}
      />

      {/* Hero */}
      <section className="minimal-about__hero">
        <div className="minimal-about__hero-dots" aria-hidden />
        <div className="minimal-about__hero-inner">
          <div>
            <p className="minimal-about__eyebrow">Our brand</p>
            <h2 className="minimal-about__hero-title">
              Welcome to {siteConfig.brand.name}
            </h2>
            <p className="minimal-about__hero-text">
              {siteConfig.brand.description}
            </p>
            <div className="minimal-about__hero-actions">
              <CandyButtonLink
                href="/shop"
                className="minimal-about__hero-btn"
              >
                Shop Now
              </CandyButtonLink>
              <CandyButtonLink
                href="/contact"
                variant="success"
                className="minimal-about__hero-btn"
              >
                Contact Us
              </CandyButtonLink>
            </div>
          </div>

          <aside className="minimal-about__brand-card">
            <div className="minimal-about__brand-card-dots" aria-hidden />
            <div className="minimal-about__brand-card-inner">
              <div className="minimal-about__brand-logo">
                <Logo iconClassName="size-7" textClassName="text-lg" />
              </div>
              <p className="minimal-about__brand-tagline">
                {siteConfig.brand.legalName}
              </p>
              <p className="minimal-about__brand-quote">
                &ldquo;Honest prices, reliable service, products you can
                trust.&rdquo;
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Stats */}
      <section className="minimal-about__stats" aria-label="Highlights">
        <div className="minimal-about__stats-inner">
          {stats.map((stat) => (
            <div key={stat.label} className="minimal-about__stat">
              <p className="minimal-about__stat-value">{stat.value}</p>
              <p className="minimal-about__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="minimal-about__section">
        <div className="minimal-about__section-head">
          <p className="minimal-about__eyebrow">Our story</p>
          <h2 className="minimal-about__section-title">
            From a small idea to a nationwide store
          </h2>
          <p className="minimal-about__section-desc">
            How {siteConfig.brand.name} grew by putting quality and customer
            trust first.
          </p>
        </div>

        <div className="minimal-about__story">
          <div className="minimal-about__timeline">
            {timeline.map((item) => (
              <div key={item.title} className="minimal-about__timeline-item">
                <span className="minimal-about__timeline-marker" aria-hidden>
                  <item.icon className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="minimal-about__timeline-year">{item.year}</p>
                  <p className="minimal-about__timeline-title">{item.title}</p>
                  <p className="minimal-about__timeline-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="minimal-about__prose">
            <p>
              {siteConfig.brand.name} was born in India with one goal: to give
              Indian customers a trusted place to shop for electronics,
              stationery, books, and fashion at honest prices. We started as a
              small team focused on the Indian market and have grown by putting
              quality and customer trust first.
            </p>
            <p>
              We work with trusted suppliers and brands to bring you mobile
              accessories, smart gadgets, computer accessories, home
              electronics, books, stationery, and apparel for men, women, and
              kids. Every product is chosen with Indian homes and budgets in
              mind.
            </p>
            <p>
              {siteConfig.brand.name} is operated by {siteConfig.brand.legalName}.
              As an Indian brand, we understand what you need: reliable delivery
              across the country, easy returns, secure UPI payments, and support
              when you need it. We are here to serve India, one order at a time.
            </p>
            <p>
              Registered office: {siteConfig.brand.address.full}.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values bento */}
      <section className="minimal-about__section pt-0">
        <div className="minimal-about__bento-wrap">
          <div className="minimal-about__bento">
            <article className="minimal-about__bento-card minimal-about__bento-card--light">
              <div className="minimal-about__bento-card-pattern" aria-hidden />
              <div className="minimal-about__bento-card-inner">
                <div className="minimal-about__bento-icon-row">
                  <span
                    className={cn(
                      candyIconClassName,
                      "minimal-about__bento-icon"
                    )}
                    aria-hidden
                  >
                    <Target strokeWidth={2} />
                  </span>
                  <h3 className="minimal-about__bento-label">Our Mission</h3>
                </div>
                <p className="minimal-about__bento-text">
                  To be India&apos;s trusted everyday store—offering quality
                  electronics, stationery, books, and garments at honest prices,
                  with safe payments and service that puts Indian customers first.
                </p>
              </div>
            </article>

            <article className="minimal-about__bento-card minimal-about__bento-card--dark">
              <div className="minimal-about__bento-card-pattern" aria-hidden />
              <div className="minimal-about__bento-card-inner">
                <div className="minimal-about__bento-icon-row">
                  <span
                    className={cn(
                      candyIconSuccessClassName,
                      "minimal-about__bento-icon"
                    )}
                    aria-hidden
                  >
                    <Users strokeWidth={2} />
                  </span>
                  <h3 className="minimal-about__bento-label">Our Values</h3>
                </div>
                <ul className="minimal-about__values-list">
                  {values.map((value) => (
                    <li key={value} className="minimal-about__value-item">
                      <span className="minimal-about__value-check" aria-hidden>
                        <BadgeCheck className="size-3" strokeWidth={2.5} />
                      </span>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="minimal-about__section pt-0">
        <div className="minimal-about__section-head">
          <p className="minimal-about__eyebrow">Why us</p>
          <h2 className="minimal-about__section-title">
            Why choose {siteConfig.brand.name}?
          </h2>
          <p className="minimal-about__section-desc">
            Everything we do is designed around how Indians shop — online and
            offline.
          </p>
        </div>

        <div className="minimal-about__features">
          {features.map((feature) => (
            <article key={feature.title} className="minimal-about__feature">
              <div className="minimal-about__feature-lines" aria-hidden />
              <div className="minimal-about__feature-inner">
                <span
                  className={cn(
                    feature.candy === "green"
                      ? candyIconSuccessClassName
                      : candyIconClassName,
                    "minimal-about__feature-icon"
                  )}
                  aria-hidden
                >
                  <feature.icon strokeWidth={2} />
                </span>
                <h3 className="minimal-about__feature-title">{feature.title}</h3>
                <p className="minimal-about__feature-text">{feature.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="minimal-about__cta">
       
        <div className="minimal-about__cta-inner">
          <h2 className="minimal-about__cta-title">Ready to start shopping?</h2>
          <p className="minimal-about__cta-text">
            Browse our collections or get in touch — we&apos;re here to help
            every step of the way.
          </p>
          <div className="minimal-about__cta-actions">
            <CandyButtonLink href="/shop" className="minimal-about__cta-btn">
              Explore Products
            </CandyButtonLink>
            <CandyButtonLink
              href="/contact"
              variant="success"
              className="minimal-about__cta-btn"
            >
              Get in Touch
            </CandyButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
