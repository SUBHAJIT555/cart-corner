"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryItemProps {
  category: {
    id: number;
    name: string;
    products: number;
    isRefined: boolean;
  };
  isSelected: boolean;
  onToggle: () => void;
}

const CategoryItem = ({ category, isSelected, onToggle }: CategoryItemProps) => {
  return (
    <button
      type="button"
      className={cn(
        "shop-filter__category",
        isSelected && "shop-filter__category--active"
      )}
      onClick={onToggle}
    >
      <span className="shop-filter__category-left">
        <span
          className={cn(
            "shop-filter__checkbox",
            isSelected && "shop-filter__checkbox--checked"
          )}
        >
          {isSelected && <Check className="size-2.5" strokeWidth={3} />}
        </span>
        <span>{category.name}</span>
      </span>
      <span className="shop-filter__count">{category.products}</span>
    </button>
  );
};

interface CategoryDropdownProps {
  categories: Array<{
    id: number;
    slug: string;
    name: string;
    products: number;
    isRefined: boolean;
  }>;
  selectedCategories: number[];
  onCategoryChange: (categoryIds: number[]) => void;
}

const CategoryDropdown = ({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryDropdownProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);

  const handleCategoryToggle = (categoryId: number) => {
    const isSelected = selectedCategories.includes(categoryId);

    if (isSelected) {
      onCategoryChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="shop-filter">
      <button
        type="button"
        className={cn(
          "shop-filter__head w-full",
          toggleDropdown && "shop-filter__head--open"
        )}
        onClick={() => setToggleDropdown(!toggleDropdown)}
        aria-expanded={toggleDropdown}
      >
        <span>Category</span>
        <ChevronDown
          className={cn(
            "shop-filter__chevron size-4",
            toggleDropdown && "shop-filter__chevron--open"
          )}
          strokeWidth={2}
        />
      </button>

      <div
        className={cn(
          "shop-filter__body",
          !toggleDropdown && "shop-filter__body--hidden"
        )}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isSelected={selectedCategories.includes(category.id)}
            onToggle={() => handleCategoryToggle(category.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown;
