"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewHeader from "../employees-header";
import { lazy, Suspense } from "react";
// import BranchesListTab from "./tabs/branches-list-tab";

const EmployeesListTab = lazy(() => import("./tabs/employees-list-tab"));
const BranchesMapTab = lazy(() => import("./tabs/employees-map-tab"));

export default function EmployeesView() {
  // State Management //////////////////////////////////////

  return (
    <Tabs defaultValue="LIST" className="h-full">
      <div className="flex flex-col gap-2 w-full h-full sticky top-0">
        <ViewHeader />
        <div className="w-full  flex flex-row justify-start">
          <TabsList className="bg-nav-item">
            <TabsTrigger value="LIST" className="">
              قائمة الأفرع
            </TabsTrigger>
            <TabsTrigger value="MAP">خريطة الأفرع</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="LIST">
          <Suspense fallback={<p>Loading...</p>}>
            <EmployeesListTab />
          </Suspense>
        </TabsContent>
        <TabsContent value="MAP" className="h-full">
          <Suspense fallback={<p>Loading...</p>}>
            <BranchesMapTab />
          </Suspense>
        </TabsContent>
      </div>
    </Tabs>
  );
}
