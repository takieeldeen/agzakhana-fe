"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export default function AccountPopover() {
  const theme = useTheme();
  return (
    <Button
      onClick={() => theme.setTheme(theme.theme === "dark" ? "light" : "dark")}
    >
      S
    </Button>
  );
}
