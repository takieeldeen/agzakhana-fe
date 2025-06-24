import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import endpoints from "./endpoints";
import axios, { getFetcher, URLType } from "./axios";
import { useMemo } from "react";
import { APIResposne } from "@/types/api";
import { BranchLocation, BranchType } from "@/types/branches";

export const useGetBranchesList = () => {
  const URL = endpoints.branches.list;
  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ["branches"],
    queryFn: getFetcher<APIResposne<BranchType>>(URL),
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

export const createBranchFn = async (data: any) => {
  const URL = endpoints.branches.create;
  const modifiedData = { ...data };
  modifiedData.openingHour = modifiedData?.openingHour?.toISOString();
  modifiedData.closingHour = modifiedData?.closingHour?.toISOString();
  await axios.post(URL, modifiedData);
};
export const deleteBranchFn = async (data: any) => {
  const URL = endpoints.branches.delete(data?._id);
  await axios.delete(URL);
};

export const useMutateBranches = () => {
  const queryClient = useQueryClient();
  // Create Branch
  const { mutateAsync: createBranch } = useMutation({
    mutationFn: createBranchFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["branches"] }),
  });
  const { mutateAsync: deleteBranch } = useMutation({
    mutationFn: deleteBranchFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["branches"] }),
  });
  return { createBranch, deleteBranch };
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
    refetchOnWindowFocus: false,
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
