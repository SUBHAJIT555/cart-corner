import { Suspense } from "react";
import Pay from "@/components/Pay";
import { pageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata = {
  ...pageMetadata(
    "Pay with UPI",
    `Complete your UPI payment at ${siteConfig.brand.name}.`
  ),
  robots: {
    index: false,
    follow: false,
  },
};

const PayPage = () => {
  return (
    <main>
      <Suspense
        fallback={
          <section className="minimal-checkout-page">
            <div className="max-w-[560px] w-full mx-auto px-4 sm:px-6 xl:px-0">
              <div className="pay-status">
                <p className="pay-status__text">Preparing payment…</p>
              </div>
            </div>
          </section>
        }
      >
        <Pay />
      </Suspense>
    </main>
  );
};

export default PayPage;
