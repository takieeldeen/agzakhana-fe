"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import AccountPopover from "../account-popover/account-popover";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import useGetConfigNavigation from "./config-navigation";
import NavItem from "./nav-item";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const { configNavigation } = useGetConfigNavigation();
  return (
    <aside
      className={cn(
        "bg-violet-50 dark:bg-navbar-bg w-64 h-full shadow-2xl flex flex-col gap-4 sticky top-0 left-0 transition-all z-10 ",
        isMinimized ? "w-fit items-center px-2 py-3" : ""
      )}
    >
      <div
        className={cn(
          "p-6 flex items-center justify-center",
          isMinimized ? "p-0 px-0 py-6 w-16 h-16" : ""
        )}
      >
        <Logo mini={isMinimized} />
      </div>
      <nav className="h-full">
        <ul
          className={cn(
            "flex flex-col gap-2 mb-auto relative",
            isMinimized ? "items-center" : ""
          )}
        >
          <Button
            className={cn(
              "absolute -top-10 rtl:left-0 ltr:right-0 translate-x-[50%] rtl:-translate-x-[50%] -translate-y-[50%] rounded-[50%] w-7 h-7 p-0 m-0 dark:bg-navbar-bg text-xl text-white rotate-z-90 cursor-pointer dark:hover:bg-nav-item transition-all",
              isMinimized ? "-rotate-z-90 -top-4  ltr:right-0" : ""
            )}
            onClick={() => setIsMinimized((prev) => !prev)}
          >
            <Icon icon="akar-icons:chevron-up" />
          </Button>
          {configNavigation.map((path) => (
            <NavItem path={path} key={path?.path} isMini={isMinimized} />
          ))}
        </ul>
      </nav>
      <AccountPopover />
    </aside>
  );
}
