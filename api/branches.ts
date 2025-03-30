import { useQuery } from "@tanstack/react-query";
import endpoints from "./endpoints";
import { getDummyFetcher, getFetcher, URLType } from "./axios";
import { useMemo } from "react";
import { BRANCHES_LIST_DATA } from "@/mock/_branches";
import { APIResposne } from "@/types/api";
import { BranchLocation, BranchType } from "@/types/branches";

export const useGetBranchesList = () => {
  const URL = endpoints.branches.list;
  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ["branches"],
    // queryFn: getFetcher<dummy>(URL),
    queryFn: getDummyFetcher<APIResposne<BranchType[]>>(
      URL,
      BRANCHES_LIST_DATA
    ),
  });
  return useMemo(
    () => ({
      branches: data?.content ?? [],
      branchesFields: data?.results ?? 0,
      branchesUpdating: isFetching,
      branchesLoading: isPending,
      branchesError: error,
    }),
    [data?.content, data?.results, error, isFetching, isPending]
  );
};

export const useGetPharmacyLocation = (url: string | undefined) => {
  const URL: URLType =
    !url || url === ""
      ? null
      : [
          endpoints.branches.pharmacyLocation,
          {
            params: {
              url,
            },
          },
        ];
  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ["branchLocation", url],
    queryFn: getFetcher<BranchLocation>(URL),
  });
  return useMemo(
    () => ({
      location: data?.location,
      locationUpdating: isFetching,
      locationLoading: isPending,
      locationError: error,
    }),
    [data?.location, error, isFetching, isPending]
  );
};

// export const getPharmacyLocation = async (url: string) => {
//   const res = await axios.get(endpoints.branches.pharmacyLocation, {
//     params: {
//       url,
//     },
//   });
//   return res?.data;
// };
