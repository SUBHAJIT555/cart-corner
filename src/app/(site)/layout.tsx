"use client";
import { useState, useEffect } from "react";
import "../css/cart-corner-tokens.css";
import "../css/style.css";
import "../css/minimal-header.css";
import "../css/minimal-hero.css";
import "../css/minimal-new-arrivals.css";
import "../css/minimal-categories.css";
import "../css/minimal-quick-view.css";
import "../css/minimal-promo-banner.css";
import "../css/minimal-best-seller.css";
import "../css/minimal-testimonials.css";
import "../css/minimal-newsletter.css";
import "../css/minimal-footer.css";
import "../css/minimal-cart-drawer.css";
import "../css/minimal-breadcrumb.css";
import "../css/minimal-cart-page.css";
import "../css/minimal-wishlist-page.css";
import "../css/minimal-contact.css";
import "../css/minimal-about.css";
import "../css/minimal-faq.css";
import "../css/minimal-shop.css";
import "../css/minimal-checkout.css";
import "../css/minimal-legal.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "@/context/ThemeContext";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <>
          <ThemeProvider>
            <ReduxProvider>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    <Header />
                    {children}

                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </ReduxProvider>
            <ScrollToTop />
            <Footer />
          </ThemeProvider>
        </>
      )}
    </>
  );
}
