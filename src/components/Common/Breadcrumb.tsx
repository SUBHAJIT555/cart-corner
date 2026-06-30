import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  title: string;
  pages: string[];
  description?: string;
}

const Breadcrumb = ({ title, pages, description }: BreadcrumbProps) => {
  return (
    <section className="minimal-breadcrumb" aria-label="Page header">
      <div className="minimal-breadcrumb__pattern" aria-hidden />

      <div className="minimal-breadcrumb__inner">
        <nav className="minimal-breadcrumb__trail" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {pages.map((page, key) => (
            <React.Fragment key={key}>
              <ChevronRight
                className="minimal-breadcrumb__sep size-3.5"
                strokeWidth={2}
                aria-hidden
              />
              <span
                className={
                  key === pages.length - 1 ? "minimal-breadcrumb__current" : ""
                }
              >
                {page}
              </span>
            </React.Fragment>
          ))}
        </nav>

        <h1 className="minimal-breadcrumb__title">{title}</h1>
        {description && (
          <p className="minimal-breadcrumb__desc">{description}</p>
        )}
      </div>
    </section>
  );
};

export default Breadcrumb;
