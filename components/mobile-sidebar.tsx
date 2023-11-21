"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";

export const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="md:hidden">
      <Sidebar />
    </nav>
  );
};
