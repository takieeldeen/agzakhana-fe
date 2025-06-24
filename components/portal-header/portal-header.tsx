"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import { useAppSelector } from "../store/store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import SettingsMenu from "./settings-menu";

export default function PortalHeader() {
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);
  const user = useAppSelector((state) => state?.auth?.user);
  const t = useTranslations();
  const HAS_IMAGE = !!user?.imageUrl && user?.imageUrl !== "";
  const USER_EXISTS = !!user;
  return (
    <header className="w-full bg-navbar-bg py-3 px-4 drop-shadow-lg">
      {/* Account Info */}
      <div className="flex justify-end items-center gap-4">
        <div className="bg-nav-item rounded-full p-2 relative w-12 h-12">
          {/* <Image /> */}
          {!HAS_IMAGE && (
            <Icon icon="mdi:user" className="text-3xl text-gray-500" />
          )}
          {HAS_IMAGE && (
            <Image
              src={user?.imageUrl as string}
              alt={user?.name}
              className="h-12 w-auto rounded-full"
              // height="128"
              // width="128"
              fill
              priority
            />
          )}
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-base font-semibold dark:text-gray-300">
            {user?.name ?? "--"}
          </p>
          <p className="text-sm font-semibold dark:text-gray-400">
            {USER_EXISTS ? t(`USER_MANAGEMENT_PAGE.${user?.jobTitle}`) : "--"}
          </p>
        </div>

        <div className="flex flex-row gap-2">
          <SettingsMenu />

          <Button className="bg-nav-item h-12 aspect-square text-gray-200 hover:bg-nav-item hover:brightness-125 transition-all group">
            <Icon
              icon="mdi:bell-outline"
              className="text-6xl text-gray-500 group-hover:text-gray-300 transition-all"
              style={{
                height: 24,
                width: 24,
              }}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
