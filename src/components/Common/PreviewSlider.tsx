"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { useCallback, useRef } from "react";
import "swiper/css/navigation";
import "swiper/css";
import Image from "next/image";

import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { useAppSelector } from "@/redux/store";

const PreviewSliderModal = () => {
  const { closePreviewModal, isModalPreviewOpen } = usePreviewSlider();

  const product = useAppSelector((state) => state.productDetailsReducer.value);
  const quickViewProduct = useAppSelector(
    (state) => state.quickViewReducer.value
  );

  const activeProduct =
    product.id && product.id === quickViewProduct.id
      ? product
      : quickViewProduct.id
        ? quickViewProduct
        : product;

  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (!isModalPreviewOpen || !activeProduct.img) {
    return null;
  }

  return (
    <div className="preview-slider fixed inset-0 z-999999 flex items-center justify-center bg-[#000000F2] bg-opacity-70">
      <button
        onClick={() => closePreviewModal()}
        aria-label="Close image preview"
        className="absolute top-0 right-0 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white ease-in duration-150 hover:text-meta-5"
      >
        <svg
          className="fill-current"
          width="36"
          height="36"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
            fill=""
          />
        </svg>
      </button>

      <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 sm:left-8">
        <button
          type="button"
          className="rotate-180 cursor-pointer p-5"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5918 5.92548C14.9091 5.60817 15.4236 5.60817 15.7409 5.92548L22.2409 12.4255C22.5582 12.7428 22.5582 13.2572 22.2409 13.5745L15.7409 20.0745C15.4236 20.3918 14.9091 20.3918 14.5918 20.0745C14.2745 19.7572 14.2745 19.2428 14.5918 18.9255L19.7048 13.8125H4.33301C3.88428 13.8125 3.52051 13.4487 3.52051 13C3.52051 12.5513 3.88428 12.1875 4.33301 12.1875H19.7048L14.5918 7.07452C14.2745 6.75722 14.2745 6.24278 14.5918 5.92548Z"
              fill="#FDFDFD"
            />
          </svg>
        </button>
      </div>

      <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 sm:right-8">
        <button
          type="button"
          className="cursor-pointer p-5"
          onClick={handleNext}
          aria-label="Next image"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5918 5.92548C14.9091 5.60817 15.4236 5.60817 15.7409 5.92548L22.2409 12.4255C22.5582 12.7428 22.5582 13.2572 22.2409 13.5745L15.7409 20.0745C15.4236 20.3918 14.9091 20.3918 14.5918 20.0745C14.2745 19.7572 14.2745 19.2428 14.5918 18.9255L19.7048 13.8125H4.33301C3.88428 13.8125 3.52051 13.4487 3.52051 13C3.52051 12.5513 3.88428 12.1875 4.33301 12.1875H19.7048L14.5918 7.07452C14.2745 6.75722 14.2745 6.24278 14.5918 5.92548Z"
              fill="#FDFDFD"
            />
          </svg>
        </button>
      </div>

      <Swiper ref={sliderRef} slidesPerView={1} spaceBetween={20} className="w-full max-w-3xl px-16">
        <SwiperSlide>
          <div className="flex items-center justify-center">
            <Image
              src={activeProduct.img}
              alt={activeProduct.title}
              width={560}
              height={560}
              className="max-h-[80vh] w-auto object-contain"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PreviewSliderModal;
