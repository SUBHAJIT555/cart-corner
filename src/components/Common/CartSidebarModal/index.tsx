"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import {
  removeItemFromCart,
  selectTotalPrice,
} from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { CandyButton } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";
import SingleItem from "./SingleItem";
import EmptyCart from "./EmptyCart";

const CartSidebarModal = () => {
  const router = useRouter();
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  const goTo = (path: string) => {
    router.push(path);
    window.setTimeout(() => closeCartModal(), 80);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest(".minimal-cart-drawer__panel")) {
        closeCartModal();
      }
    }

    if (isCartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isCartModalOpen, closeCartModal]);

  return (
    <div
      className={cn("minimal-cart-drawer", isCartModalOpen && "is-open")}
      aria-hidden={!isCartModalOpen}
    >
      <button
        type="button"
        className="minimal-cart-drawer__backdrop"
        aria-label="Close cart"
        onClick={closeCartModal}
        tabIndex={isCartModalOpen ? 0 : -1}
      />

      <aside
        className="minimal-cart-drawer__panel modal-content"
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
      >
        <div className="minimal-cart-drawer__bg" aria-hidden>
          <div className="minimal-cart-drawer__wash" />
          <div className="minimal-cart-drawer__rays" />
        </div>

        <div className="minimal-cart-drawer__body">
          <div className="minimal-cart-drawer__header">
            <div>
              <p className="minimal-cart-drawer__eyebrow">Your bag</p>
              <h2 className="minimal-cart-drawer__title">
                Cart ({cartItems.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCartModal}
              aria-label="Close cart"
              className="minimal-cart-drawer__close"
            >
              <X className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="minimal-cart-drawer__items no-scrollbar">
            <div className="minimal-cart-drawer__list">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <SingleItem
                    key={item.id}
                    item={item}
                    removeItemFromCart={removeItemFromCart}
                    isLast={index === cartItems.length - 1}
                  />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="minimal-cart-drawer__footer">
              <div className="minimal-cart-drawer__subtotal">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>

              <div className="minimal-cart-drawer__actions">
                <CandyButton
                  type="button"
                  onClick={() => goTo("/cart")}
                  className="minimal-cart-drawer__action-btn"
                >
                  View Cart
                </CandyButton>
                <CandyButton
                  type="button"
                  variant="success"
                  onClick={() => goTo("/checkout")}
                  className="minimal-cart-drawer__action-btn"
                >
                  Checkout
                </CandyButton>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CartSidebarModal;
