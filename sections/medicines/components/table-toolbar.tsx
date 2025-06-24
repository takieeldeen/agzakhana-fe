"use client";
import Form from "@/components/form-provider/form-provider";
import RHFTag from "@/components/rhf-tag/rhf-tag";

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useTableContext } from "@/components/table-provider/table-provider";
import { Button } from "@/components/ui/button";
import { USER_STATUS } from "@/utilis/CONSTANTS";
import RHFTextfield from "@/components/rhf-textfield/rhf-textfield";
import { useCallback } from "react";
import RHFAutocomplete from "@/components/autocomplete/rhf-autocomplete";
// import { EMP_POSITIONS } from "./employees-constants";

const SORT_OPTIONS = [
  {
    id: 1,
    nameAr: "الاسم",
    nameEn: "Name",
    value: "name",
  },
  {
    id: 2,
    nameAr: "الحالة",
    nameEn: "Status",
    value: "status",
  },
];

export default function TableToolbar({
  totalCount,
}: {
  totalCount: number | undefined;
}) {
  // Custom Hooks ////////////////////////////////////////////
  const t = useTranslations("");
  const { locale } = useParams();
  // Form Setup  ////////////////////////////////////////////
  const defaultValues = {
    status: "",
    name: "",
    sort: "",
    jobTitle: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { reset, setValue } = methods;
  const tableProps = useTableContext();
  // Callbacks  ////////////////////////////////////////////
  const onSubmit = async (data: any) => {
    if (data?._reactName) return;
    tableProps.onFiltersChange(data);
  };

  const handleResetFilters = useCallback(() => {
    reset();
    tableProps.onResetFilters();
  }, [reset, tableProps]);
  // Helper Constants  ////////////////////////////////////////////
  const canReset =
    tableProps?.filters?.status !== "" ||
    tableProps?.filters?.name !== "" ||
    tableProps?.filters?.jobTitle !== "" ||
    tableProps?.filters?.sort !== "";
  console.log(tableProps.filters);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="w-full px-2 flex flex-col gap-2 max-w-96">
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl font-bold">
            {t("BRANCHES_MANAGEMENT_PAGE.FILTER_TITLE")}
          </p>
          <p className="text-xs border-[1px] border-white px-2 py-0.5 rounded-full">
            {t("NAV_BAR.EMPLOYEES")}
            <strong className="text-base"> ({totalCount ?? "--"})</strong>
          </p>
        </div>
        <div className="bg-filter-background rounded-lg p-2 text-gray-400 font-semibold flex flex-col gap-4">
          {/* Status Filters */}
          <p>{t("USER_MANAGEMENT_PAGE.STATUS")}</p>
          <div className="flex flex-wrap gap-1">
            {Object?.values(USER_STATUS)?.map((status) => (
              <RHFTag name="status" value={status?.value} key={status?.id}>
                {locale === "ar" ? status?.nameAr : status?.nameEn}
              </RHFTag>
            ))}
          </div>
          <Separator className="bg-gray-800" />
          {/* JobTitle Filters */}
          <p>{t("USER_MANAGEMENT_PAGE.JOB")}</p>
          <div className="flex flex-wrap gap-1">
            {/* {EMP_POSITIONS?.map((jobTitle) => (
              <RHFTag name="jobTitle" value={jobTitle} key={jobTitle}>
                {t(`USER_MANAGEMENT_PAGE.${jobTitle}`)}
              </RHFTag>
            ))} */}
          </div>
          <Separator className="bg-gray-800" />
          {/* Status Filters */}
          <p>{t("COMMON.SEARCH_BY_NAME")}</p>
          <RHFTextfield name="name" placeholder={t("COMMON.SEARCH_BY_NAME")} />
          <Separator className="bg-gray-800" />
          <p>{t("BRANCHES_MANAGEMENT_PAGE.SORT_BY")}</p>
          <RHFAutocomplete
            name="sort"
            options={SORT_OPTIONS}
            inputProps={{
              placeholder: t("BRANCHES_MANAGEMENT_PAGE.SORT_BY"),
            }}
            api={{
              getOptionId: (option) => option?.id,
              isOptionEqualToValue: (option, value) => option?.id === value?.id,
              getOptionLabel: (option) =>
                locale === "ar"
                  ? option?.nameAr ?? "--"
                  : option?.nameEn ?? "--",
            }}
            onChange={(value) => {
              setValue("sort", value?.value ?? "");
            }}
          />
          <div className="flex flex-row w-full  justify-between">
            <Button
              className="w-[48%] font-semibold text-base transition-all transition-300 bg-neon hover:bg-neon hover:brightness-125"
              onClick={onSubmit}
            >
              {t("COMMON.FILTER")}
            </Button>
            <Button
              className="w-[48%] font-semibold text-base bg-transparent border-[1px] border-neon text-neon   transition-all transition-300 hover:bg-neon hover:text-modal-dark"
              onClick={handleResetFilters}
              disabled={!canReset}
            >
              {t("COMMON.REMOVE_FILTERS")}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
