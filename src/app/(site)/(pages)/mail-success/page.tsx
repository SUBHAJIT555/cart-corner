import React from "react";
import MailSuccess from "@/components/MailSuccess";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.mailSuccess;

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess />
    </main>
  );
};

export default MailSuccessPage;
