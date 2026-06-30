import RefundPolicy from "@/components/RefundPolicy";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.refundPolicy;

const RefundPolicyPage = () => {
  return (
    <main>
      <RefundPolicy />
    </main>
  );
};

export default RefundPolicyPage;
