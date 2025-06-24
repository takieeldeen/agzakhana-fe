import { useGetPharmacyLocation, useMutateBranches } from "@/api/branches";
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
  const t = useTranslations();
  const { createBranch } = useMutateBranches();
  const { locale } = useParams();
  const branchesFormSchema = Yup.object().shape({
    name: Yup.string().required(
      t("VALIDATIONS.REQUIRED_FIELD", {
        field: t("BRANCHES_MANAGEMENT_PAGE.FORM.BRANCH_NAME"),
      })
    ),
    googleMapsUrl: Yup.string()
      .url(
        t("VALIDATIONS.INVALID_FIELD", {
          field: t("BRANCHES_MANAGEMENT_PAGE.FORM.GOOGLE_MAP_LINK"),
        })
      )
      .required(
        t("VALIDATIONS.REQUIRED_FIELD", {
          field: t("BRANCHES_MANAGEMENT_PAGE.FORM.GOOGLE_MAP_LINK"),
        })
      ),
    city: Yup.string().required(
      t("VALIDATIONS.REQUIRED_FIELD", {
        field: t("BRANCHES_MANAGEMENT_PAGE.FORM.CITY"),
      })
    ),
    openingHour: Yup.date()
      .required(
        t("VALIDATIONS.REQUIRED_FIELD", {
          field: t("BRANCHES_MANAGEMENT_PAGE.FORM.OPENING_HOUR"),
        })
      )
      .max(
        Yup.ref("closingHour"),
        t("VALIDATIONS.DATE_EXCEEDED", {
          firstField: t("BRANCHES_MANAGEMENT_PAGE.FORM.OPENING_HOUR"),
          secondField: t("BRANCHES_MANAGEMENT_PAGE.FORM.CLOSING_HOUR"),
        })
      ),
    closingHour: Yup.date().required(
      t("VALIDATIONS.REQUIRED_FIELD", {
        field: t("BRANCHES_MANAGEMENT_PAGE.FORM.CLOSING_HOUR"),
      })
    ),
    lat: Yup.number()
      .transform((value) => {
        if (value === "") return null;
        return value;
      })
      .required(
        t("VALIDATIONS.REQUIRED_FIELD", {
          field: t("BRANCHES_MANAGEMENT_PAGE.FORM.LAT"),
        })
      ),
    lng: Yup.number().required(
      t("VALIDATIONS.REQUIRED_FIELD", {
        field: t("BRANCHES_MANAGEMENT_PAGE.FORM.LAT"),
      })
    ),
    address: Yup.string().required(
      t("VALIDATIONS.REQUIRED_FIELD", {
        field: t("BRANCHES_MANAGEMENT_PAGE.FORM.ADDRESS"),
      })
    ),
    phone: Yup.string().required(
      t("VALIDATIONS.REQUIRED_FIELD", {
        field: t("BRANCHES_MANAGEMENT_PAGE.FORM.PHONE"),
      })
    ),
  });
  const defaultValues = {
    name: "",
    googleMapsUrl: "",
    city: "",
    openingHour: new Date(),
    closingHour: new Date(),
    lat: 0,
    lng: 0,
    address: "",
    phone: "",
  };
  const methods = useForm({
    resolver: yupResolver(branchesFormSchema),
    defaultValues,
  });
  const {
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods;
  const values = watch();
  const { location, locationUpdating } = useGetPharmacyLocation(
    useDebounce(values?.googleMapsUrl)
  );
  const onSubmit = async (data: any) => {
    try {
      await createBranch(data);
    } catch (err: any) {
      console.log(err?.message);
    }
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
              {t("BRANCHES_MANAGEMENT_PAGE.FORM.CREATION_TITLE")}
            </DrawerTitle>
            <DrawerDescription>
              {t("BRANCHES_MANAGEMENT_PAGE.FORM.CREATION_SUBTITLE")}
            </DrawerDescription>
            <div className="flex flex-col gap-2.5">
              {/* Stack */}
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {t("BRANCHES_MANAGEMENT_PAGE.FORM.BRANCH_NAME")}
                </p>
                <RHFTextfield
                  name="name"
                  placeholder={t("BRANCHES_MANAGEMENT_PAGE.FORM.BRANCH_NAME")}
                />
              </div>

              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold">
                    {t("BRANCHES_MANAGEMENT_PAGE.FORM.OPENING_HOUR")}
                  </p>
                  <RHFTimepicker
                    label={t("BRANCHES_MANAGEMENT_PAGE.FORM.OPENING_HOUR")}
                    name="openingHour"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold">
                    {t("BRANCHES_MANAGEMENT_PAGE.FORM.CLOSING_HOUR")}
                  </p>
                  <RHFTimepicker
                    label={t("BRANCHES_MANAGEMENT_PAGE.FORM.CLOSING_HOUR")}
                    name="closingHour"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {t("BRANCHES_MANAGEMENT_PAGE.FORM.GOOGLE_MAP_LINK")}
                </p>
                <RHFTextfield
                  name="googleMapsUrl"
                  placeholder={t(
                    "BRANCHES_MANAGEMENT_PAGE.FORM.GOOGLE_MAP_LINK"
                  )}
                  startElement={
                    <div className="rtl:pr-2 ltr:pl-2">
                      <Icon icon="hugeicons:maps" className="text-xl" />
                    </div>
                  }
                  onChange={(e) => {
                    const val = e?.target?.value ?? "";
                    setValue("googleMapsUrl", val);
                  }}
                />
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold">
                    {t("BRANCHES_MANAGEMENT_PAGE.FORM.LAT")}
                  </p>
                  <RHFTextfield
                    type="number"
                    name="lat"
                    placeholder={t("BRANCHES_MANAGEMENT_PAGE.FORM.LAT")}
                    loading={locationUpdating}
                    disabled={locationUpdating}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold">
                    {t("BRANCHES_MANAGEMENT_PAGE.FORM.LNG")}
                  </p>
                  <RHFTextfield
                    name="lng"
                    placeholder={t("BRANCHES_MANAGEMENT_PAGE.FORM.LNG")}
                    loading={locationUpdating}
                    disabled={locationUpdating}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {t("BRANCHES_MANAGEMENT_PAGE.FORM.CITY")}
                </p>
                <RHFTextfield
                  name="city"
                  placeholder={t("BRANCHES_MANAGEMENT_PAGE.FORM.CITY")}
                  loading={locationUpdating}
                  disabled={locationUpdating}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {t("BRANCHES_MANAGEMENT_PAGE.FORM.ADDRESS")}
                </p>
                <RHFTextfield
                  name="address"
                  placeholder={t("BRANCHES_MANAGEMENT_PAGE.FORM.ADDRESS")}
                  loading={locationUpdating}
                  disabled={locationUpdating}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">
                  {t("BRANCHES_MANAGEMENT_PAGE.FORM.PHONE")}
                </p>
                <RHFTextfield
                  name="phone"
                  placeholder={t("BRANCHES_MANAGEMENT_PAGE.FORM.PHONE")}
                />
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="font-bold  dark:bg-button-background-hover hover:dark:text-button-color-hover cursor-pointer transition-all transition-300"
            >
              {/* {t("BRANCHES_MANAGEMENT_PAGE.FORM.FORM_TRIGGER")} */}
              {t("BRANCHES_MANAGEMENT_PAGE.FORM.CREATION_TITLE")}
            </Button>
            {/*  */}
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="font-bold  dark:bg-button-background hover:brightness-125 cursor-pointer transition-all transition-300"
              >
                {t("COMMON.CANCEL")}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </Form>
    </DrawerContent>
  );
}
