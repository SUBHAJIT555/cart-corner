import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.wishlist;

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
