"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavItem({
  path,
  isMini,
}: {
  path: any;
  isMini: boolean;
}) {
  //   State Management ////////////////////////////////////////////
  const [collapsed] = useState<boolean>(true);
  //   Custom Hooks ////////////////////////////////////////////////
  const pathname = usePathname();
  //   Helper Constants ////////////////////////////////////////////
  const isActive = pathname?.endsWith(path?.path);
  const hasChildren = !!path.children;
  //   Callback Function ///////////////////////////////////////////
  // const handleNavItemClick = useCallback(() => {
  //   setCollapsed((prev) => !prev);
  // }, []);
  return (
    <Link href={path?.path}>
      <li className="flex flex-col gap-2 items-start cursor-pointer transition-all select-none">
        {/* Main Item */}
        <div
          className={cn(
            "flex flex-row gap-2 items-center h-10 w-full",
            isMini ? "h-fit w-fit" : ""
          )}
          // onClick={handleNavItemClick}
        >
          {!isMini && (
            <div
              className={cn(
                " h-full w-1 block  ltr:rounded-r-full rtl:rounded-l-full ",
                isActive
                  ? "bg-blue-800 dark:bg-active-nav-item-bg"
                  : "bg-violet-300 dark:bg-nav-item"
              )}
            >
              &nbsp;
            </div>
          )}
          <div
            className={cn(
              "hover:bg-blue-800 hover:text-violet-50 transition-all flex flex-row gap-2 w-[90%] h-full items-center px-2 rounded-sm",
              isActive
                ? "bg-blue-800 text-violet-50 dark:bg-active-nav-item-bg dark:text-active-nav-item-color"
                : "bg-violet-200 dark:bg-nav-item dark:hover:bg-nav-item-hover",
              isMini ? "flex-col w-fit gap-0.5 p-2 min-w-20" : ""
            )}
          >
            <Icon
              icon={path?.icon}
              style={{ fontSize: isMini ? "20px" : "30px" }}
            />
            <p
              className={cn("font-semibold", isMini ? "text-sm font-bold" : "")}
            >
              {path?.name}
            </p>
            {/* {hasChildren && (
            <Icon
              icon="akar-icons:chevron-up"
              className={cn(
                "transition-[rotate] justify-self-end",
                collapsed ? "rotate-90" : "rotate-180"
              )}
            />
          )} */}
          </div>
        </div>

        {hasChildren && !collapsed && (
          <ul className="ml-6 pl-6 flex flex-col gap-3  w-[90%] border-l-[1px] border-gray-400">
            {path.children.map((childItem: any) => (
              <ChildNavItem key={childItem?.path} navElement={childItem} />
            ))}
          </ul>
        )}
      </li>
    </Link>
  );
}

function ChildNavItem({ navElement }: { navElement: any }) {
  return (
    <li
      key={navElement?.path}
      className="text-sm font-semibold border-[1px] border-transparent  rounded-sm w-fit hover:translate-x-1.5 transition-transform p-1 text-gray-700 flex flex-row items-center gap-2 hover:text-blue-800"
    >
      <Icon icon={navElement?.icon} />
      {navElement?.name}
    </li>
  );
}
