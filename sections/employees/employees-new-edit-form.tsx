import { useGetPharmacyLocation } from "@/api/branches";
import Autocomplete from "@/components/autocomplete/autocomplete";
import RHFAutoComplete from "@/components/autocomplete/rhf-autocomplete";
import Form from "@/components/form-provider/form-provider";
import RHFTextfield from "@/components/rhf-textfield/rhf-textfield";
import RHFTimepicker from "@/components/rhf-timepicker/rhf-timepicker";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useDebounce from "@/hooks/use-debounce";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect } from "react";
// import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function NewEditForm() {
  const { locale } = useParams();
  const branchesFormSchema = Yup.object().shape({
    branchName: Yup.string().required("Please enter Branch Name"),
    googleLink: Yup.string().url(),
    city: Yup.string(),
    openingHour: Yup.date(),
    closingHour: Yup.date(),
    lat: Yup.number(),
    lng: Yup.number(),
    address: Yup.string(),
  });
  const defaultValues = {
    branchName: "",
    googleLink: "",
    openingHour: new Date(),
    closingHour: new Date(),
    city: "",
    lat: 0,
    lng: 0,
    address: "",
  };
  const methods = useForm({
    resolver: yupResolver(branchesFormSchema),
    defaultValues,
  });
  const { setValue, watch } = methods;
  const values = watch();
  const { location, locationUpdating } = useGetPharmacyLocation(
    useDebounce(values?.googleLink)
  );

  const t = useTranslations("BRANCHES_MANAGEMENT_PAGE.FORM");
  const onSubmit = async (data: any) => {
    console.log(data, "submitted data");
  };
  useEffect(() => {
    if (location) {
      setValue(
        "address",
        locale === "ar" ? location?.address?.nameAr : location?.address?.nameEn
      );
      setValue(
        "city",
        locale === "ar" ? location?.city?.nameAr : location?.city?.nameEn
      );
      setValue("lat", location?.lat);
      setValue("lng", location?.lng);
    }
  }, [locale, location, setValue]);
  return (
    <DrawerContent className="dark:bg-modal-dark-background overflow-y-scroll">
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-xl">
              {t("CREATION_TITLE")}
            </DrawerTitle>
            <DrawerDescription>{t("CREATION_SUBTITLE")}</DrawerDescription>
            <div className="flex flex-col gap-2.5">
              {/* Stack */}
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{t("BRANCH_NAME")}</p>
                <RHFTextfield
                  name="branchName"
                  placeholder={t("BRANCH_NAME")}
                />
              </div>

              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold">{t("OPENING_HOUR")}</p>
                  <RHFTimepicker label={t("OPENING_HOUR")} name="openingHour" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold">{t("CLOSING_HOUR")}</p>
                  <RHFTimepicker label={t("CLOSING_HOUR")} name="closingHour" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{t("GOOGLE_MAP_LINK")}</p>
                <RHFTextfield
                  name="googleLink"
                  placeholder={t("GOOGLE_MAP_LINK")}
                  startElement={
                    <div className="rtl:pr-2 ltr:pl-2">
                      <Icon icon="hugeicons:maps" className="text-xl" />
                    </div>
                  }
                  onChange={(e) => {
                    const val = e?.target?.value ?? "";
                    // const res = await getPharmacyLocation(val);
                    // console.log(res);
                    // setValue("lng", res?.lng);
                    // setValue("lat", res?.lat);
                    // setValue("address", res?.address);
                    setValue("googleLink", val);
                  }}
                />
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold">{t("LAT")}</p>
                  <RHFTextfield
                    name="lat"
                    placeholder={t("LAT")}
                    loading={locationUpdating}
                    disabled={locationUpdating}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold">{t("LNG")}</p>
                  <RHFTextfield
                    name="lng"
                    placeholder={t("LNG")}
                    loading={locationUpdating}
                    disabled={locationUpdating}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{t("CITY")}</p>
                <RHFTextfield
                  name="city"
                  placeholder={t("CITY")}
                  loading={locationUpdating}
                  disabled={locationUpdating}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{t("ADDRESS")}</p>
                <RHFTextfield
                  name="address"
                  placeholder={t("ADDRESS")}
                  loading={locationUpdating}
                  disabled={locationUpdating}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{t("ADDRESS")}</p>
                <RHFAutoComplete name="branchManager" options={[""]} />
                <Autocomplete options={[""]} />
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={onSubmit}
              className="font-bold  dark:bg-button-background-hover hover:dark:text-button-color-hover cursor-pointer transition-all transition-300"
            >
              {/* {t("FORM_TRIGGER")} */}
              إضافة المنتج
            </Button>
            {/*  */}
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="font-bold  dark:bg-button-background hover:brightness-125 cursor-pointer transition-all transition-300"
              >
                إلغاء
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </Form>
    </DrawerContent>
  );
}
