import { ComponentProps, Dispatch, ReactNode, SetStateAction } from "react";

export interface ConfirmationContextProps {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  openDialog: VoidFunction;
  closeDialog: VoidFunction;
  toggleDialog: VoidFunction;
}

export interface ConfirmationTitleProps extends ComponentProps<"p"> {
  children: ReactNode;
}
export interface ConfirmationContentProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export type ConfirmationVariantType = "CONFIRM" | "ALERT" | "WARNING";
