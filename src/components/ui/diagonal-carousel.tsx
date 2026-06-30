"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagonalCarouselItem {
  src: string;
  title: string;
  alt?: string;
  href?: string;
}

export interface DiagonalCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: DiagonalCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  loop?: boolean;
  slideSize?: number;
  rotationStep?: number;
  verticalStep?: number;
  inactiveScale?: number;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  viewportClassName?: string;
  controlsWrapperClassName?: string;
  slideClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  controlsClassName?: string;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.16,
  duration: 0.85,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function DiagonalCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = false,
  slideSize = 260,
  rotationStep = 30,
  verticalStep = 120,
  inactiveScale = 0.6,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = true,
  viewportClassName,
  controlsWrapperClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  className,
  onKeyDown,
  tabIndex,
  ...props
}: DiagonalCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex)
  );
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex);
  const safeSlideSize = Math.max(120, slideSize);
  const safeInactiveScale = clamp(inactiveScale, 0.35, 1);

  const selectSlide = React.useCallback(
    (nextIndex: number) => {
      if (!items.length) {
        return;
      }

      const resolvedIndex = loop
        ? (nextIndex + items.length) % items.length
        : clamp(nextIndex, 0, maxIndex);

      if (activeIndex === undefined) {
        setUncontrolledIndex(resolvedIndex);
      }

      onActiveIndexChange?.(resolvedIndex);
    },
    [activeIndex, items.length, loop, maxIndex, onActiveIndexChange]
  );

  const handleSlideClick = (index: number, isActive: boolean) => {
    if (isActive) {
      return;
    }
    selectSlide(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };

  if (!items.length) {
    return null;
  }

  const isPreviousDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;

  const renderCardMedia = (item: DiagonalCarouselItem, isActive: boolean) => {
    const media = (
      <>
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-[1] rounded-2xl opacity-0 transition-opacity duration-300",
            "bg-gradient-to-t from-black/35 via-black/5 to-transparent",
            "group-hover/card:opacity-100",
            isActive && "from-[#0C80FB]/20 via-transparent"
          )}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt ?? item.title}
          draggable={false}
          className={cn(
            "h-full w-full select-none object-cover transition-transform duration-500 ease-out",
            "group-hover/card:scale-[1.06]",
            imageClassName
          )}
        />
      </>
    );

    const cardClassName = cn(
      "group/card relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl",
      "border border-gray-200/90 bg-white shadow-sm",
      "transition-[box-shadow,transform] duration-300 ease-out",
      "hover:-translate-y-0.5 hover:shadow-md",
      isActive
        ? "ring-1 ring-[#0C80FB]/25 hover:shadow-[0_16px_36px_-14px_rgba(12,128,251,0.28)]"
        : "hover:ring-gray-300/60"
    );

    return { media, cardClassName };
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Diagonal image carousel"
      tabIndex={tabIndex ?? 0}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative isolate flex h-full w-full flex-col overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative min-h-0 flex-1 overflow-hidden",
          viewportClassName
        )}
      >
        <motion.div
          className="absolute left-1/2 top-[42%] flex w-fit -translate-y-1/2 sm:top-[40%]"
          animate={{ x: -(currentIndex * safeSlideSize + safeSlideSize / 2) }}
          transition={transition}
        >
          {items.map((item, index) => {
            const isActive = currentIndex === index;
            const distance = index - currentIndex;

            return (
              <motion.div
                key={`${item.src}-${index}`}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-2 will-change-transform",
                  slideClassName
                )}
                style={{ width: safeSlideSize }}
                animate={{
                  rotate: distance * rotationStep,
                  scale: isActive ? 1 : safeInactiveScale,
                  y: distance * verticalStep,
                }}
                transition={transition}
              >
                <motion.p
                  className={cn(
                    "whitespace-nowrap text-sm font-semibold tracking-tight text-gray-900",
                    labelClassName
                  )}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.title}
                </motion.p>

                {(() => {
                  const { media, cardClassName } = renderCardMedia(
                    item,
                    isActive
                  );

                  if (isActive && item.href) {
                    return (
                      <Link
                        href={item.href}
                        aria-label={`Browse ${item.title}`}
                        className={cardClassName}
                      >
                        {media}
                      </Link>
                    );
                  }

                  return (
                    <button
                      type="button"
                      aria-label={`Show ${item.title}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cardClassName}
                      onClick={() => handleSlideClick(index, isActive)}
                    >
                      {media}
                    </button>
                  );
                })()}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {showControls && (
        <div
          className={cn(
            "shrink-0 border-t border-gray-200/80 bg-[#fafafa] px-4 py-3 sm:py-3.5",
            controlsWrapperClassName
          )}
        >
          <div
            className={cn(
              "mx-auto flex w-fit max-w-full items-center justify-center gap-2.5 rounded-full border border-gray-200 bg-white px-2 py-1 text-gray-700 shadow-sm",
              controlsClassName
            )}
          >
          <button
            type="button"
            aria-label="Show previous slide"
            disabled={isPreviousDisabled}
            className="inline-flex size-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-35 sm:size-9"
            onClick={() => selectSlide(currentIndex - 1)}
          >
            <ChevronLeft className="size-5" />
          </button>

          {showDots && (
            <div className="flex items-center justify-center gap-2 max-w-[200px] overflow-x-auto">
              {items.map((item, index) => (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${item.title}`}
                  aria-current={currentIndex === index ? "true" : undefined}
                  className={cn(
                    "h-1.5 shrink-0 rounded-full transition-[width,opacity,background-color] duration-300",
                    currentIndex === index
                      ? "w-6 bg-[#0C80FB] opacity-100"
                      : "w-1.5 bg-gray-300 opacity-100"
                  )}
                  onClick={() => selectSlide(index)}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            aria-label="Show next slide"
            disabled={isNextDisabled}
            className="inline-flex size-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-35 sm:size-9"
            onClick={() => selectSlide(currentIndex + 1)}
          >
            <ChevronRight className="size-5" />
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DiagonalCarousel;
