"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CandyButtonLink } from "@/components/ui/candy-button";

import "swiper/css/pagination";
import "swiper/css";

const brandName = siteConfig.brand.name;

const slides = [
  {
    eyebrow: brandName,
    stat: null,
    statLabel: null,
    title: "Electronics, stationery, books & fashion",
    description:
      "Everything you need—gadgets, study supplies, books and fashion. Quality products at honest prices, delivered across India.",
    image: "/images/HomePageImages/1.webp",
    imageAlt: "Shopping collection",
    cta: "Shop Now",
  },
  {
    eyebrow: "Limited offer",
    stat: "30%",
    statLabel: "off",
    title: "Best deals on electronics & more",
    description:
      "Shop electronics, stationery, books, garments and more. Curated picks built for the Indian market.",
    image: "/images/HomePageImages/2.webp",
    imageAlt: "Sale products",
    cta: "Grab Deals",
  },
];

const HeroCarousel = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="minimal-hero-carousel hero-carousel"
      observer
      observeParents
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-6 sm:gap-10 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="flex-1 min-w-0 max-w-md">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cc-accent">
                  {slide.eyebrow}
                </span>
                {slide.stat && (
                  <span className="text-sm font-medium text-cc-text">
                    <span className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-cc-accent">
                      {slide.stat}
                    </span>{" "}
                    {slide.statLabel}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-2xl sm:text-[2.25rem] lg:text-[2.75rem] font-bold tracking-tight text-cc-text leading-[1.1] mb-4">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-base leading-relaxed text-cc-text-secondary mb-8 max-w-md">
                {slide.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <CandyButtonLink href="/shop" className="text-sm px-8 py-3">
                  {slide.cta}
                </CandyButtonLink>
                <CandyButtonLink
                  href="/shop"
                  variant="outline"
                  className="text-sm px-8 py-3"
                >
                  Explore
                </CandyButtonLink>
              </div>
            </div>

            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative bg-cc-surface p-3 border-[3px] border-cc-border rounded-cc shadow-brutal">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  width={300}
                  height={300}
                  className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] object-cover rounded-cc"
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
