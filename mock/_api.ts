import { AxiosRequestConfig } from "axios";

export const dummyFetcher =
  (data: any, paginated: boolean = false) =>
  async (args: string | [string, AxiosRequestConfig] | null) => {
    if (!args) return;
    const page = (args?.[1] as any)?.params?.page;
    const size = (args?.[1] as any)?.params?.size;
    const name = (args?.[1] as any)?.params?.name ?? "";
    const entityKey = paginated
      ? Object?.keys(data)?.find((key: string) => Array.isArray(data?.[key]))
      : undefined;

    const filteredTotalNoOfRows = entityKey
      ? data?.[entityKey]?.filter(
          (el: any) => el?.nameAr?.includes(name) || el?.nameEn?.includes(name)
        ).length
      : 0;
    const paginatedArray =
      paginated && entityKey
        ? data?.[entityKey]
            ?.filter(
              (el: any) =>
                el?.nameAr?.includes(name) || el?.nameEn?.includes(name)
            )
            .slice?.(page * size, page * size + size)
        : [];

    const paginatedObject = JSON.parse(JSON.stringify(data));
    paginatedObject[entityKey as any] = paginatedArray;
    paginatedObject.totalNoOfRows =
      name && name !== ""
        ? filteredTotalNoOfRows
        : paginatedObject.totalNoOfRows;
    const res = new Promise((resolve) => {
      setTimeout(() => resolve(paginated ? paginatedObject : data), 1500);
    });
    return res as any;
  };
