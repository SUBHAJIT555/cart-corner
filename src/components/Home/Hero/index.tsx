import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import Link from "next/link";
import { CandyButtonLink } from "@/components/ui/candy-button";

const promos = [
  {
    title: "Electronics & Gadgets",
    label: "Starting at",
    price: "₹499",
    image: "/images/HomePageImages/3.webp",
    imageAlt: "Electronics",
    href: "/shop",
    cta: "Explore",
  },
  {
    title: "More Offers",
    label: "From just",
    price: "₹99",
    image: "/images/HomePageImages/4.webp",
    imageAlt: "Books and fashion",
    href: "/shop",
    cta: "View All",
  },
];

const Hero = () => {
  return (
    <section className="minimal-hero pb-10 lg:pb-14 pt-[4.5rem] sm:pt-24 xl:pt-36">
      <div className="minimal-hero__bg" aria-hidden>
        <div className="minimal-hero__bg-gradient" />
        <div className="minimal-hero__bg-rays minimal-hero__bg-rays--light" />
        <div className="minimal-hero__shape minimal-hero__shape--1" />
        <div className="minimal-hero__shape minimal-hero__shape--2" />
        <div className="minimal-hero__shape minimal-hero__shape--3" />
      </div>
      <div className="minimal-hero__inner max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
        <div className="minimal-hero__grid">
          <div className="minimal-hero__main-col">
            <div className="minimal-hero__carousel-card">
              <HeroCarousel />
            </div>
          </div>

          <div className="minimal-hero__side-col">
            {promos.map((promo) => (
              <div
                key={promo.title}
                className="minimal-hero__promo-card p-5 sm:p-6 flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <Link
                    href={promo.href}
                    className="block font-heading text-lg font-bold tracking-tight text-cc-text mb-6 hover:text-cc-accent transition-colors"
                  >
                    {promo.title}
                  </Link>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-cc-accent mb-1">
                    {promo.label}
                  </p>
                  <p className="font-heading text-2xl font-bold tracking-tight text-cc-text mb-5">
                    {promo.price}
                  </p>
                  <CandyButtonLink
                    href={promo.href}
                    variant="outline"
                    className="text-sm px-6 py-2.5"
                  >
                    {promo.cta}
                  </CandyButtonLink>
                </div>
                <div className="flex-shrink-0">
                  <Image
                    src={promo.image}
                    alt={promo.imageAlt}
                    width={100}
                    height={120}
                    className="w-[88px] h-auto sm:w-[100px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <HeroFeature />
      </div>
    </section>
  );
};

export default Hero;
