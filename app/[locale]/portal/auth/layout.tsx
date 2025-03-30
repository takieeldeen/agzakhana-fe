import Image from "next/image";
import { ReactNode } from "react";
import { AUTH_LAYOUT_IMG } from "@/assets/images";
interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-white h-screen grid md:grid-cols-2 xs:grid-cols-1">
      {children}
      <div className="flex items-center justify-center p-2">
        <div className="h-full w-full " style={{ borderRadius: "10px" }}>
          <Image
            alt="pharmacy"
            src={AUTH_LAYOUT_IMG}
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
      </div>
    </main>
  );
}
