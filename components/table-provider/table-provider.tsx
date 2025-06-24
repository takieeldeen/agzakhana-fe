import { UseTableReturn } from "@/hooks/use-table";
import { createContext, ReactNode, useContext } from "react";

const TableContext = createContext<UseTableReturn | undefined>(undefined);

export default function TableProvider({
  children,
  table,
}: {
  children: ReactNode;
  table: UseTableReturn;
}) {
  return (
    <TableContext.Provider value={table}>{children}</TableContext.Provider>
  );
}

export function useTableContext() {
  const tableProps = useContext(TableContext);
  if (!tableProps)
    throw new Error("Cant use useTableContext Outside table provider");
  return tableProps;
}
