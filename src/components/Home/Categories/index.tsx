"use client";

import categoriesData from "@/constants/categoryData";
import { CandyButtonLink } from "@/components/ui/candy-button";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <section className="minimal-categories overflow-hidden pt-12 lg:pt-16">
      <div className="minimal-categories__inner max-w-[1280px] w-full mx-auto px-4 sm:px-6 xl:px-0 pb-14">
        <div className="minimal-categories__header">
          <div>
            <p className="minimal-categories__eyebrow">Categories</p>
            <h2 className="minimal-categories__title font-heading">
              Shop by Category
            </h2>
            <p className="minimal-categories__subtitle">
              Pick a department and jump straight into what you need — electronics,
              fashion, books, and more.
            </p>
          </div>

          <CandyButtonLink
            href="/shop"
            variant="outline"
            className="minimal-categories__cta text-sm px-7 py-2.5 shrink-0"
          >
            View All
          </CandyButtonLink>
        </div>

        <div className="minimal-categories__grid">
          {categoriesData.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
