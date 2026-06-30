import React from "react";
import { useDispatch } from "react-redux";
import { Trash2 } from "lucide-react";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { CandyButton } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

interface CartDrawerItem {
  id: number;
  title: string;
  img: string;
  discountedPrice: number;
  quantity: number;
}

interface SingleItemProps {
  item: CartDrawerItem;
  removeItemFromCart: (id: number) => { type: string; payload: number };
  isLast?: boolean;
}

const SingleItem = ({ item, removeItemFromCart, isLast }: SingleItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const lineTotal = item.discountedPrice * item.quantity;

  return (
    <article
      className={cn("cart-drawer-item", isLast && "cart-drawer-item--last")}
    >
      <div className="cart-drawer-item__main">
        <div className="cart-drawer-item__image">
          <Image src={item.img} alt={item.title} width={72} height={72} />
        </div>

        <div className="min-w-0">
          <h3 className="cart-drawer-item__title line-clamp-2">{item.title}</h3>
          <p className="cart-drawer-item__meta">
            <span className="cart-drawer-item__price">
              ₹{lineTotal.toLocaleString("en-IN")}
            </span>
            {item.quantity > 1 && (
              <span>
                {" "}
                · {item.quantity} × ₹
                {item.discountedPrice.toLocaleString("en-IN")}
              </span>
            )}
          </p>
        </div>
      </div>

      <CandyButton
        type="button"
        variant="danger"
        onClick={handleRemoveFromCart}
        aria-label={`Remove ${item.title} from cart`}
        className="cart-drawer-item__remove"
      >
        <Trash2 className="size-4" strokeWidth={2} />
      </CandyButton>
    </article>
  );
};

export default SingleItem;
