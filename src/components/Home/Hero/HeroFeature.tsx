import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { candyIconClassName } from "@/components/ui/candy-button";

const featureData = [
  {
    img: "/images/icons/icon-01.svg",
    title: "Free Shipping",
    description: "On orders above ₹499",
  },
  {
    img: "/images/icons/icon-02.svg",
    title: "Easy Returns",
    description: "7-day return policy",
  },
  {
    img: "/images/icons/icon-03.svg",
    title: "Secure Payments",
    description: "UPI, cards & more",
  },
  {
    img: "/images/icons/icon-04.svg",
    title: "All-India Support",
    description: "We're here to help",
  },
];

interface CandyFeatureIconProps {
  src: string;
  alt: string;
}

const CandyFeatureIcon = ({ src, alt }: CandyFeatureIconProps) => (
  <span className={cn(candyIconClassName)}>
    <Image
      src={src}
      alt={alt}
      width={22}
      height={22}
      className="relative z-[1] w-[22px] h-[22px] brightness-0 invert"
    />
  </span>
);

const HeroFeature = () => {
  return (
    <div className="mt-10 pt-8 border-t border-gray-200/80">
      <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {featureData.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <CandyFeatureIcon src={item.img} alt={item.title} />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold tracking-tight text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
