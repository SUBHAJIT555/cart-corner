import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import { getSiteNumber } from "@/lib/siteConfig";
import { selectProducts } from "@/lib/productSelector";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.shopWithoutSidebar;

const ShopWithoutSidebarPage = () => {
  const siteNumber = getSiteNumber();
  const products = selectProducts(siteNumber);

  return (
    <main>
      <ShopWithoutSidebar products={products} />
    </main>
  );
};

export default ShopWithoutSidebarPage;
