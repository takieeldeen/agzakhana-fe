import { useQuery } from "@tanstack/react-query";
import endpoints from "./endpoints";
import { clearEmptyValues } from "@/utilis/objects";
import { getDummyFetcher, URLType } from "./axios";
import { APIResposne } from "@/types/api";
import { Medicine } from "@/types/medicines";
import { MEDICINES_DETAILS, MEDICINES_DUMMY_DATA } from "@/mock/_medicines";
import { useMemo } from "react";

export function useGetMedicinesList(
  page: number,
  limit: number,
  filters: { [prop: string]: any }
) {
  const modifiedFilters = {
    ...filters,
  };
  if (modifiedFilters?.name)
    modifiedFilters.name = { like: modifiedFilters.name };
  // Clear emptyFilters

  const URL: URLType = [
    endpoints.users.list,
    {
      params: {
        page,
        limit,
        ...clearEmptyValues(modifiedFilters),
      },
    },
  ];
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["medicines"],
    queryFn: getDummyFetcher<APIResposne<Medicine>>(
      URL,
      MEDICINES_DUMMY_DATA as any
    ),
  });

  return useMemo(
    () => ({
      medicines: data?.content,
      medicinesLoading: isLoading,
      medicinesValidating: isFetching,
      medicinesError: error,
      totalNumberOfRows: data?.totalCount,
    }),
    [data?.content, data?.totalCount, error, isFetching, isLoading]
  );
}

export function useGetMedicine(medicineId: string) {
  const URL = endpoints.medicines.details(medicineId);
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["medicines", `medicine-${medicineId}`],
    queryFn: getDummyFetcher<Medicine>(URL, MEDICINES_DETAILS),
  });
  return useMemo(
    () => ({
      medicine: data,
      medicineLoading: isLoading,
      medicineValidating: isFetching,
      error,
    }),
    [data, error, isFetching, isLoading]
  );
}
