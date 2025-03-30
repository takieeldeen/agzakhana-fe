"use client";

import { Button } from "@/components/ui/button";

import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { lazy, Suspense } from "react";

const MemoizedStockNewEditForm = lazy(() => import("./branches-new-edit-form"));

export default function Header() {
  const { locale } = useParams();
  // State Management /////////////////////////////
  const t = useTranslations("BRANCHES_MANAGEMENT_PAGE");
  return (
    <div className="flex md:flex-row sm:flex-col justify-between md:rtl:pl-2">
      <div className="flex flex-col gap-0 mb-2">
        <h3 className="text-3xl font-bold">{t("PAGE_TITLE")}</h3>
        <span className="text-gray-700 dark:text-gray-300 font-semibold">
          {t("PAGE_SUBTITLE")}
        </span>
      </div>
      <Drawer direction={locale === "ar" ? "right" : "left"}>
        <DrawerTrigger asChild>
          <Button className="font-bold dark:bg-button-background dark:text-white hover:dark:bg-button-background-hover hover:dark:text-button-color-hover cursor-pointer transition-all transition-300">
            <Icon icon="mage:box-3d-plus" />
            {t("FORM_TRIGGER")}
          </Button>
        </DrawerTrigger>
        <Suspense fallback={<p>Loading...</p>}>
          <MemoizedStockNewEditForm />
        </Suspense>
      </Drawer>
    </div>
  );
}
