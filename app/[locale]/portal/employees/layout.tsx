import { ReactNode } from "react";

export default function EmployeeDetailsLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  console.log("test");
  console.log(modal);
  return (
    <>
      {modal}
      {children}
    </>
  );
}
