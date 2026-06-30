"use client";

import { useState, useEffect, useRef } from "react";
import RangeSlider from "react-range-slider-input";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import "react-range-slider-input/dist/style.css";

interface PriceDropdownProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceDropdown = ({
  minPrice,
  maxPrice,
  onPriceChange,
}: PriceDropdownProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState({
    from: minPrice,
    to: maxPrice,
  });
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSelectedPrice({
      from: minPrice,
      to: maxPrice,
    });
  }, [minPrice, maxPrice]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
        <span>Price</span>
        <ChevronDown
          className={cn(
            "shop-filter__chevron size-4",
            toggleDropdown && "shop-filter__chevron--open"
          )}
          strokeWidth={2}
        />
      </button>

      <div className={cn(!toggleDropdown && "shop-filter__body--hidden")}>
        <div className="shop-filter__body">
          <div className="price-range">
            <RangeSlider
              id="range-slider-gradient"
              className="margin-lg"
              min={0}
              max={10000}
              step={100}
              value={[selectedPrice.from, selectedPrice.to]}
              onInput={(e) => {
                const newPrice = {
                  from: Math.floor(e[0]),
                  to: Math.ceil(e[1]),
                };
                setSelectedPrice(newPrice);

                if (debounceTimerRef.current) {
                  clearTimeout(debounceTimerRef.current);
                }

                debounceTimerRef.current = setTimeout(() => {
                  onPriceChange(newPrice.from, newPrice.to);
                }, 500);
              }}
            />

            <div className="shop-filter__price-inputs">
              <div className="shop-filter__price-box">
                <span>₹</span>
                <span>{selectedPrice.from.toLocaleString("en-IN")}</span>
              </div>
              <div className="shop-filter__price-box">
                <span>₹</span>
                <span>{selectedPrice.to.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceDropdown;
