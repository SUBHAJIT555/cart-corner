import React, { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CandyButton } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

interface CartItem {
  id: number;
  title: string;
  img: string;
  discountedPrice: number;
  quantity: number;
}

interface SingleItemProps {
  item: CartItem;
  isLast?: boolean;
}

const SingleItem = ({ item, isLast }: SingleItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    const next = quantity + 1;
    setQuantity(next);
    dispatch(updateCartItemQuantity({ id: item.id, quantity: next }));
  };

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return;
    const next = quantity - 1;
    setQuantity(next);
    dispatch(updateCartItemQuantity({ id: item.id, quantity: next }));
  };

  return (
    <article
      className={cn("cart-page-item", isLast && "cart-page-item--last")}
    >
      <div className="cart-page-item__product">
        <div className="cart-page-item__image">
          <Image width={72} height={72} src={item.img} alt={item.title} />
        </div>
        <Link href="/shop" className="cart-page-item__name line-clamp-2">
          {item.title}
        </Link>
      </div>

      <p className="cart-page-item__price">
        ₹{item.discountedPrice.toLocaleString("en-IN")}
      </p>

      <div className="cart-page-item__qty">
        <div className="cart-page-item__stepper">
          <button
            type="button"
            onClick={handleDecreaseQuantity}
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" strokeWidth={2} />
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={handleIncreaseQuantity}
            aria-label="Increase quantity"
          >
            <Plus className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <p className="cart-page-item__subtotal">
        ₹{(item.discountedPrice * quantity).toLocaleString("en-IN")}
      </p>

      <CandyButton
        type="button"
        variant="danger"
        onClick={handleRemoveFromCart}
        aria-label={`Remove ${item.title} from cart`}
        className="cart-page-item__remove"
      >
        <Trash2 className="size-4" strokeWidth={2} />
      </CandyButton>
    </article>
  );
};

export default SingleItem;
