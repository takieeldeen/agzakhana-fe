import { ComponentProps, ReactNode } from "react";

export type TimePickerProps = {
  value?: Date;
  startElement?: ReactNode;
  endElement?: ReactNode;
  loading?: boolean;
  defaultValue?: Date;
  className?: string;
  labelProps?: ComponentProps<"label">;
  label?: string;
  onChange?: (date: Date) => void;
} & ComponentProps<"input">;
