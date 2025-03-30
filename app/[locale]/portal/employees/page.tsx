import EmployeesView from "@/sections/employees/views/employees-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Employees Management",
  description: "Manage all your pharmacies employees in one page.",
};

export default function BranchesPage() {
  return (
    <>
      <EmployeesView />
    </>
  );
}
