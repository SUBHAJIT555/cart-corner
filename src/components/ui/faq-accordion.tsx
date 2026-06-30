"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FaqItem[];
  title?: string;
}

export function FaqAccordion({
  items = [],
  title,
  className,
  ...props
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className={cn("faq-accordion w-full font-sans", className)}
      {...props}
    >
      {title ? (
        <h2 className="faq-accordion__title">{title}</h2>
      ) : null}

      <ul className="faq-accordion__list">
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <li
              key={index}
              className={cn(
                "faq-accordion__item",
                isActive && "faq-accordion__item--active"
              )}
            >
              <button
                type="button"
                className={cn(
                  "faq-accordion__trigger",
                  isActive && "faq-accordion__trigger--active"
                )}
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                <span
                  className={cn(
                    "faq-accordion__symbol",
                    isActive && "faq-accordion__symbol--active"
                  )}
                  aria-hidden
                >
                  {isActive ? "−" : "+"}
                </span>

                <span className="faq-accordion__question">{item.question}</span>

                <span
                  className={cn(
                    "faq-accordion__chevron",
                    isActive && "faq-accordion__chevron--active"
                  )}
                  aria-hidden
                />
              </button>

              <div
                className={cn(
                  "faq-accordion__panel",
                  isActive && "faq-accordion__panel--active"
                )}
              >
                <div className="faq-accordion__panel-inner">
                  <div className="faq-accordion__answer">{item.answer}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
