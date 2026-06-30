import PrivacyPolicy from "@/components/PrivacyPolicy";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.privacyPolicy;

const PrivacyPolicyPage = () => {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
};

export default PrivacyPolicyPage;
