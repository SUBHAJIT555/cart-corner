"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Check, Expand, Heart, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { updateproductDetails } from "@/redux/features/product-details";
import { CandyButton } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

const QuickViewModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const product = useAppSelector((state) => state.quickViewReducer.value);
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleCloseModal = useCallback(() => {
    closeModal();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("productId");
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });
  }, [searchParams, router, pathname, closeModal]);

  const discountPercentage =
    product.price > 0
      ? Math.round(
          ((product.price - product.discountedPrice) / product.price) * 100
        )
      : 0;

  const handlePreviewSlider = () => {
    dispatch(updateproductDetails(product));
    openPreviewModal();
  };

  const handleAddToCart = () => {
    if (isInCart) {
      return;
    }

    dispatch(
      addItemToCart({
        ...product,
        quantity,
      })
    );
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeItemFromWishlist(product.id));
      return;
    }

    dispatch(
      addItemToWishlist({
        ...product,
        status: "available",
        quantity: 1,
      })
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest(".minimal-quick-view__dialog")) {
        handleCloseModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setQuantity(1);
    };
  }, [isModalOpen, handleCloseModal]);

  if (!isModalOpen) {
    return null;
  }

  const badgeLabel = product.isNewArrival
    ? "New Arrival"
    : product.isBestSelling
      ? "Best Selling"
      : product.isTrending
        ? "Trending"
        : discountPercentage > 0
          ? `Sale ${discountPercentage}% Off`
          : null;

  return (
    <div
      className="minimal-quick-view minimal-quick-view__backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.title}`}
    >
      <div className="minimal-quick-view__dialog modal-content">
        <div className="minimal-quick-view__dialog-bg" aria-hidden>
          <div className="minimal-quick-view__dialog-dots" />
        </div>

        <div className="minimal-quick-view__dialog-body">
        <button
          type="button"
          onClick={handleCloseModal}
          aria-label="Close quick view"
          className="minimal-quick-view__close"
        >
          <X className="size-5" strokeWidth={1.75} />
        </button>

        <div className="minimal-quick-view__grid">
          <div className="minimal-quick-view__media">
            <button
              type="button"
              onClick={handlePreviewSlider}
              aria-label="Open image preview"
              className="minimal-quick-view__zoom"
            >
              <Expand className="size-4" strokeWidth={1.75} />
            </button>

            <div className="minimal-quick-view__media-inner">
              {product.img && (
                <Image
                  src={product.img}
                  alt={product.title}
                  width={420}
                  height={420}
                  className="max-h-[360px] w-auto object-contain"
                />
              )}
            </div>
          </div>

          <div className="minimal-quick-view__content">
            {badgeLabel && (
              <span className="minimal-quick-view__badge">{badgeLabel}</span>
            )}

            <h3 className="minimal-quick-view__title">{product.title}</h3>

            <div className="minimal-quick-view__meta">
              <div className="minimal-quick-view__rating">
                <div className="flex items-center gap-0.5 text-cc-accent">
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
                <span>
                  <strong>{product.rating?.toFixed(1) || "4.7"} Rating</strong>{" "}
                  <span>({product.reviews || 0} reviews)</span>
                </span>
              </div>

              <div className="minimal-quick-view__stock">
                {product.inStock !== false ? (
                  <>
                    <Check className="size-4 text-cc-success" strokeWidth={2.5} />
                    In Stock
                  </>
                ) : (
                  <>
                    <X className="size-4 text-cc-danger" strokeWidth={2.5} />
                    Out of Stock
                  </>
                )}
              </div>
            </div>

            <p className="minimal-quick-view__description">
              {product.description ||
                "Premium quality product with excellent features and durability. Perfect for everyday use."}
            </p>

            <div className="minimal-quick-view__purchase">
              <div className="minimal-quick-view__purchase-col">
                <h4 className="minimal-quick-view__label">Price</h4>
                <div className="minimal-quick-view__price-row">
                  <span className="minimal-quick-view__price">
                    ₹{product.discountedPrice.toLocaleString("en-IN")}
                  </span>
                  {product.price > product.discountedPrice && (
                    <span className="minimal-quick-view__price-old">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              <div className="minimal-quick-view__purchase-col">
                <h4 className="minimal-quick-view__label">Quantity</h4>
                <div className="minimal-quick-view__qty">
                  <button
                    type="button"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    aria-label="Decrease quantity"
                    className="minimal-quick-view__qty-btn"
                    disabled={quantity <= 1}
                  >
                    <Minus className="size-4" strokeWidth={2} />
                  </button>

                  <span className="minimal-quick-view__qty-value">{quantity}</span>

                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="minimal-quick-view__qty-btn"
                  >
                    <Plus className="size-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            <div className="minimal-quick-view__actions">
              <button
                type="button"
                aria-label={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
                className={cn(
                  "minimal-quick-view__wishlist-btn",
                  isInWishlist && "is-active"
                )}
                onClick={handleWishlistToggle}
              >
                <Heart
                  className="size-4"
                  strokeWidth={1.75}
                  fill={isInWishlist ? "currentColor" : "none"}
                />
              </button>

              <CandyButton
                type="button"
                variant={isInCart ? "success" : "default"}
                className="minimal-quick-view__cart-btn"
                onClick={handleAddToCart}
                disabled={product.inStock === false}
              >
                {isInCart ? (
                  <>
                    <Check className="size-4 shrink-0" strokeWidth={2.5} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="size-4 shrink-0" strokeWidth={2} />
                    Add to Cart
                  </>
                )}
              </CandyButton>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
