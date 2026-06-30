"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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

interface ShopListCardProps {
  item: Product;
  isLast?: boolean;
}

const stopCardClick = (event: React.MouseEvent) => {
  event.stopPropagation();
};

const ShopListCard = ({ item, isLast }: ShopListCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    const params = new URLSearchParams(searchParams.toString());
    params.set("productId", item.id.toString());
    router.push(`?${params.toString()}`, { scroll: false });
    openModal();
  };

  const handleAddToCart = () => {
    if (isInCart) return;
    dispatch(addItemToCart({ ...item, quantity: 1 }));
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
      className={cn("shop-list-card", isLast && "shop-list-card--last")}
      onClick={handleQuickView}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
    >
      <div className="shop-list-card__pattern" aria-hidden />

      <div className="shop-list-card__inner">
        <div className="shop-list-card__media">
          {discount > 0 && (
            <span className="shop-list-card__badge">-{discount}%</span>
          )}
          <Image
            src={item.img}
            alt={item.title}
            width={160}
            height={160}
            className="max-h-[120px] w-auto object-contain"
          />
        </div>

        <div className="shop-list-card__content">
          <div className="shop-list-card__meta">
            <div className="flex items-center gap-0.5 text-cc-accent">
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
            <span className="text-xs text-cc-muted">({item.reviews})</span>
          </div>

          <h3 className="shop-list-card__title line-clamp-2">{item.title}</h3>

          <div className="shop-list-card__prices">
            <span>₹{item.discountedPrice.toLocaleString("en-IN")}</span>
            {discount > 0 && (
              <span className="shop-list-card__price-old">
                ₹{item.price.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        <div className="shop-list-card__actions" onClick={stopCardClick}>
          <button
            type="button"
            className="new-arrival-card__icon-btn"
            onClick={handleQuickView}
            aria-label={`Quick view ${item.title}`}
          >
            <Eye className="size-4" strokeWidth={1.75} />
          </button>

          <CandyButton
            type="button"
            variant={isInCart ? "success" : "default"}
            className="shop-list-card__cart-btn"
            onClick={handleAddToCart}
            disabled={isInCart}
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
            className={cn(
              "new-arrival-card__icon-btn",
              isInWishlist && "new-arrival-card__icon-btn--active"
            )}
            onClick={handleWishlistToggle}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
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

export default ShopListCard;
