import type { Metadata } from "next";
import Home from "@/components/Home";
import { getSiteNumber } from "@/lib/siteConfig";
import { selectProducts } from "@/lib/productSelector";
import { pageSeo } from "@/config/seo";

export const metadata: Metadata = pageSeo.home;

export default function HomePage() {
  const siteNumber = getSiteNumber();
  const products = selectProducts(siteNumber);

  return (
    <>
      <Home products={products} />
    </>
  );
}
