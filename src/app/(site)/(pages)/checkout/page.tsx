import React from "react";
import Checkout from "@/components/Checkout";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.checkout;

const CheckoutPage = () => {
  return (
    <main>
      <Checkout />
    </main>
  );
};

export default CheckoutPage;
