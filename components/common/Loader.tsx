"use client";

import React from "react";
import { ShoppingBasket } from "lucide-react";

const Loader = ({ title, subtitle }: { title?: string; subtitle?: string }) => {
  return (
    <div className="flex flex-col z-50 items-center justify-center w-full min-h-screen">
      <div className="relative w-12 h-12">
        <ShoppingBasket className="w-10 h-10 text-green-600 animate-ping opacity-75" />
      </div>
      {title && (
        <h3 className="text-green-600 font-semibold text-xl uppercase tracking-wide mt-4 text-center">
          {title}
        </h3>
      )}
      {subtitle && (
        <h3 className="text-green-600 font-semibold text-xs tracking-wide mt-2 text-center">
          {subtitle}
        </h3>
      )}
    </div>
  );
};

export default Loader;
