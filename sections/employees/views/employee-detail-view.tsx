import { useTranslations } from "next-intl";

export default function EmployeeDetailView({ employee }: { employee: any }) {
  const t = useTranslations();
  return (
    <div>
      <div>
        <h3>
          {t("USER_MANAGEMENT_PAGE.EMPLOYEE_DETAILS", { user: employee?.name })}
        </h3>
      </div>
    </div>
  );
}
