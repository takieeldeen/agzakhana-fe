import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface RHFRadioButtonProps {
  name: string;
  value: any;
  title?: string;
  subtitle?: string;
  icon?: ReactNode | string;
}
export default function RHFRadioButton({
  name,
  value,
  title,
  subtitle,
  icon,
}: RHFRadioButtonProps) {
  const { register, watch } = useFormContext();
  const values = watch();
  return (
    <div className="group w-full">
      <label htmlFor={`${name}-${value}` as any}>
        <div
          className={cn(
            "border-[1px] border-gray-800  transition-all transition-300 rounded-md p-2 flex flex-row items-center gap-2 cursor-pointer",
            values?.[name] === value
              ? "border-neon"
              : "group-hover:border-white"
          )}
        >
          {!!icon && typeof icon === "string" && (
            <Icon
              icon={icon}
              className={cn(
                "text-3xl text-gray-400  transition-300",
                values?.[name] === value
                  ? "text-neon"
                  : "group-hover:text-white"
              )}
            />
          )}
          {!!icon && typeof icon === "object" && icon}
          <div className="flex flex-col">
            {!!title && <p className="font-semibold">{title}</p>}
            {!!subtitle && (
              <p className="text-sm dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>
      </label>
      <input
        className="hidden"
        type="radio"
        id={`${name}-${value}` as any}
        {...register(name)}
        value={value}
      />
    </div>
  );
}
