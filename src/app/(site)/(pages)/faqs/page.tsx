import FAQs from "@/components/FAQs";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.faqs;

const FAQsPage = () => {
  return (
    <main>
      <FAQs />
    </main>
  );
};

export default FAQsPage;
