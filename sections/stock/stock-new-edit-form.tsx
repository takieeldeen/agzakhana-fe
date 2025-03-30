import RHFAutoComplete from "@/components/autocomplete/rhf-autocomplete";
import Form from "@/components/form-provider/form-provider";
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
// import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

export default function StockNewEditForm() {
  const methods = useForm();
  //   const t = useTranslations();
  const onSubmit = async (data: any) => {
    console.log(data);
  };
  return (
    <DrawerContent className="dark:bg-modal-dark-background">
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="font-bold text-xl">
              إضافة منتج جديد
            </DrawerTitle>
            <DrawerDescription>
              من فضلك ادخل البيانات المطلوبة لإضافة المنتج الجديد
            </DrawerDescription>
            <div className="flex flex-col gap-2.5">
              {/* Stack */}
              <div className="flex flex-col gap-3">
                <p>مصدر المنتج</p>
                <div className="flex flex-col gap-2">
                  <RHFRadioButton
                    name="source"
                    value="BRANCH"
                    title="فرع آخر"
                    subtitle="في حالة اختيار فرع آخر سيتم تخصيم الكمية من الفرع المختار"
                    icon="hugeicons:store-add-01"
                  />
                  <RHFRadioButton
                    name="source"
                    value="EXTERNAL"
                    title="مورد خارجي"
                    subtitle="في حالة اختيار مورًد خارجي سيتم إضافة الكمية دون اي تبعات."
                    icon="solar:box-linear"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p>الفرع المورًد</p>
                <div className="flex flex-col gap-2">
                  <RHFAutoComplete
                    name="branch"
                    options={["فرع مدينتي", "فرع الرحاب 1", "فرع السبع عمارات"]}
                    inputProps={{ placeholder: "الفرع المورًد" }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p>الكمية المطلوبة</p>
                <div className="flex flex-col gap-2">
                  <RHFTextfield
                    name="quantity"
                    placeholder="الكمية المطلوبة"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button className="font-bold  dark:bg-button-background-hover hover:dark:text-button-color-hover cursor-pointer transition-all transition-300">
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
