import BranchesView from "@/sections/branches/views/branches-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Branches Management",
  description: "Manage all your pharmacies branches in one page.",
};

export default function BranchesPage() {
  return <BranchesView />;
}
