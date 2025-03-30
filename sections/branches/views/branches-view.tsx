"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ViewHeader from "../branches-header";
import { lazy, Suspense } from "react";
// import BranchesListTab from "./tabs/branches-list-tab";

const BranchesListTab = lazy(() => import("./tabs/branches-list-tab"));
const BranchesMapTab = lazy(() => import("./tabs/branches-map-tab"));

export default function BranchesView() {
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
            <BranchesListTab />
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
