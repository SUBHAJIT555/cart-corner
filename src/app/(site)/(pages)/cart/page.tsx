import React from "react";
import Cart from "@/components/Cart";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.cart;

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
