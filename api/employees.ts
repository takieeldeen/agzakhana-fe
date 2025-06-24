import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import endpoints from "./endpoints";
import axios, { getDummyFetcher, getFetcher, URLType } from "./axios";
import { useMemo } from "react";
import { APIResposne } from "@/types/api";
import { Employee } from "@/types/employees";
import { objectToFormData } from "@/utilis/formdata";
import { clearEmptyValues } from "@/utilis/objects";
import { EMPLOYEE_DETAIL } from "@/mock/_employee";

export const useInviteEmployee = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: any) => {
      const URL = endpoints.users.invite;
      const formData = objectToFormData(data);
      await axios.post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
    onError: (error) => {
      throw error;
    },
  });
  return useMemo(
    () => ({
      inviteEmployee: mutateAsync,
    }),
    [mutateAsync]
  );
};

export const useToggleEmployeeStatus = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (row: Employee) => {
      const URL = endpoints.users.singleUser(row?._id);
      await axios.patch(URL, {
        status: row?.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
    onError: (error) => {
      throw error;
    },
  });
  return useMemo(
    () => ({
      toggleEmployeeStatus: mutateAsync,
    }),
    [mutateAsync]
  );
};
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (id: string) => {
      const URL = endpoints.users.singleUser(id);
      await axios.delete(URL);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
    onError: (error) => {
      throw error;
    },
  });
  return useMemo(
    () => ({
      deleteEmployee: mutateAsync,
    }),
    [mutateAsync]
  );
};

export const useGetEmployees = (
  page: number,
  limit: number,
  filters: { [prop: string]: any } = {}
) => {
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
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["employees", URL],
    queryFn: getFetcher<APIResposne<Employee>>(URL),
  });

  return useMemo(
    () => ({
      employees: data?.content,
      employeesLoading: isLoading,
      employeesValidating: isFetching,
      employeesError: error,
      totalNumberOfRows: data?.totalCount,
    }),
    [data?.content, data?.totalCount, error, isFetching, isLoading]
  );
};

export const useGetEmployee = (employeeId: string) => {
  const URL = endpoints.users.singleUser(employeeId);
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["employees", URL],
    queryFn: getDummyFetcher<typeof EMPLOYEE_DETAIL>(
      URL,
      EMPLOYEE_DETAIL as any
    ),
  });
  return useMemo(
    () => ({
      employee: data,
      employeeLoading: isLoading,
      employeeValidating: isFetching,
      error,
    }),
    [data, error, isFetching, isLoading]
  );
};
export const getSingleEmployee = async (employeeId: string) => {
  const URL = endpoints.users.singleUser(employeeId);

  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
