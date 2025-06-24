import { Metadata } from "next";
import { lazy, Suspense } from "react";

export const metadata: Metadata = {
  title: "Agzakhana | Medicines List Page",
  description: "Check All Medicines available in your website.",
};

const MedicineListView = lazy(
  () => import("@/sections/medicines/views/list-view")
);

type MedicineListPageProps = {
  params: Promise<{
    locale: "ar" | "en";
  }>;
};
export default async function MedicinesListPage({
  params,
}: MedicineListPageProps) {
  const { locale } = await params;
  console.log(locale);
  return (
    <Suspense>
      <MedicineListView />
    </Suspense>
  );
}
