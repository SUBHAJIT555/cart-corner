import React from "react";
import { Product } from "@/types/product";
import { CandyButtonLink } from "@/components/ui/candy-button";
import BestSellerCard from "./BestSellerCard";

interface BestSellerProps {
  products: Product[];
}

const BestSeller = ({ products }: BestSellerProps) => {
  return (
    <section className="minimal-best-seller minimal-new-arrivals overflow-hidden pt-12 lg:pt-16">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0 pb-14 border-b border-gray-200/80">
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-2">
              This Month
            </p>
            <h2 className="cc-section-title font-heading">
              Best Sellers
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              Customer favorites across electronics, books, stationery, and
              fashion — tried, trusted, and top-rated.
            </p>
          </div>

          <CandyButtonLink href="/shop" className="text-sm px-7 py-2.5 shrink-0">
            View All
          </CandyButtonLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {products.map((item) => (
            <BestSellerCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
