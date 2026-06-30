import React from "react";
import { Product } from "@/types/product";
import { CandyButtonLink } from "@/components/ui/candy-button";
import NewArrivalCard from "./NewArrivalCard";

interface NewArrivalProps {
  products: Product[];
}

const NewArrival = ({ products }: NewArrivalProps) => {
  return (
    <section className="minimal-new-arrivals overflow-hidden pt-12 lg:pt-16">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0 pb-14 border-b border-gray-200/80">
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 mb-2">
              This Week&apos;s
            </p>
            <h2 className="cc-section-title font-heading">
              New Arrivals
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
              Fresh picks just landed — add to cart, save to wishlist, or
              preview without leaving the grid.
            </p>
          </div>

          <CandyButtonLink href="/shop" className="text-sm px-7 py-2.5 shrink-0">
            View All
          </CandyButtonLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {products.map((item) => (
            <NewArrivalCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
