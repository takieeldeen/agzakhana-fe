import { useGetEmployee } from "@/api/employees";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | Employee Details Page",
  description: "Find the details of a specifc employee",
};
export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ employeeId: string; locale: string }>;
}) {
  const { employeeId } = await params;
  return <p>This is the details page</p>;
}
