"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav>
      {/* <SheetTrigger> */}
      <button className="md:hidden">testssss </button>
      {/*  </SheetTrigger>
      <SheetContent side="left" className="p-0"> */}
      <Sidebar apiLimitCount={0} isPro={true} />
      {/* </SheetContent> */}
    </nav>
  );
};
