import React from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import Image from "next/image";
import { Check, CheckCircle2, Trash2, XCircle } from "lucide-react";
import { CandyButton } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  status?: string;
  img: string;
}

interface SingleItemProps {
  item: WishlistItem;
  isLast?: boolean;
}

const SingleItem = ({ item, isLast }: SingleItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cartReducer.items);
  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const isOutOfStock =
    item.status === "out of stock" || item.status === "unavailable";

  const handleRemoveFromWishlist = () => {
    dispatch(removeItemFromWishlist(item.id));
  };

  const handleAddToCart = () => {
    if (isInCart || isOutOfStock) {
      return;
    }

    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  return (
    <article
      className={cn("wishlist-page-item", isLast && "wishlist-page-item--last")}
    >
      <div className="wishlist-page-item__product">
        <div className="wishlist-page-item__image">
          {item.img && (
            <Image
              src={item.img}
              alt={item.title}
              width={72}
              height={72}
              className="object-contain"
            />
          )}
        </div>
        <h3 className="wishlist-page-item__name line-clamp-2">{item.title}</h3>
      </div>

      <p className="wishlist-page-item__price">
        ₹{item.discountedPrice.toLocaleString("en-IN")}
      </p>

      <div
        className={cn(
          "wishlist-page-item__stock",
          isOutOfStock
            ? "wishlist-page-item__stock--out"
            : "wishlist-page-item__stock--in"
        )}
      >
        {isOutOfStock ? (
          <>
            <XCircle className="size-4 shrink-0" strokeWidth={2} />
            <span>Out of Stock</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="size-4 shrink-0" strokeWidth={2} />
            <span>In Stock</span>
          </>
        )}
      </div>

      <div className="wishlist-page-item__actions">
        <CandyButton
          type="button"
          variant="danger"
          onClick={handleRemoveFromWishlist}
          aria-label={`Remove ${item.title} from wishlist`}
          className="wishlist-page-item__remove"
        >
          <Trash2 className="size-4" strokeWidth={2} />
        </CandyButton>
        <CandyButton
          type="button"
          variant="success"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isInCart}
          aria-label={
            isInCart
              ? `${item.title} added to cart`
              : `Add ${item.title} to cart`
          }
          className="wishlist-page-item__cart-btn"
        >
          {isInCart ? (
            <>
              <Check className="size-3.5 shrink-0" strokeWidth={2.5} />
              Added to cart
            </>
          ) : (
            "Add to Cart"
          )}
        </CandyButton>
      </div>
    </article>
  );
};

export default SingleItem;
