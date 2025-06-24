import { useCallback, useState } from "react";

interface TableProps {
  defaultPage?: number;
  defaultRowsPerPage?: number;
  defaultFilters?: { [prop: string]: any };
}

export interface UseTableReturn {
  page: number;
  filters: { [prop: string]: any };
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onFiltersChange: (newFilters: { [prop: string]: any }) => void;
  onResetFilters: VoidFunction;
}

export const useTable = ({
  defaultPage,
  defaultRowsPerPage,
  defaultFilters,
}: TableProps): UseTableReturn => {
  const [page, setPage] = useState<number>(defaultPage ?? 1);
  const [filters, setFilters] = useState<{ [prop: string]: any }>(
    defaultFilters ?? {}
  );
  const [rowsPerPage] = useState<number>(defaultRowsPerPage ?? 5);

  const onPageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const onFiltersChange = useCallback((newFilters: { [prop: string]: any }) => {
    setPage(1);
    setFilters(newFilters);
  }, []);

  const onResetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    page,
    filters,
    rowsPerPage,
    onFiltersChange,
    onPageChange,
    onResetFilters,
  };
};
