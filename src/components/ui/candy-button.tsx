import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const brutalBase = cn(
  "relative inline-flex items-center justify-center font-heading font-bold text-base leading-tight tracking-tight",
  "px-8 py-3.5 rounded-cc-btn cursor-pointer",
  "border-2 transition-all duration-200 ease-out",
  "hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]",
  "disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100"
);

export const candyButtonClassName = cn(
  brutalBase,
  "bg-cc-accent text-cc-bg border-cc-bg",
  "shadow-brutal hover:shadow-brutal-hover hover:bg-cc-accent-hover hover:border-cc-bg",
  "hover:rotate-[0.5deg]"
);

export const candyButtonSuccessClassName = cn(
  brutalBase,
  "bg-cc-success text-white border-[#1B5E20]",
  "shadow-[4px_4px_0_#1B5E20] hover:shadow-[6px_6px_0_#1B5E20]"
);

export const candyButtonDangerClassName = cn(
  brutalBase,
  "bg-cc-danger text-white border-[#B71C1C]",
  "shadow-[4px_4px_0_#B71C1C] hover:shadow-[6px_6px_0_#B71C1C]"
);

export const candyButtonOutlineClassName = cn(
  brutalBase,
  "bg-cc-card text-cc-text border-cc-border",
  "shadow-brutal hover:border-cc-accent hover:shadow-brutal-accent hover:text-cc-accent"
);

const candyVariantClassName = (
  variant: "default" | "success" | "danger" | "outline" = "default"
) => {
  if (variant === "success") return candyButtonSuccessClassName;
  if (variant === "danger") return candyButtonDangerClassName;
  if (variant === "outline") return candyButtonOutlineClassName;
  return candyButtonClassName;
};

export const candyIconClassName = cn(
  "relative inline-flex items-center justify-center shrink-0",
  "w-12 h-12 rounded-cc-btn border-2 border-cc-accent bg-cc-surface text-cc-accent",
  "shadow-brutal-accent"
);

export const candyIconSuccessClassName = cn(
  "relative inline-flex items-center justify-center shrink-0",
  "w-12 h-12 rounded-cc-btn border-2 border-cc-success bg-cc-surface text-cc-success",
  "shadow-[3px_3px_0_#2E7D32]"
);

export interface CandyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "default" | "success" | "danger" | "outline";
}

export function CandyButton({
  className,
  children = "Button",
  variant = "default",
  ...props
}: CandyButtonProps) {
  return (
    <button
      className={cn(candyVariantClassName(variant), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface CandyButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
  variant?: "default" | "success" | "danger" | "outline";
}

export function CandyButtonLink({
  className,
  href,
  children = "Button",
  variant = "default",
  ...props
}: CandyButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(candyVariantClassName(variant), className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default CandyButton;
