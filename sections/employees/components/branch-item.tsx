"use-client";

import { cn } from "@/lib/utils";
import { BranchType } from "@/types/branches";
import { BRANCH_STATUS } from "@/utilis/CONSTANTS";
import { getLocalizedTimeString } from "@/utilis/fs-time";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function BranchItem({ branch }: { branch: BranchType }) {
  const { locale } = useParams();
  const t = useTranslations("BRANCHES_MANAGEMENT_PAGE");
  return (
    <li
      className="dark:bg-card-dark-bg rounded-md py-2 px-2"
      key={branch?.branchCode}
    >
      <p className="text-base font-bold">{branch?.name}</p>
      <p className="dark:text-text-secondary-dark text-sm">{branch?.address}</p>
      <div className="flex flex-row gap-4.5">
        <div className="flex flex-row gap-1 items-center">
          <Icon icon="tabler:clock" />
          <p>{`${getLocalizedTimeString(
            branch?.openingHour,
            locale as "ar" | "en"
          )} : ${getLocalizedTimeString(
            branch?.closingHour,
            locale as "ar" | "en"
          )}`}</p>
        </div>
        <div className="flex items-center gap-1.5 justify-start ">
          <div
            className={cn(
              BRANCH_STATUS?.[branch?.status]?.background,
              "w-3 h-3 rounded-[50%]"
            )}
          >
            &nbsp;
          </div>
          {branch?.status ? t(branch?.status) : "--"}
        </div>
      </div>
    </li>
  );
}
