"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";

const Navbar = () => {
  const [isOpenMobNav, setIsOpenMobNav] = useState(false);

  return (
    <>
      <header className="bg-light-500 p-4 text-dark shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Menu
              className="md:hidden"
              onClick={() => setIsOpenMobNav(!isOpenMobNav)}
            />
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>

          <div className="flex items-center">
            <span className="text-sm">John Doe</span>
          </div>
        </div>
      </header>
      {isOpenMobNav && <MobileSidebar />}
    </>
  );
};

export default Navbar;
