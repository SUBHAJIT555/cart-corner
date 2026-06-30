import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { CandyButtonLink } from "@/components/ui/candy-button";

const EmptyCart = () => {
  const { closeCartModal } = useCartModalContext();

  return (
    <div className="cart-drawer-empty">
      <div className="cart-drawer-empty__icon" aria-hidden>
        <ShoppingBag className="size-7" strokeWidth={1.5} />
      </div>
      <h3 className="cart-drawer-empty__title">Your cart is empty</h3>
      <p className="cart-drawer-empty__text">
        Browse our collections and add items you love — they&apos;ll show up
        here.
      </p>
      <CandyButtonLink
        href="/shop"
        onClick={closeCartModal}
        className="cart-drawer-empty__cta"
      >
        Continue Shopping
      </CandyButtonLink>
    </div>
  );
};

export default EmptyCart;
