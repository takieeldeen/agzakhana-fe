"use client";
import { useGetMedicine } from "@/api/medicines";
import ModalLoadingView from "@/components/modal-loading/modal-loading";
import { Separator } from "@/components/ui/separator";
import { MEDICINES_DUMMY_DATA } from "@/mock/_medicines";
import { Medicine } from "@/types/medicines";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MedicineDetailsPage() {
  const { medicineId, locale } = useParams();
  const isAr = locale === "ar";
  const { medicine, medicineLoading, medicineValidating } = useGetMedicine(
    `${medicineId}`
  );
  console.log(medicine);
  const t = useTranslations();
  if (medicineLoading || medicineValidating) return <ModalLoadingView />;
  return (
    <div className="flex md:flex-row flex-col justify-between relative h-full">
      <div className="flex flex-col gap-3 md:w-[90%] rtl:pl-4 ltr:pr-4">
        <section>
          <div className="text-3xl font-bold mb-6">
            <p>{isAr ? medicine?.nameAr : medicine?.nameEn}</p>
            <div className="flex flex-row gap-2 text-base font-normal dark:text-gray-400">
              <span className="">
                {isAr ? medicine?.category?.nameAr : medicine?.category?.nameEn}
              </span>
              <span>-</span>
              <span className="">{medicine?._id}</span>
            </div>
          </div>
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
        </section>
        <div className="flex flex-row gap-4 flex-wrap">
          <section className="flex flex-col gap-2 md:w-[47%] w-full shrink-0">
            <div className="flex flex-row items-center gap-2  ">
              <Icon icon="circum:boxes" className="text-4xl text-neon" />
              <h5 className="font-bold text-xl ">
                {t("MEDICINES_MANAGEMENT_PAGE.MAIN_INFO")}
              </h5>
            </div>
            <Separator className="bg-gray-600" />
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
          <section className="flex flex-col gap-2 md:w-[47%] w-full shrink-0">
            <div className="flex flex-row items-center gap-2  ">
              <Icon icon="icons8:plus" className="text-4xl text-neon" />
              <h5 className="font-bold text-xl ">
                {t("MEDICINES_MANAGEMENT_PAGE.ADDITIONAL_INFO")}
              </h5>
            </div>
            <Separator className="bg-gray-600" />
            <div className="flex flex-row gap-2 text-gray-400">
              <span className="text-white font-bold">
                {t("MEDICINES_MANAGEMENT_PAGE.MEDICINE_TYPE")}
              </span>
              <span className="font-semibold">
                {t(`MEDICINES_MANAGEMENT_PAGE.${medicine?.form}`)}
              </span>
            </div>
            <Separator />
            <div className="flex flex-row gap-2 text-gray-400">
              <span className="text-white font-bold">
                {t("MEDICINES_MANAGEMENT_PAGE.INTERNAL_QTY")}
              </span>
              <span className="font-semibold">{medicine?.internalQty}</span>
            </div>
            <Separator />
            <div className="flex flex-row gap-2 text-gray-400">
              <span className="text-white font-bold">
                {t("MEDICINES_MANAGEMENT_PAGE.INTERNAL_UNIT_PRICE")}
              </span>
              <span className="font-semibold">{medicine?.pricePerUnit}</span>
            </div>
          </section>
        </div>
      </div>
      <aside className=" h-full sticky top-0 right-0 w-full md:w-96 p-2 rtl:border-r-2 border-gray-800 ltr:border-l-2  ">
        <p className="font-bold text-xl mb-4">منتجات ذات صلة</p>
        <ul className="flex flex-col gap-2 list-none md:h-[90vh] overflow-y-scroll">
          {MEDICINES_DUMMY_DATA.content.map((medicine) => (
            <SimilarMedicineCard
              key={medicine?._id}
              medicine={medicine}
              isAr={isAr}
            />
          ))}
        </ul>
      </aside>
    </div>
  );
}

function SimilarMedicineCard({
  medicine,
  isAr,
}: {
  medicine: Medicine;
  isAr: boolean;
}) {
  const t = useTranslations();
  return (
    <li key={medicine?._id}>
      <Link
        href={`${isAr ? "/ar" : "/en"}/portal/medicines/${medicine?._id}`}
        className="p-2 rounded-md bg-card-dark-bg md:w-[96%] flex flex-row gap-2 hover:brightness-150 transition-all"
      >
        <div className="h-12 w-12 rounded-md items-center justify-center relative">
          {medicine?.imageUrl && (
            <Image
              src={medicine?.imageUrl}
              alt={medicine?.nameEn}
              className="h-12 w-auto"
              loading="lazy"
              fill
            />
          )}
          {!medicine?.imageUrl && (
            <Icon
              icon="lets-icons:img-box-light"
              className="text-4xl text-neon"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <p className="font-semibold">
            {isAr ? medicine?.nameAr : medicine?.nameEn}
          </p>
          <div className="flex flex-row gap-2  text-sm justify-between">
            <span className="text-gray-400">
              {isAr ? medicine?.category?.nameAr : medicine?.category?.nameEn}
            </span>
            <span className="text-base font-semibold text-white">
              {t("MEDICINES_MANAGEMENT_PAGE.PRICE", {
                price: medicine?.price,
              })}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
