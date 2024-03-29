"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarPlus, FolderKanban, ShieldAlert } from "lucide-react";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Create",
    icon: CalendarPlus,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Manage",
    icon: FolderKanban,
    href: "/",
    color: "text-violet-500",
  },
  {
    label: "Administration",
    icon: ShieldAlert,
    href: "/",
    color: "text-violet-500",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={"text-2xl font-bold"}>Codid</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
              className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition
                ${
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                }`}
            >
              <div className="flex items-center flex-1">
                <route.icon className={"h-5 w-5 mr-3"} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
