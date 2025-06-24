// import AuthorizePage from "@/components/auth-provider/auth-provider";

import NavBar from "@/components/nav-bar/nav-bar";
import PortalHeader from "@/components/portal-header/portal-header";

interface PortalLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function PortalLayout({ children, modal }: PortalLayoutProps) {
  return (
    // <AuthorizePage>
    <main className="flex flex-row h-screen overflow-y-scroll overflow-x-hidden dark:bg-[rgb(20,28,31)]">
      <NavBar />
      <div className=" w-full h-[90dvh]">
        <PortalHeader />
        <div className="p-4 rtl:pl-0 ltr:pr-0">{children}</div>
      </div>
      {modal}
    </main>
    // </AuthorizePage>
  );
}
