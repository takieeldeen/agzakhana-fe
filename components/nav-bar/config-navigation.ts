import { useTranslations } from "next-intl";

const useGetConfigNavigation = () => {
  const t = useTranslations("NAV_BAR");
  const configNavigation = [
    {
      name: t("HOME"),
      icon: "mynaui:home",
      path: "/",
    },
    {
      name: t("STOCK"),
      icon: "bi:boxes",
      path: "stock",
      children: [
        {
          name: "Logs",
          icon: "ep:list",
          path: "logs",
        },
        {
          name: "Requests",
          icon: "ep:list",
          path: "requests",
        },
      ],
    },
    {
      name: t("BRANCHES"),
      icon: "solar:city-linear",
      path: "branches",
    },
    {
      name: t("EMPLOYEES"),
      icon: "ph:users-light",
      path: "employees",
    },
  ];
  return { configNavigation };
};
export default useGetConfigNavigation;
