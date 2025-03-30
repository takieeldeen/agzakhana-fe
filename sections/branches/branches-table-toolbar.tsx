"use client";
import Form from "@/components/form-provider/form-provider";
import RHFTag from "@/components/rhf-tag/rhf-tag";
import Autocomplete from "@/components/autocomplete/autocomplete";

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { SORT_CRITERIA } from "@/mock/_helpers";
import { useParams } from "next/navigation";

export default function TableToolbar() {
  const t = useTranslations("BRANCHES_MANAGEMENT_PAGE");
  // const tCommon = useTranslations("COMMON");
  const { locale } = useParams();
  const methods = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="w-fit px-2 flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl font-bold">{t("FILTER_TITLE")}</p>
          <p className="text-xs border-[1px] border-white px-2 py-0.5 rounded-full">
            {t("PRODUCTS")}
            <strong className="text-base"> (132)</strong>
          </p>
        </div>
        <div className="bg-filter-background rounded-lg p-2 text-gray-400 font-semibold flex flex-col gap-4">
          {/* Status Filters */}
          <p>{t("STATUS_FILTER_TITLE")}</p>
          <div className="flex flex-wrap gap-1">
            <RHFTag name="status" value="ALL">
              {t("STOCK_ALL")}
              <span className="bg-gray-500/10 p-0.5 rounded-md px-1 font-bold text-xs">
                6
              </span>
            </RHFTag>
            <RHFTag name="status" value="OPEN">
              {t("OPEN")}
              <span className="bg-gray-500/10 p-0.5 rounded-md px-1 font-bold text-xs">
                3
              </span>
            </RHFTag>
            <RHFTag name="status" value="BREAK">
              {t("BREAK")}
              <span className="bg-gray-500/10 p-0.5 rounded-md px-1 font-bold text-xs">
                1
              </span>
            </RHFTag>
            <RHFTag name="status" value="CLOSED">
              {t("CLOSED")}
              <span className="bg-gray-500/10 p-0.5 rounded-md px-1 font-bold text-xs">
                1
              </span>
            </RHFTag>
            <RHFTag name="status" value="VACATION">
              {t("VACATION")}
              <span className="bg-gray-500/10 p-0.5 rounded-md px-1 font-bold text-xs">
                1
              </span>
            </RHFTag>
          </div>

          <Separator className="bg-gray-800" />
          {/* Sort By Filters */}
          <p>{t("SORT_BY")}</p>
          <Autocomplete
            options={SORT_CRITERIA}
            api={{
              getOptionLabel: (option) => {
                if (option)
                  return locale === "ar" ? option?.nameAr : option?.nameEn;
                return "";
              },
              isOptionEqualToValue: (option, value) => option?.id === value?.id,
              getOptionId: (option) => option?.id,
            }}
            inputProps={{ placeholder: t("NO_SORT") }}
          />
        </div>
      </div>
    </Form>
  );
}
