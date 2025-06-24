"use client";
import { useGetMedicine } from "@/api/medicines";
import ModalLoadingView from "@/components/modal-loading/modal-loading";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function EmployeeModal() {
  const { medicineId, locale } = useParams();
  const router = useRouter();
  const isAr = locale === "ar";
  const { medicine, medicineLoading, medicineValidating } = useGetMedicine(
    `${medicineId}`
  );
  const t = useTranslations();
  console.log(medicineLoading, medicineValidating, `${medicine?.price}`);
  if (medicineLoading || medicineValidating) return <ModalLoadingView />;
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent
        style={{ maxWidth: "unset" }}
        className="flex flex-col w-[32rem] max-w-96"
      >
        <DialogTitle className="p-2 rtl:text-right text-left text-3xl font-bold flex flex-col gap-2">
          {isAr ? medicine?.nameAr : medicine?.nameEn}
          <div className="flex flex-row gap-2 text-base font-normal dark:text-gray-400">
            <span className="">
              {isAr ? medicine?.category?.nameAr : medicine?.category?.nameEn}
            </span>
            <span>-</span>
            <span className="">{medicine?._id}</span>
          </div>
        </DialogTitle>
        <div className="h-96 w-96 relative bg-white/5 rounded-md">
          {medicine?.imageUrl && (
            <Image
              src={medicine?.imageUrl}
              alt={isAr ? medicine?.nameAr ?? "" : medicine?.nameEn ?? ""}
              className="h-12 w-auto"
              fill
              loading="lazy"
            />
          )}
        </div>
        <section className="flex flex-col gap-2">
          <h5 className="font-bold text-xl mb-4">
            {t("MEDICINES_MANAGEMENT_PAGE.MAIN_INFO")}
          </h5>
          <div className="flex flex-row gap-2 text-gray-400">
            <span className="text-white font-bold">
              {t("MEDICINES_MANAGEMENT_PAGE.CATEGORY")}
            </span>
            <span className="font-semibold">
              {isAr ? medicine?.category?.nameAr : medicine?.category?.nameEn}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row gap-2 text-gray-400">
            <span className="text-white font-bold">
              {t("MEDICINES_MANAGEMENT_PAGE.DOSAGE")}
            </span>
            <span className="font-semibold">{medicine?.dosage}</span>
          </div>
          <Separator />
          <div className="flex flex-row gap-2 text-gray-400">
            <span className="text-white font-bold">
              {t("MEDICINES_MANAGEMENT_PAGE.DESCRIPTION")}
            </span>
            <span className="font-semibold">
              {isAr ? medicine?.descriptionAr : medicine?.descriptionEn}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row gap-2 text-gray-400">
            <span className="text-white font-bold">
              {t("MEDICINES_MANAGEMENT_PAGE.REQUIRE_PRESCRIPTION")}
            </span>
            <span className="font-semibold">
              {t(
                `MEDICINES_MANAGEMENT_PAGE.PRESCRIPTION_${medicine?.requirePrescription}`
              )}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row gap-2 text-gray-400">
            <span className="text-white font-bold">
              {t("MEDICINES_MANAGEMENT_PAGE.CURRENT_PRICE")}
            </span>
            <span className="font-semibold">
              {t("MEDICINES_MANAGEMENT_PAGE.PRICE", {
                price: medicine?.price,
              })}
            </span>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
