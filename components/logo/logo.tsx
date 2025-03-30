"use client";
import {
  LOGO,
  LOGO_DARK,
  LOGO_DARK_MINI,
  LOGO_LIGHT_MINI,
} from "@/assets/images";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Logo({ mini }: { mini?: boolean }) {
  const [currentLogo, setCurrentLogo] = useState<typeof LOGO | null>(null);

  const theme = useTheme();

  useEffect(() => {
    if (theme.theme === "light" && !mini) setCurrentLogo(LOGO);
    if (theme.theme === "dark" && !mini) setCurrentLogo(LOGO_DARK);
    if (theme.theme === "light" && mini) setCurrentLogo(LOGO_LIGHT_MINI);
    if (theme.theme === "dark" && mini) setCurrentLogo(LOGO_DARK_MINI);
  }, [mini, theme.theme]);
  if (!currentLogo!) return <></>;
  return (
    <div className="">
      <Image alt="agzakhana" src={currentLogo} height={90} priority />
    </div>
  );
}
