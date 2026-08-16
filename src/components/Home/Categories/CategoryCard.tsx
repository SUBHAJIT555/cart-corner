"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/shop?category=${category.slug}`}
        className="category-card group block h-full"
        aria-label={`Shop ${category.title}`}
      >
        <div className="category-card__media">
          <Image
            src={category.img}
            alt={category.title}
            width={280}
            height={200}
            unoptimized
            className="category-card__image"
          />
          <span className="category-card__arrow" aria-hidden>
            <ArrowUpRight className="size-5" strokeWidth={2.5} />
          </span>
        </div>
        <div className="category-card__footer">
          <h3 className="category-card__title">{category.title}</h3>
          <span className="category-card__cta">Shop now</span>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
