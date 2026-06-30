import React from "react";
import Link from "next/link";
import Breadcrumb from "./Breadcrumb";
import { cn } from "@/lib/utils";

export const LEGAL_PAGES = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms and Conditions", href: "/terms-of-use" },
  { label: "Refund Policy", href: "/refund-policy" },
] as const;

interface LegalPageProps {
  title: string;
  description: string;
  currentPath: string;
  introTitle?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}

const LegalPage = ({
  title,
  description,
  currentPath,
  introTitle,
  intro,
  children,
}: LegalPageProps) => {
  return (
    <>
      <Breadcrumb title={title} pages={[title]} description={description} />

      <section className="minimal-legal-page">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-6 xl:px-0">
          <div className="minimal-legal-page__layout">
            <nav className="minimal-legal-page__nav" aria-label="Legal pages">
              <p className="minimal-legal-page__nav-title">Legal</p>
              <ul className="minimal-legal-page__nav-list">
                {LEGAL_PAGES.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className={cn(
                        "minimal-legal-page__nav-link",
                        currentPath === page.href &&
                          "minimal-legal-page__nav-link--active"
                      )}
                      aria-current={
                        currentPath === page.href ? "page" : undefined
                      }
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="minimal-legal-page__content">
              {(introTitle || intro) && (
                <header className="minimal-legal-page__intro">
                  {introTitle && (
                    <h2 className="minimal-legal-page__intro-title">
                      {introTitle}
                    </h2>
                  )}
                  {intro}
                </header>
              )}

              {children}

              <p className="minimal-legal-page__updated">
                <strong>Last updated:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default LegalPage;
