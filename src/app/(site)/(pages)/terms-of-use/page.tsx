import TermsOfUse from "@/components/TermsOfUse";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.terms;

const TermsOfUsePage = () => {
  return (
    <main>
      <TermsOfUse />
    </main>
  );
};

export default TermsOfUsePage;
