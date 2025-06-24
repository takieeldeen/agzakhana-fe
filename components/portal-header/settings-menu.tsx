"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { logout } from "@/api/auth";

export default function SettingsMenu() {
  const [opened, setOpened] = useState<boolean>(false);
  const t = useTranslations();
  // Callbacks ///////////////////////////////////////////
  const handleLogout = useCallback(async () => {
    await logout().then(() => {
      window.location.reload();
    });
  }, []);
  return (
    <DropdownMenu open={opened} onOpenChange={() => setOpened((prev) => !prev)}>
      <DropdownMenuTrigger>
        <Button className="bg-nav-item h-12 aspect-square text-gray-200 hover:bg-nav-item hover:brightness-125 transition-all group ring-0!">
          <Icon
            icon="ic:outline-settings"
            className={cn(
              "text-6xl text-gray-500 group-hover:text-gray-300 group-hover:rotate-90 transition-all",
              opened ? "rotate-90 text-gray-300" : ""
            )}
            style={{
              height: 24,
              width: 24,
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex ltr:flex-row rtl:flex-row-reverse gap-0.5 items-center justify-start px-1">
          <Icon
            icon="ic:outline-settings"
            className={cn(
              "text-6xl text-gray-500 group-hover:text-gray-300 group-hover:rotate-90 transition-all",
              opened ? "rotate-90 text-gray-300" : ""
            )}
            style={{
              height: 18,
              width: 18,
            }}
          />
          <DropdownMenuLabel>{t("SETTINGS.SETTINGS")}</DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          {t("SETTINGS.SIGN_OUT")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
