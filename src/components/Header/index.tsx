"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import CustomSelect from "./CustomSelect";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";
import Logo from "../Common/Logo";
import categoryData from "@/constants/categoryData";
import { selectProducts } from "@/lib/productSelector";

const isNavActive = (path: string, pathname: string) => {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

const WishlistIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
  </svg>
);

const CartIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M17 17h-11v-14h-2" />
    <path d="M6 5l14 1l-1 7h-13" />
  </svg>
);

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("0");
  const { openCartModal } = useCartModalContext();

  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const products = useMemo(() => {
    try {
      const siteNumberEnv = process.env.NEXT_PUBLIC_SITE_NUMBER;
      const siteNumber = siteNumberEnv ? parseInt(siteNumberEnv, 10) : 1;

      if (isNaN(siteNumber) || siteNumber < 1 || siteNumber > 40) {
        return selectProducts(1);
      }

      return selectProducts(siteNumber);
    } catch {
      return selectProducts(1);
    }
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    let filtered = [...products];

    if (selectedCategory !== "0") {
      const categoryId = parseInt(selectedCategory);
      filtered = filtered.filter((p) => p.categoryId === categoryId);
    }

    const query = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );

    return filtered.slice(0, 8);
  }, [searchQuery, selectedCategory, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest(".minimal-header__search-form")) return;
      setShowSearchResults(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleStickyMenu = () => setStickyMenu(window.scrollY >= 8);
    handleStickyMenu();
    window.addEventListener("scroll", handleStickyMenu, { passive: true });
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  useEffect(() => {
    setNavigationOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!navigationOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [navigationOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
      setSearchQuery("");
      setNavigationOpen(false);
    }
  };

  const handleProductClick = (productId: number) => {
    router.push(`/shop?productId=${productId}`);
    setShowSearchResults(false);
    setSearchQuery("");
    setNavigationOpen(false);
  };

  const options = [
    { label: "All", value: "0" },
    ...categoryData.map((category) => ({
      label: category.title,
      value: category.id.toString(),
    })),
  ];

  const renderSearchForm = () => (
    <form onSubmit={handleSearchSubmit}>
      <div className="minimal-header__search-form relative">
        <CustomSelect options={options} onSelectChange={setSelectedCategory} />
        <input
          onChange={handleSearchChange}
          onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
          value={searchQuery}
          type="search"
          name="search"
          placeholder="Search products..."
          autoComplete="off"
          className="minimal-header__search-input"
        />
        <button
          type="submit"
          aria-label="Search"
          className="minimal-header__search-submit"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <path
              d="M17.27 15.67L12.63 11.9C14.54 9.28 14.34 5.54 11.95 3.18C10.69 1.91 9 1.21 7.2 1.21C5.4 1.21 3.71 1.91 2.45 3.18C-0.17 5.79-0.17 10.07 2.45 12.68C3.71 13.95 5.4 14.65 7.2 14.65C8.92 14.65 10.52 14.01 11.78 12.85L16.48 16.65C16.71 16.83 17.07 16.79 17.35 16.57C17.58 16.28 17.55 15.89 17.27 15.67ZM7.2 13.39C5.74 13.39 4.39 12.83 3.35 11.78C1.21 9.65 1.21 6.19 3.35 4.08C4.39 3.04 5.74 2.47 7.2 2.47C8.66 2.47 10.01 3.04 11.05 4.08C13.19 6.22 13.19 9.67 11.05 11.78C10.04 12.83 8.66 13.39 7.2 13.39Z"
              fill="currentColor"
            />
          </svg>
        </button>

        {showSearchResults && searchResults.length > 0 && (
          <div className="minimal-header__search-results">
            {searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleProductClick(item.id)}
                className="minimal-header__search-result"
              >
                <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate">{item.title}</p>
                  <p>₹{item.discountedPrice.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );

  const navLinks = menuData.map((menuItem) => {
    if (menuItem.submenu) {
      return (
        <Dropdown
          key={menuItem.id}
          menuItem={menuItem}
          isActive={isNavActive(menuItem.path, pathname)}
        />
      );
    }

    return (
      <li key={menuItem.id} className="list-none">
        <Link
          href={menuItem.path}
          className={`minimal-header__link ${
            isNavActive(menuItem.path, pathname) ? "is-active" : ""
          }`}
        >
          {menuItem.title}
        </Link>
      </li>
    );
  });

  return (
    <>
      <header
        className={`minimal-header ${stickyMenu ? "is-sticky" : ""}`}
      >
        <div className="minimal-header__pattern" aria-hidden />
        <div className="minimal-header__inner">
        <div className="max-w-[1170px] mx-auto px-0 sm:px-6 xl:px-0">
          <div className="minimal-header__bar">
            <Link href="/" className="minimal-header__logo flex-shrink-0">
              <Logo iconClassName="size-6" textClassName="text-[1.0625rem]" />
            </Link>

            <nav className="minimal-header__nav" aria-label="Main">
              <ul className="flex items-center gap-8 list-none m-0 p-0">
                {navLinks}
              </ul>
            </nav>

            <div className="minimal-header__search-area minimal-header__search-area--desktop">
              {renderSearchForm()}
            </div>

            <div className="minimal-header__actions">
              <Link
                href="/wishlist"
                className="minimal-header__icon-btn hidden sm:inline-flex"
                aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
              >
                <WishlistIcon />
                {wishlistCount > 0 && (
                  <span className="minimal-header__badge">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openCartModal}
                className="minimal-header__cart-btn"
                aria-label={`Cart, ${cartCount} items, ₹${totalPrice.toLocaleString("en-IN")}`}
              >
                <span className="minimal-header__cart-icon-wrap">
                  <CartIcon size={18} />
                  {cartCount > 0 && (
                    <span className="minimal-header__badge minimal-header__badge--cart">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span className="minimal-header__cart-meta">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </button>

              <button
                type="button"
                className="minimal-header__menu-toggle"
                aria-label={navigationOpen ? "Close menu" : "Open menu"}
                aria-expanded={navigationOpen}
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                {navigationOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`minimal-header__overlay ${navigationOpen ? "is-open" : ""}`}
        onClick={() => setNavigationOpen(false)}
        aria-hidden={!navigationOpen}
      />
      <aside
        className={`minimal-header__drawer ${navigationOpen ? "is-open" : ""}`}
        aria-hidden={!navigationOpen}
        aria-label="Mobile navigation"
      >
        <div className="minimal-header__pattern" aria-hidden />
        <div className="minimal-header__drawer-body">
        <div className="minimal-header__drawer-head">
          <Link
            href="/"
            className="minimal-header__drawer-logo"
            onClick={() => setNavigationOpen(false)}
          >
            <Logo iconClassName="size-5" textClassName="text-base" />
          </Link>
          <button
            type="button"
            className="minimal-header__drawer-close"
            aria-label="Close menu"
            onClick={() => setNavigationOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="minimal-header__drawer-search">
          {renderSearchForm()}
        </div>

        <nav className="minimal-header__drawer-nav">
          {menuData.map((menuItem) => (
            <Link
              key={menuItem.id}
              href={menuItem.path}
              onClick={() => setNavigationOpen(false)}
              className={`minimal-header__drawer-link ${
                isNavActive(menuItem.path, pathname) ? "is-active" : ""
              }`}
            >
              {menuItem.title}
            </Link>
          ))}
          <Link
            href="/wishlist"
            onClick={() => setNavigationOpen(false)}
            className={`minimal-header__drawer-link ${
              pathname === "/wishlist" ? "is-active" : ""
            }`}
          >
            Wishlist
            {wishlistCount > 0 ? ` (${wishlistCount})` : ""}
          </Link>
        </nav>
        </div>
      </aside>
    </>
  );
};

export default Header;
