import { ComponentProps, ReactNode } from "react";
import { FieldError } from "react-hook-form";

export type TimePickerProps = {
  value?: Date;
  startElement?: ReactNode;
  endElement?: ReactNode;
  loading?: boolean;
  defaultValue?: Date;
  className?: string;
  labelProps?: ComponentProps<"label">;
  label?: string;
  error?: FieldError | undefined;
  onChange?: (date: Date) => void;
} & ComponentProps<"input">;
