import About from "@/components/About";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.about;

const AboutPage = () => {
  return (
    <main>
      <About />
    </main>
  );
};

export default AboutPage;
