import { LOGO_DARK } from "@/assets/images";
import { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  const t = useTranslations();
  return (
    <main className="bg-white dark:bg-[rgb(11,14,19)]  h-screen w-screen flex  justify-center">
      <section className="w-1/2 h-full  p-4">
        <div className="bg-[rgb(19,23,32)] rounded-2xl h-full flex items-center justify-center">
          {children}
        </div>
      </section>
      <div className="w-1/2 h-full flex items-center justify-center flex-col gap-4">
        <Image alt="agzakhana" src={LOGO_DARK} height={196} priority />
        <div className="flex flex-col gap-1 ">
          <h1 className="text-3xl font-semibold">
            {t("LOGIN_PAGE.SLOGAN_TITLE")}
          </h1>
          <p className="text-xl font-light dark:text-gray-300">
            {t("LOGIN_PAGE.SLOGAN_SUBTITLE")}
          </p>
        </div>
      </div>
    </main>
  );
}
