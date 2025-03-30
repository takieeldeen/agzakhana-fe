// import AuthorizePage from "@/components/auth-provider/auth-provider";

import NavBar from "@/components/nav-bar/nav-bar";

interface PortalLayoutProps {
  children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    // <AuthorizePage>
    <main className="flex flex-row h-screen overflow-y-scroll overflow-x-hidden dark:bg-[rgb(20,28,31)]">
      <NavBar />
      <div className="p-4 rtl:pl-0 ltr:pr-0 w-full h-[90dvh]">{children}</div>
    </main>
    // </AuthorizePage>
  );
}
