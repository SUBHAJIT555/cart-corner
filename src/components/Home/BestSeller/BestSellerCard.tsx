"use client";

import Image from "next/image";
import { Check, Eye, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/features/wishlist-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { CandyButton } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

interface BestSellerCardProps {
  item: Product;
}

const stopCardClick = (event: React.MouseEvent) => {
  event.stopPropagation();
};

const BestSellerCard = ({ item }: BestSellerCardProps) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlistReducer.items
  );
  const cartItems = useSelector((state: RootState) => state.cartReducer.items);
  const isInWishlist = wishlistItems.some((w) => w.id === item.id);
  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const discount =
    item.price > 0
      ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
      : 0;

  const handleQuickView = () => {
    dispatch(updateQuickView({ ...item }));
    openModal();
  };

  const handleAddToCart = () => {
    if (isInCart) {
      return;
    }

    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeItemFromWishlist(item.id));
      return;
    }

    dispatch(
      addItemToWishlist({
        ...item,
        status: "available",
        quantity: 1,
      })
    );
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleQuickView();
    }
  };

  return (
    <article
      className="new-arrival-card h-full cursor-pointer"
      onClick={handleQuickView}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
    >
      <div aria-hidden className="new-arrival-card__pattern" />

      <div className="new-arrival-card__inner">
        <div className="new-arrival-card__media">
          <span className="new-arrival-card__badge new-arrival-card__badge--bestseller">
            Best Seller
          </span>

          <div className="new-arrival-card__image-wrap">
            <Image
              src={item.img}
              alt={item.title}
              width={220}
              height={220}
              className="max-h-[190px] w-auto object-contain"
            />
          </div>
        </div>

        <div className="new-arrival-card__content">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M7 0.5L8.57 4.36L12.73 4.68L9.64 7.36L10.73 11.5L7 9.36L3.27 11.5L4.36 7.36L1.27 4.68L5.43 4.36L7 0.5Z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-gray-500">({item.reviews})</p>
          </div>

          <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
            {item.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-gray-900">
             Price: ₹{item.discountedPrice.toLocaleString("en-IN")}
            </span>
            {discount > 0 && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
                <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                  -{discount}%
                </span>
              </>
            )}
          </div>
        </div>

        <div className="new-arrival-card__actions" onClick={stopCardClick}>
          <button
            type="button"
            aria-label={`Quick view ${item.title}`}
            className="new-arrival-card__icon-btn"
            onClick={handleQuickView}
          >
            <Eye className="size-4" strokeWidth={1.75} />
          </button>

          <CandyButton
            type="button"
            variant={isInCart ? "success" : "default"}
            className="new-arrival-card__candy-btn"
            onClick={handleAddToCart}
            aria-label={
              isInCart
                ? `${item.title} added to cart`
                : `Add ${item.title} to cart`
            }
          >
            {isInCart ? (
              <>
                <Check className="size-3.5 shrink-0" strokeWidth={2.5} />
                added to cart
              </>
            ) : (
              <>
                <ShoppingCart className="size-3.5 shrink-0" strokeWidth={2} />
                Add to cart
              </>
            )}
          </CandyButton>

          <button
            type="button"
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
            className={cn(
              "new-arrival-card__icon-btn",
              isInWishlist && "new-arrival-card__icon-btn--active"
            )}
            onClick={handleWishlistToggle}
          >
            <Heart
              className="size-4"
              strokeWidth={1.75}
              fill={isInWishlist ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BestSellerCard;
