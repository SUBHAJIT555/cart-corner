"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { candyIconClassName } from "@/components/ui/candy-button";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        candyIconClassName,
        "fixed bottom-8 right-6 sm:right-8 z-[999] text-white hover:brightness-110 active:scale-95"
      )}
    >
      <ChevronUp className="size-5" strokeWidth={2.25} />
    </button>
  );
}
