import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { ComponentProps, useEffect, useId, useState } from "react";
import { useFormContext } from "react-hook-form";

interface RHFPhotoInputProps {
  name: string;
  inputProps?: ComponentProps<"input">;
  helperTextProps?: ComponentProps<"span">;
  helperText?: string;
}
export default function RHFPhotoInput({
  name,
  inputProps,
  helperTextProps,
  helperText,
}: RHFPhotoInputProps) {
  // State Management ///////////////////////////////////////////////
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputId = useId();
  // Custom Hooks ///////////////////////////////////////////////
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Helper Constants ///////////////////////////////////////////////
  const fileInput = watch(name)?.[0]; // Get first selected file
  const hasError = !!errors?.[name];
  const hasHelperText = !!helperText || hasError;
  useEffect(() => {
    if (!fileInput) return;
    // Create a preview URL for the image
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(fileInput);
    // Cleanup to avoid memory leaks
    return () => {
      fileReader.abort();
    };
  }, [fileInput]);
  return (
    <>
      <div className="flex items-center justify-center relative mb-4 ">
        <div className="h-48 w-48 rounded-full border-[1px] border-[rgba(28, 43, 51, 1)] bg-placeholder-dark border-dashed flex items-center justify-center relative ">
          {!previewUrl && (
            <Icon
              icon="streamline:user-profile-focus"
              className=" h-24 w-24  text-modal-dark"
            />
          )}
          {previewUrl && (
            <label
              htmlFor={inputId}
              className="h-full w-full rounded-full overflow-hidden relative"
            >
              <Image src={previewUrl} alt={name} fill />
            </label>
          )}

          <label
            htmlFor={inputProps?.id ?? inputId}
            className="absolute bottom-4 rtl:left-4 ltr:right-4 bg-button-background-hover text-button-background rounded-full w-6 h-6 flex items-center justify-center cursor-pointer text-2xl transition-all transition-300 hover:brightness-75 -translate-x-0.5 -translate-y-0.5 drop-shadow-lg"
            onClick={(e) => {
              if (fileInput) {
                e.preventDefault();
                setValue(name, null);
                setPreviewUrl(null);
              }
            }}
          >
            <Icon
              icon={fileInput ? "iconamoon:trash-thin" : "lets-icons:add-round"}
            />
          </label>
        </div>
      </div>
      {hasHelperText && (
        <span
          {...helperTextProps}
          className={cn(
            "text-sm font-semibold text-red-600",
            helperTextProps?.className
          )}
        >
          {hasError
            ? (errors?.[name]?.message as string | undefined)
            : helperText}
        </span>
      )}
      <input
        id={inputId}
        {...inputProps}
        type="file"
        accept="image/*"
        {...register(name)}
        className="hidden"
      />
    </>
  );
}
