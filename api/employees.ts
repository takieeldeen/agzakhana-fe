import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import endpoints from "./endpoints";
import axios, { getFetcher } from "./axios";
import { useMemo } from "react";
import { APIResposne } from "@/types/api";
import { Employee } from "@/types/employees";
import { objectToFormData } from "@/utilis/formdata";

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

export const useGetEmployees = () => {
  const URL = endpoints.users.list;
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
      totalNumberOfRows: data?.results,
    }),
    [data?.content, data?.results, error, isFetching, isLoading]
  );
};
