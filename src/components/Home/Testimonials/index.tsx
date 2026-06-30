"use client";

import { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import testimonialsData from "./testimonialsData";
import TestimonialCard from "./TestimonialCard";

import "swiper/css";

const Testimonials = () => {
  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <section className="minimal-testimonials overflow-hidden pt-12 lg:pt-16">
      <div className="minimal-testimonials__inner max-w-[1280px] w-full mx-auto px-4 sm:px-6 xl:px-0 pb-14">
        <div className="minimal-testimonials__header">
          <div>
            <p className="minimal-testimonials__eyebrow">Testimonials</p>
            <h2 className="minimal-testimonials__title font-heading">
              What Our Customers Say
            </h2>
            <p className="minimal-testimonials__subtitle">
              Real feedback from shoppers — fast delivery, fair prices, and
              products they trust.
            </p>
          </div>

          <div className="minimal-testimonials__nav">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="minimal-testimonials__nav-btn"
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="minimal-testimonials__nav-btn"
            >
              <ChevronRight className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <Swiper
          ref={sliderRef}
          className="minimal-testimonials-swiper"
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 1.15,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {testimonialsData.map((item, index) => (
            <SwiperSlide key={`${item.authorName}-${index}`}>
              <TestimonialCard testimonial={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
