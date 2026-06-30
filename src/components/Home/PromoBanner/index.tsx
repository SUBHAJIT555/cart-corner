import React from "react";
import Image from "next/image";
import { CandyButtonLink } from "@/components/ui/candy-button";

const featuredPromo = {
  eyebrow: "Limited time",
  category: "Electronics, Books, Stationery & Garments",
  title: "Up to 30% off — electronics, books & more",
  description:
    "Shop mobile accessories, smart gadgets, computer accessories, home electronics, books, stationery, and fashion for men, women & kids. Quality products at great prices, delivered across India.",
  image: "/images/HomePageImages/6.webp",
  imageAlt: "Electronics and lifestyle products",
  href: "/shop",
  cta: "Shop Now",
};

const compactPromos = [
  {
    eyebrow: "Books & Stationery",
    title: "Office Essentials",
    highlight: "Flat 20% off",
    description: "Notebooks, pens, desk organizers, and everyday office must-haves.",
    image: "/images/HomePageImages/7.webp",
    imageAlt: "Books and stationery",
    href: "/shop",
    cta: "Shop Now",
    imageSide: "left" as const,
  },
  {
    eyebrow: "Men's, Women's & Kids' Wear",
    title: "Up to 40% off fashion",
    highlight: "New season styles",
    description:
      "Fresh garments for the whole family — quality fabric, great fits, honest prices.",
    image: "/images/HomePageImages/5.webp",
    imageAlt: "Fashion apparel",
    href: "/shop",
    cta: "Shop Now",
    imageSide: "right" as const,
  },
];

const PromoBanner = () => {
  return (
    <section className="minimal-promo-banner overflow-hidden pt-12 lg:pt-16">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0 pb-14 border-b border-gray-200/80">
        <div className="mb-8 sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-2">
            Special Offers
          </p>
          <h2 className="cc-section-title font-heading">
            Deals You&apos;ll Love
          </h2>
          <p className="mt-2 text-sm text-gray-500 max-w-lg">
            Curated savings across our most popular categories — minimal fuss,
            maximum value.
          </p>
        </div>

        <article className="promo-banner-card promo-banner-card--featured mb-5 sm:mb-6">
          <div className="promo-banner-card__wash" aria-hidden />
          <div className="promo-banner-card__dots" aria-hidden />

          <div className="promo-banner-card__inner">
            <div className="promo-banner-card__copy">
              <p className="promo-banner-card__eyebrow">{featuredPromo.eyebrow}</p>
              <p className="promo-banner-card__meta">{featuredPromo.category}</p>
              <h3 className="promo-banner-card__title">{featuredPromo.title}</h3>
              <p className="promo-banner-card__text">{featuredPromo.description}</p>
              <div className="promo-banner-card__cta">
                <CandyButtonLink
                  href={featuredPromo.href}
                  className="text-sm px-7 py-2.5"
                >
                  {featuredPromo.cta}
                </CandyButtonLink>
              </div>
            </div>

            <div className="promo-banner-card__media">
              <Image
                src={featuredPromo.image}
                alt={featuredPromo.imageAlt}
                width={274}
                height={350}
                className="max-h-[220px] sm:max-h-[260px] lg:max-h-[300px] w-auto"
              />
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {compactPromos.map((promo) => (
            <article
              key={promo.title}
              className={`promo-banner-card promo-banner-card--compact promo-banner-card--image-${promo.imageSide}`}
            >
              <div className="promo-banner-card__pattern" aria-hidden />

              <div className="promo-banner-card__inner">
                <div className="promo-banner-card__media">
                  <Image
                    src={promo.image}
                    alt={promo.imageAlt}
                    width={200}
                    height={200}
                    className="max-h-[150px] sm:max-h-[170px] w-auto mx-auto"
                  />
                </div>

                <div className="promo-banner-card__copy">
                  <p className="promo-banner-card__eyebrow">{promo.eyebrow}</p>
                  <h3 className="promo-banner-card__title">{promo.title}</h3>
                  <span className="promo-banner-card__pill">{promo.highlight}</span>
                  <p className="promo-banner-card__text mt-2">{promo.description}</p>
                  <div className="promo-banner-card__cta">
                    <CandyButtonLink
                      href={promo.href}
                      className="text-sm px-6 py-2"
                    >
                      {promo.cta}
                    </CandyButtonLink>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
