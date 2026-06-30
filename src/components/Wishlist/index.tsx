"use client";

import React from "react";
import { Heart } from "lucide-react";
import Breadcrumb from "../Common/Breadcrumb";
import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { removeAllItemsFromWishlist } from "@/redux/features/wishlist-slice";
import SingleItem from "./SingleItem";
import { CandyButtonLink } from "@/components/ui/candy-button";

export const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  const handleClearWishlist = () => {
    dispatch(removeAllItemsFromWishlist());
  };

  return (
    <>
      <Breadcrumb
        title="Wishlist"
        pages={["Wishlist"]}
        description="Save products you love and add them to your cart when you're ready."
      />

      <section className="minimal-wishlist-page">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
          {wishlistItems.length > 0 ? (
            <>
              <div className="minimal-wishlist-page__header">
                <div>
                  <p className="minimal-wishlist-page__eyebrow">Saved items</p>
                  <h2 className="minimal-wishlist-page__title">
                    Your Wishlist ({wishlistItems.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleClearWishlist}
                  className="minimal-wishlist-page__clear"
                >
                  Clear wishlist
                </button>
              </div>

              <div className="minimal-wishlist-page__panel">
                <div className="minimal-wishlist-page__table-head">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Stock</span>
                  <span>Action</span>
                </div>

                {wishlistItems.map((item, index) => (
                  <SingleItem
                    item={item}
                    key={item.id}
                    isLast={index === wishlistItems.length - 1}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="wishlist-page-empty">
              <div className="wishlist-page-empty__icon" aria-hidden>
                <Heart className="size-8" strokeWidth={1.5} />
              </div>
              <h2 className="wishlist-page-empty__title">
                Your wishlist is empty
              </h2>
              <p className="wishlist-page-empty__text">
                Tap the heart on any product to save it here for later.
              </p>
              <CandyButtonLink href="/shop" className="wishlist-page-empty__cta">
                Browse Products
              </CandyButtonLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
