import { useGetPharmacyLocation } from "@/api/branches";
import { useInviteEmployee } from "@/api/employees";
import Form from "@/components/form-provider/form-provider";
import RHFPhotoInput from "@/components/rhf-photo-input/rhf-photo-input";
import RHFRadioButton from "@/components/rhf-radio/rhf-radio";
import RHFTextfield from "@/components/rhf-textfield/rhf-textfield";
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
import { useForm } from "react-hook-form";
import * as Yup from "yup";

type NewEditFormProps = {
  onClose: VoidFunction;
};
export default function NewEditForm({ onClose }: NewEditFormProps) {
  const t = useTranslations();
  const { locale } = useParams();
  const tValidation = useTranslations("VALIDATIONS");
  const { inviteEmployee } = useInviteEmployee();
  // const {toast} = useToast()
  const branchesFormSchema = Yup.object().shape({
    name: Yup.string().required(tValidation("REQUIRED")),
    email: Yup.string()
      .email(tValidation("INVALID_EMAIL"))
      .required(tValidation("REQUIRED")),
    phone: Yup.string().required(tValidation("REQUIRED")),
    imageUrl: Yup.string(),
    googleLink: Yup.string().url(),
    city: Yup.string(),
    lat: Yup.number(),
    lng: Yup.number(),
    address: Yup.string(),
    gender: Yup.string().required(),
  });
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    imageUrl: "",
    googleLink: "",
    city: "",
    lat: 0,
    lng: 0,
    address: "",
    gender: "MALE",
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
    useDebounce(values?.googleLink)
  );
  const onSubmit = async (data: any) => {
    try {
      if (data?._reactName) return;
      data.imageUrl = values?.imageUrl?.[0];
      await inviteEmployee(data).then(() => {
        onClose();
      });
    } catch {}
  };
  // LifeCycle events ////////////////////////////////////
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
              {t("USER_MANAGEMENT_PAGE.FORM.CREATION_TITLE")}
            </DrawerTitle>
            <DrawerDescription>
              {t("USER_MANAGEMENT_PAGE.FORM.CREATION_SUBTITLE")}
            </DrawerDescription>
            <div className="flex flex-col gap-3.5">
              {/* Stack */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  {t("USER_MANAGEMENT_PAGE.FORM.EMPLOYEE_IMG")}
                </p>
                <RHFPhotoInput name="imageUrl" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  {t("USER_MANAGEMENT_PAGE.FORM.EMPLOYEE_NAME")}
                </p>
                <RHFTextfield
                  name="name"
                  placeholder={t("USER_MANAGEMENT_PAGE.FORM.EMPLOYEE_NAME")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  {t("USER_MANAGEMENT_PAGE.FORM.EMPLOYEE_EMAIL")}
                </p>
                <RHFTextfield
                  name="email"
                  placeholder={t("USER_MANAGEMENT_PAGE.FORM.EMPLOYEE_EMAIL")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  {t("USER_MANAGEMENT_PAGE.FORM.EMPLOYEE_PHONE")}
                </p>
                <RHFTextfield
                  name="phone"
                  placeholder={t("USER_MANAGEMENT_PAGE.FORM.EMPLOYEE_PHONE")}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p>{t("USER_MANAGEMENT_PAGE.FORM.EMPLOYEE_GENDER")}</p>
                <div className="flex justify-stretch gap-2">
                  <RHFRadioButton
                    name="gender"
                    value="MALE"
                    title={t("USER_MANAGEMENT_PAGE.FORM.MALE")}
                    icon="material-symbols:male"
                  />
                  <RHFRadioButton
                    name="gender"
                    value="FEMALE"
                    title={t("USER_MANAGEMENT_PAGE.FORM.FEMALE")}
                    icon="material-symbols:female"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">
                  {t("BRANCHES_MANAGEMENT_PAGE.FORM.GOOGLE_MAP_LINK")}
                </p>
                <RHFTextfield
                  name="googleLink"
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
                    setValue("googleLink", val);
                  }}
                />
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-full">
                  <p className="font-semibold">
                    {t("BRANCHES_MANAGEMENT_PAGE.FORM.LAT")}
                  </p>
                  <RHFTextfield
                    name="lat"
                    placeholder={t("BRANCHES_MANAGEMENT_PAGE.FORM.LAT")}
                    loading={locationUpdating}
                    disabled={locationUpdating}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
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
              <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
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
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={onSubmit}
              isLoading={isSubmitting}
              className="font-bold  dark:bg-button-background-hover hover:dark:text-button-color-hover cursor-pointer transition-all transition-300"
            >
              {t("USER_MANAGEMENT_PAGE.FORM.ADD")}
            </Button>
            {/*  */}
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="font-bold  dark:bg-button-background hover:brightness-125 cursor-pointer transition-all transition-300"
                onClick={onClose}
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
