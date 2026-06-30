import React from "react";
import Error from "@/components/Error";
import { pageSeo } from "@/config/seo";

export const metadata = pageSeo.error;

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  );
};

export default ErrorPage;
