import { getSingleEmployee } from "@/api/employees";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

type EmployeeModalProps = {
  params: Promise<{ employeeId: string }>;
};
export default async function EmployeeModal({ params }: EmployeeModalProps) {
  const { employeeId } = await params;
  const res = await getSingleEmployee(employeeId);
  const employee = res?.content;
  return (
    <Dialog open>
      <DialogContent>
        <DialogTitle>{employee?.name}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
