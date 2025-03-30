"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import Confirmation from "./confirmation-dialog";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import { ConfirmationVariantType } from "./types";
import { cn } from "@/lib/utils";

interface ConfirmationDialogProvider {
  children: ReactNode;
}
const ConfirmationContext = createContext<
  { openDialog: Function; closeDialog: Function } | undefined
>(undefined);
export default function ConfirmationDialogProvider({
  children,
}: ConfirmationDialogProvider) {
  // State Management /////////////////////////
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [subtitle, setSubtitle] = useState<string | undefined>(undefined);
  const [variant, setVariant] = useState<ConfirmationVariantType>("CONFIRM");
  // Helper Constants /////////////////////////
  const variants: {
    [key in ConfirmationVariantType]: { icon: string; colors: any };
  } = {
    CONFIRM: {
      icon: "mynaui:question-solid",
      colors: {
        primary: "bg-neon/40",
        secondary: "bg-neon/20",
        button: "bg-neon dark:hover:bg-neon",
        border: "border-neon",
      },
    },
    ALERT: {
      icon: "material-symbols:exclamation-rounded",
      colors: {
        primary: "bg-[#e74c3c]/40",
        secondary: "bg-[#e74c3c]/20",
        button: "bg-[#e74c3c] dark:hover:bg-[#e74c3c]",
        border: "border-[#e74c3c]",
      },
    },
    WARNING: {
      icon: "typcn:warning-outline",
      colors: {
        primary: "bg-[#f1c40f]/40",
        secondary: "bg-[#f1c40f]/20",
        button: "bg-[#f1c40f] dark:hover:bg-[#f1c40f]",
        border: "border-[#f1c40f]",
      },
    },
  };
  // Callbacks /////////////////////////
  const handleCloseConfirmation = useCallback(
    () => setShowConfirmation(false),
    []
  );
  const handleOpenConfirmation = useCallback(
    (
      title?: string,
      subtitle?: string,
      variant: ConfirmationVariantType = "CONFIRM"
    ) => {
      if (title) setTitle(title);
      if (subtitle) setSubtitle(subtitle);
      setVariant(variant);
      setShowConfirmation(true);
    },
    []
  );

  return (
    <ConfirmationContext.Provider
      value={{
        openDialog: handleOpenConfirmation,
        closeDialog: handleCloseConfirmation,
      }}
    >
      {children}
      <Confirmation open={showConfirmation} onClose={handleCloseConfirmation}>
        <Confirmation.Content
          className={cn(
            `p-2 border-t-2  flex flex-col items-center gap-4 pt-8`,
            variants?.[variant]?.colors?.border
          )}
        >
          <div
            className={cn(
              "p-4 rounded-[50%]",
              variants?.[variant]?.colors?.secondary
            )}
          >
            <div
              className={cn(
                `w-24 h-24 rounded-[50%]  flex items-center justify-center`,
                variants?.[variant]?.colors?.primary
              )}
            >
              <Icon
                icon={variants?.[variant]?.icon}
                className="text-white text-[5rem] text-center"
              />
            </div>
          </div>
          <div className="flex flex-col items-center">
            {title && (
              <Confirmation.Title className="text-3xl font-bold ltr:text-center rtl:text-center">
                {title}
              </Confirmation.Title>
            )}
            {subtitle && (
              <Confirmation.Description className="text-sm ltr:text-center rtl:text-center max-w-96">
                {subtitle}
              </Confirmation.Description>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <Button
              className={cn(
                "w-full   hover:brightness-125  transition-all transition-300 cursor-pointer font-bold",
                variants?.[variant]?.colors?.button
              )}
            >
              تأكيد
            </Button>
            {/* <Confirmation. */}
            <Confirmation.Close>
              <Button className="w-full dark:bg-button-background dark:text-white hover:dark:brightness-120  transition-all transition-300 cursor-pointer font-bold">
                إلغاء
              </Button>
            </Confirmation.Close>
          </div>
        </Confirmation.Content>
      </Confirmation>
    </ConfirmationContext.Provider>
  );
}

export function useConfirmDialog() {
  const confirmContext = useContext(ConfirmationContext);
  const confirmDialog = useCallback(
    (
      title?: string,
      subtitle?: string,
      variant: ConfirmationVariantType = "CONFIRM"
    ) => {
      confirmContext?.openDialog(title, subtitle, variant);
    },
    [confirmContext]
  );
  return { confirmDialog };
}
