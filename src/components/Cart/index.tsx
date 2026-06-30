"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";
import SingleItem from "./SingleItem";
import Breadcrumb from "../Common/Breadcrumb";
import { CandyButtonLink } from "@/components/ui/candy-button";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  const handleClearCart = () => {
    dispatch(removeAllItemsFromCart());
  };

  return (
    <>
      <Breadcrumb
        title="Cart"
        pages={["Cart"]}
        description="Review items in your bag before checkout."
      />

      {cartItems.length > 0 ? (
        <section className="minimal-cart-page">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
            <div className="minimal-cart-page__header">
              <div>
                <p className="minimal-cart-page__eyebrow">Shopping bag</p>
                <h2 className="minimal-cart-page__title">
                  Your Cart ({cartItems.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClearCart}
                className="minimal-cart-page__clear"
              >
                Clear cart
              </button>
            </div>

            <div className="minimal-cart-page__panel">
              <div className="minimal-cart-page__table-head">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span aria-hidden />
              </div>

              {cartItems.map((item, index) => (
                <SingleItem
                  item={item}
                  key={item.id}
                  isLast={index === cartItems.length - 1}
                />
              ))}
            </div>

            <div className="minimal-cart-page__extras">
              <Discount />
              <OrderSummary />
            </div>
          </div>
        </section>
      ) : (
        <section className="minimal-cart-page">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
            <div className="cart-page-empty">
              <div className="cart-page-empty__icon" aria-hidden>
                <ShoppingBag className="size-8" strokeWidth={1.5} />
              </div>
              <h2 className="cart-page-empty__title">Your cart is empty</h2>
              <p className="cart-page-empty__text">
                Browse our collections and add items you love — they&apos;ll show
                up here.
              </p>
              <CandyButtonLink href="/shop" className="cart-page-empty__cta">
                Continue Shopping
              </CandyButtonLink>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
