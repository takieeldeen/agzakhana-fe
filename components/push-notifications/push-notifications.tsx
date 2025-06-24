import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";

export default function PushNotifications() {
  const t = useTranslations();
  return (
    <div className="absolute bottom-0 left-0 rtl:rounded-l-md  ltr:rounded-r-md box-shadow-2xl dark:bg-table-row-bg  min-w-96 min-h-16 flex flex-row  gap-2">
      <p className=" w-1 bg-green-500 rtl:rounded-l-xl" />
      <div className="flex flex-row items-center gap-2">
        <div className="text-3xl ">
          <Icon icon="material-symbols:check-rounded" />
        </div>
        <div className="py-2 flex justify-center items-start text-base px-1 flex-col ">
          <p className="font-semibold text-lg">{t("COMMON.SUCCESS_PROCESS")}</p>
          <p className="font-semibold text-md text-gray-400">
            تم حذف بيانات الموظف بنجاح من قاعدة البيانات
          </p>
        </div>
        <div className=" dark:text-gray-300 hover:bg-transparent self-start cursor-pointer p-2  rtl:ml-2 ltr:mr-2 mt-1 text-xl transition-all transition-300 hover:text-white hover:scale-120">
          <Icon icon="material-symbols:close-rounded" className="" />
        </div>
      </div>
    </div>
  );
}
