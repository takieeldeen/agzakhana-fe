"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";

interface RHFTextfieldProps extends React.ComponentProps<"input"> {
  name: string;
  label?: string;
  helperText?: string;
  inputProps?: {
    label?: React.ComponentProps<"label">;
    helperText?: React.ComponentProps<"span">;
  };
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  loading?: boolean;
  defaultValue?: string | number;
}

export default function RHFTextfield({
  name,
  className,
  type,
  label,
  helperText,
  inputProps,
  startElement,
  endElement,
  loading = false,
  defaultValue = "",
  ...props
}: RHFTextfieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const hasLabel = !!label;
  const hasError = !!errors?.[name];
  const hasHelperText = !!helperText || hasError;
  return (
    <div className="flex flex-col gap-1">
      {hasLabel && (
        <label
          htmlFor={props?.id ?? name}
          {...inputProps?.label}
          className={cn(
            "font-semibold text-gray-700",
            inputProps?.label?.className
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex flex-row items-center border-input border rounded-md",
          "hover:border-[1px] hover:border-cyan-700",
          "focus-visible:border-[1px] focus-visible:border-cyan-900",
          `${hasError ? "border-red-700 focus-visible:border-red-700" : ""}`
        )}
      >
        {startElement}
        <input
          type={type}
          data-slot="input"
          className={cn(
            " file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0   bg-transparent px-3 py-1 text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
            //   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-[48px]",
            className
          )}
          {...register(name, { value: defaultValue })}
          {...props}
          id={name}
        />
        {loading && (
          <div className="px-2">
            <Icon icon="formkit:spinner" className="animate-spin text-xl" />
          </div>
        )}
        {endElement}
      </div>
      {hasHelperText && (
        <span
          {...inputProps?.helperText}
          className={cn(
            "text-sm font-semibold text-red-600",
            inputProps?.helperText?.className
          )}
        >
          {hasError
            ? (errors?.[name]?.message as string | undefined)
            : helperText}
        </span>
      )}
    </div>
  );
}
