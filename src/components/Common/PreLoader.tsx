import React from "react";
import { KineticTextLoader } from "@/components/ui/kinetic-text-loader";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 z-[999999] flex h-screen w-screen items-center justify-center bg-cc-bg">
      <KineticTextLoader text="Cart Corner" className="text-cc-accent font-heading font-bold" />
    </div>
  );
};

export default PreLoader;
