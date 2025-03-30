"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "../store/store";
import { useEffect } from "react";

interface AuthorizePageProps {
  children: React.ReactNode;
  visibleFor?: "GUEST-ONLY" | "FREE-FOR-ALL" | "USER-ONLY";
}
export default function AuthorizePage({
  children,
  visibleFor = "USER-ONLY",
}: AuthorizePageProps) {
  // Custom Hooks ///////////////////////////////////////
  const user = useAppSelector((state) => state?.auth?.user);
  const router = useRouter();
  // Helper Constants ///////////////////////////////////////
  const isAuthenticated = !!user;
  // Navigation Logic ///////////////////////////////////////
  useEffect(() => {
    if (visibleFor === "GUEST-ONLY" && isAuthenticated) {
      router.replace("/");
    } else if (visibleFor === "USER-ONLY" && !isAuthenticated) {
      router.replace("/portal/auth/login");
    }
  }, [visibleFor, isAuthenticated, router]);

  // Render Logic ///////////////////////////////////////
  if (visibleFor === "FREE-FOR-ALL") {
    return <>{children}</>;
  }

  if (visibleFor === "GUEST-ONLY" && !isAuthenticated) {
    return <>{children}</>;
  }

  if (visibleFor === "USER-ONLY" && isAuthenticated) {
    return <>{children}</>;
  }

  // Default return (loading state or null)
  return null;
}
