import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <article className="testimonial-card">
      <div aria-hidden className="testimonial-card__pattern" />

      <div className="testimonial-card__inner">
        <Quote
          className="testimonial-card__quote size-7"
          strokeWidth={1.5}
          aria-hidden
        />

        <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 0.5L8.57 4.36L12.73 4.68L9.64 7.36L10.73 11.5L7 9.36L3.27 11.5L4.36 7.36L1.27 4.68L5.43 4.36L7 0.5Z" />
            </svg>
          ))}
        </div>

        <p className="testimonial-card__review">&ldquo;{testimonial.review}&rdquo;</p>

        <footer className="testimonial-card__author">
          <div className="testimonial-card__avatar">
            <Image
              src={testimonial.authorImg}
              alt={testimonial.authorName}
              width={48}
              height={48}
            />
          </div>

          <div>
            <h3 className="testimonial-card__name">{testimonial.authorName}</h3>
            <p className="testimonial-card__role">{testimonial.authorRole}</p>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default TestimonialCard;
