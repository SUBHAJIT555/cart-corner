import Contact from "@/components/Contact";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.contact;

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
