import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface RHFTagProps {
  name: string;
  value: string;
  children: React.ReactNode;
  other?: React.ComponentProps<"button">;
}

export default function RHFTag({
  name,
  value,
  children,
  ...other
}: RHFTagProps) {
  const { setValue, watch } = useFormContext();
  const values = watch();
  return (
    <Button
      {...other}
      className={cn(
        "bg-transparent hover:bg-transparent cursor-pointer transition-all text-white border-gray-600 hover:border-gray-200 border-[1px] flex flex-row justify-between items-center px-2",
        values?.[name] === value ? "border-white" : "",
        (other as any)?.className
      )}
      onClick={(e) => {
        e.preventDefault();
        setValue(name, value, { shouldDirty: true, shouldValidate: true });
      }}
      type="button"
    >
      {children}
    </Button>
  );
}
