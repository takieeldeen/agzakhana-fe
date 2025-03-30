import { dummyFetcher } from "@/mock/_api";
import Axios, { AxiosRequestConfig } from "axios";
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.response.use(
  (res: any) => res,
  (error: any) => Promise.reject(error?.response?.data?.error)
);

export type URLType = string | [string, AxiosRequestConfig] | null;
export const getFetcher =
  <T>(URL: URLType) =>
  async (): Promise<T | undefined> => {
    console.log(URL);
    if (!URL) return {} as T;
    const link = typeof URL === "string" ? URL : URL?.[0];
    const config = typeof URL === "string" ? undefined : URL?.[1] ?? undefined;
    const data = await axios.get(link, config);
    return data?.data;
  };
export const getDummyFetcher =
  <T>(URL: URLType, data: T) =>
  async (): Promise<T> => {
    return dummyFetcher(data)(URL);
  };

export default axios;
