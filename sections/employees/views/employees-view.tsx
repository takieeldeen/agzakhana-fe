"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewHeader from "../employees-header";
import { lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
// import BranchesListTab from "./tabs/branches-list-tab";

const EmployeesListTab = lazy(() => import("./tabs/employees-list-tab"));
const BranchesMapTab = lazy(() => import("./tabs/employees-map-tab"));

export default function EmployeesView() {
  // State Management //////////////////////////////////////
  // Hooks //////////////////////////////////////
  const t = useTranslations("USER_MANAGEMENT_PAGE")
  return (
    <Tabs defaultValue="EMPLOYEES_LIST" className="h-full">
      <div className="flex flex-col gap-2 w-full h-full sticky top-0">
        <ViewHeader />
        <div className="w-full  flex flex-row justify-start">
          <TabsList className="bg-nav-item">
            <TabsTrigger value="EMPLOYEES_LIST" className="cursor-pointer">
              {t("EMPLOYEES_LIST_TAB")}
            </TabsTrigger>
            <TabsTrigger value="EMPLOYEES_DISTRIBUTION" className="cursor-pointer">{t("EMPLOYEES_DISTRIBUTION_TAB")}</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="EMPLOYEES_LIST">
          <Suspense fallback={<p>Loading...</p>}>
            <EmployeesListTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="EMPLOYEES_DISTRIBUTION" className="h-full">
          <Suspense fallback={<p>Loading...</p>}>
            <BranchesMapTab />
          </Suspense>
        </TabsContent>
      </div>
    </Tabs>
  );
}
