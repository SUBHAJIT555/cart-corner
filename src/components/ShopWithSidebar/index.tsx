"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "./CustomSelect";
import CategoryDropdown from "./CategoryDropdown";
import PriceDropdown from "./PriceDropdown";
import categoryData from "@/constants/categoryData";
import ShopProductCard from "../Shop/ShopProductCard";
import ShopListCard from "../Shop/ShopListCard";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { AppDispatch } from "@/redux/store";
import { cn } from "@/lib/utils";

interface ShopWithSidebarProps {
  products: Product[];
}

const ShopWithSidebar = ({ products }: ShopWithSidebarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { openModal, isModalOpen, closeModal } = useModalContext();
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [showFilterFab, setShowFilterFab] = useState(true);
  const productsPerPage = 12;

  // Helper function to convert slug to ID
  const slugToId = useCallback((slug: string): number | null => {
    const category = categoryData.find((cat) => cat.slug === slug);
    return category ? category.id : null;
  }, []);

  // Helper function to convert ID to slug
  const idToSlug = useCallback((id: number): string | null => {
    const category = categoryData.find((cat) => cat.id === id);
    return category ? category.slug : null;
  }, []);

  // Get URL params - support both single category (from link) and multiple categories (from filter)
  const selectedCategories = useMemo(() => {
    // Check for single category parameter (from category link)
    const singleCategory = searchParams.get("category");
    if (singleCategory) {
      const categoryId = slugToId(singleCategory);
      return categoryId ? [categoryId] : [];
    }

    // Check for multiple categories parameter (from filter)
    const categoriesParam = searchParams.get("categories");
    if (categoriesParam) {
      // If it's comma-separated slugs, convert them to IDs
      const slugs = categoriesParam.split(",");
      const ids = slugs
        .map((slug) => slugToId(slug.trim()))
        .filter((id): id is number => id !== null);
      return ids;
    }
    return [];
  }, [searchParams, slugToId]);

  const priceRange = useMemo(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    return {
      min: minPrice ? Number(minPrice) : 0,
      max: maxPrice ? Number(maxPrice) : 10000,
    };
  }, [searchParams]);

  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? Number(page) : 1;
  }, [searchParams]);

  // Get filter from URL
  const selectedFilter = useMemo(() => {
    const filter = searchParams.get("filter");
    return filter || "latest";
  }, [searchParams]);

  // Get productId from URL and open modal if present
  const productIdFromURL = useMemo(() => {
    const productId = searchParams.get("productId");
    return productId ? Number(productId) : null;
  }, [searchParams]);

  // Close modal when productId is removed from URL
  useEffect(() => {
    if (!productIdFromURL && isModalOpen) {
      closeModal();
    }
  }, [productIdFromURL, isModalOpen, closeModal]);

  // Open modal when productId is in URL (but only if modal is not already open)
  useEffect(() => {
    if (productIdFromURL && !isModalOpen) {
      const product = products.find((p) => p.id === productIdFromURL);
      if (product) {
        dispatch(updateQuickView({ ...product }));
        openModal();
      }
    }
  }, [productIdFromURL, products, dispatch, openModal, isModalOpen]);

  const options = [
    { label: "Latest Products", value: "latest" },
    { label: "New Arrival", value: "new-arrival" },
    { label: "Best Selling", value: "best-selling" },
    { label: "Trending", value: "trending" },
    { label: "Old Products", value: "old" },
  ];

  // Same categories as home page "Browse by Category"
  const categories = useMemo(() => {
    return categoryData.map((cat) => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.title,
      products: products.filter((p) => p.categoryId === cat.id).length,
      isRefined: selectedCategories.includes(cat.id),
    }));
  }, [products, selectedCategories]);

  // Filter products based on URL params
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by product type (new arrival, best selling, trending, old)
    if (selectedFilter === "new-arrival") {
      filtered = filtered.filter((product) => product.isNewArrival);
    } else if (selectedFilter === "best-selling") {
      filtered = filtered.filter((product) => product.isBestSelling);
    } else if (selectedFilter === "trending") {
      filtered = filtered.filter((product) => product.isTrending);
    } else if (selectedFilter === "old") {
      // Old products are those without any special flags
      filtered = filtered.filter(
        (product) =>
          !product.isNewArrival &&
          !product.isBestSelling &&
          !product.isTrending
      );
    }
    // "latest" shows all products (no filter)

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.categoryId)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.discountedPrice >= priceRange.min &&
        product.discountedPrice <= priceRange.max
    );

    return filtered;
  }, [products, selectedCategories, priceRange, selectedFilter]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Update URL params
  const updateURL = useCallback((updates: {
    categories?: number[];
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    filter?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.categories !== undefined) {
      // Remove single category param if it exists (when switching from link to filter)
      params.delete("category");

      if (updates.categories.length > 0) {
        // Convert IDs to slugs for SEO-friendly URLs
        const slugs = updates.categories
          .map((id) => idToSlug(id))
          .filter((slug): slug is string => slug !== null);
        if (slugs.length > 0) {
          params.set("categories", slugs.join(","));
        }
      } else {
        params.delete("categories");
      }
    }

    if (updates.minPrice !== undefined) {
      if (updates.minPrice > 0) {
        params.set("minPrice", updates.minPrice.toString());
      } else {
        params.delete("minPrice");
      }
    }

    if (updates.maxPrice !== undefined) {
      if (updates.maxPrice < 10000) {
        params.set("maxPrice", updates.maxPrice.toString());
      } else {
        params.delete("maxPrice");
      }
    }

    if (updates.page !== undefined) {
      if (updates.page > 1) {
        params.set("page", updates.page.toString());
      } else {
        params.delete("page");
      }
    }

    if (updates.filter !== undefined) {
      if (updates.filter && updates.filter !== "latest") {
        params.set("filter", updates.filter);
      } else {
        params.delete("filter");
      }
    }

    router.push(`?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, router, idToSlug]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateURL({ page });
    }
  };

  const handleCategoryChange = (categoryIds: number[]) => {
    updateURL({ categories: categoryIds, page: 1 });
  };

  const handlePriceChange = (min: number, max: number) => {
    updateURL({ minPrice: min, maxPrice: max, page: 1 });
  };

  const handleFilterChange = (filterValue: string) => {
    updateURL({ filter: filterValue, page: 1 });
  };

  const handleClearFilters = () => {
    router.push("?", { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Reset page if current page exceeds total pages after filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      updateURL({ page: 1 });
    }
  }, [totalPages, currentPage, updateURL]);

  useEffect(() => {
    const footer = document.querySelector(".minimal-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFilterFab(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productSidebar]);

  return (
    <>
      <Breadcrumb
        title="Shop"
        pages={["Shop"]}
        description="Browse electronics, books, stationery, and fashion at honest prices."
      />

      <section className="minimal-shop-page">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0 pt-6">
          <button
            type="button"
            onClick={() => setProductSidebar(true)}
            aria-label="Open filters"
            className={cn(
              "minimal-shop-page__filter-fab",
              (!showFilterFab || productSidebar) &&
                "minimal-shop-page__filter-fab--hidden"
            )}
          >
            <SlidersHorizontal className="size-4 shrink-0" strokeWidth={1.75} />
            <span>Filters</span>
          </button>

          {productSidebar && (
            <button
              type="button"
              className="minimal-shop-page__overlay"
              aria-label="Close filters"
              onClick={() => setProductSidebar(false)}
            />
          )}

          <div className="minimal-shop-page__layout">
            <aside
              className={cn(
                "minimal-shop-page__sidebar sidebar-content",
                productSidebar && "is-open"
              )}
            >
              <div className="minimal-shop-page__filter-bar">
                <span>Filters</span>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="minimal-shop-page__clear"
                >
                  Clear all
                </button>
              </div>

              <CategoryDropdown
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />

              <PriceDropdown
                minPrice={priceRange.min}
                maxPrice={priceRange.max}
                onPriceChange={handlePriceChange}
              />
            </aside>

            <div className="minimal-shop-page__main">
              <div className="minimal-shop-page__toolbar">
                <div className="minimal-shop-page__toolbar-left">
                  <CustomSelect
                    options={options}
                    selectedValue={selectedFilter}
                    onChange={handleFilterChange}
                    className="minimal-shop-page__select"
                  />

                  <p className="minimal-shop-page__count">
                    Showing{" "}
                    <strong>
                      {filteredProducts.length === 0
                        ? 0
                        : startIndex + 1}
                      -
                      {Math.min(endIndex, filteredProducts.length)}
                    </strong>{" "}
                    of <strong>{filteredProducts.length}</strong> products
                  </p>
                </div>

                <div className="minimal-shop-page__view-toggle">
                  <button
                    type="button"
                    onClick={() => setProductStyle("grid")}
                    aria-label="Grid view"
                    className={cn(
                      "minimal-shop-page__view-btn",
                      productStyle === "grid" &&
                        "minimal-shop-page__view-btn--active"
                    )}
                  >
                    <LayoutGrid className="size-4" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductStyle("list")}
                    aria-label="List view"
                    className={cn(
                      "minimal-shop-page__view-btn",
                      productStyle === "list" &&
                        "minimal-shop-page__view-btn--active"
                    )}
                  >
                    <List className="size-4" strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              {currentProducts.length > 0 ? (
                <div
                  className={
                    productStyle === "grid"
                      ? "minimal-shop-page__grid"
                      : "minimal-shop-page__list"
                  }
                >
                  {currentProducts.map((item, index) =>
                    productStyle === "grid" ? (
                      <ShopProductCard item={item} key={item.id} />
                    ) : (
                      <ShopListCard
                        item={item}
                        key={item.id}
                        isLast={index === currentProducts.length - 1}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="minimal-shop-page__empty">
                  <h3 className="minimal-shop-page__empty-title">
                    No products found
                  </h3>
                  <p className="minimal-shop-page__empty-text">
                    Try adjusting your filters or clearing them to see more
                    items.
                  </p>
                </div>
              )}

              {totalPages > 1 && (
                <nav
                  className="minimal-shop-page__pagination"
                  aria-label="Pagination"
                >
                  <div className="minimal-shop-page__pagination-inner">
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                      className="minimal-shop-page__page-btn"
                    >
                      <ChevronLeft className="size-4" strokeWidth={2} />
                    </button>

                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="minimal-shop-page__page-ellipsis"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page as number)}
                          className={cn(
                            "minimal-shop-page__page-btn",
                            currentPage === page &&
                              "minimal-shop-page__page-btn--active"
                          )}
                        >
                          {page}
                        </button>
                      )
                    )}

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className="minimal-shop-page__page-btn"
                    >
                      <ChevronRight className="size-4" strokeWidth={2} />
                    </button>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
