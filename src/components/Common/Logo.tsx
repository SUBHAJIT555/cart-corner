import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const Logo = ({ className, iconClassName, textClassName }: LogoProps) => {
  return (
    <span
      className={cn("brand-logo inline-flex items-center gap-2.5", className)}
      aria-label={siteConfig.brand.name}
    >
      <Image
        src="/images/logo/logo.png"
        alt={siteConfig.brand.name}
        width={190}
        height={56}
        priority
        className={cn("h-auto w-[64px] sm:w-[132px]", iconClassName, textClassName)}
      />
    </span>
  );
};

export default Logo;
