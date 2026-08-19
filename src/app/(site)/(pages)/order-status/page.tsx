import { Suspense } from "react";
import OrderStatus from "@/components/OrderStatus";
import { pageMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";

export const metadata = {
  ...pageMetadata(
    "Payment Status",
    `Payment confirmation for your order at ${siteConfig.brand.name}.`
  ),
  robots: {
    index: false,
    follow: false,
  },
};

const OrderStatusPage = () => {
  return (
    <main>
      <Suspense
        fallback={
          <section className="minimal-checkout-page">
            <div className="max-w-[560px] w-full mx-auto px-4 sm:px-6 xl:px-0">
              <div className="pay-status">
                <p className="pay-status__text">Checking payment…</p>
              </div>
            </div>
          </section>
        }
      >
        <OrderStatus />
      </Suspense>
    </main>
  );
};

export default OrderStatusPage;
