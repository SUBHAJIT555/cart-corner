import CookiePolicy from "@/components/CookiePolicy";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.cookiePolicy;

const CookiePolicyPage = () => {
  return (
    <main>
      <CookiePolicy />
    </main>
  );
};

export default CookiePolicyPage;
