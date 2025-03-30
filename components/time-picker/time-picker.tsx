import { useCallback, useEffect, useId, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { getDate } from "./api";
import { TimePickerProps } from "./types";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function TimePicker({
  value = new Date() as any,
  startElement = (
    <div className="rtl:pr-2 ltr:pl-2">
      <Icon icon="flowbite:clock-outline" className="text-xl" />
    </div>
  ),
  endElement,
  loading = false,
  className,
  label,
  labelProps,
  onChange,
  ...other
}: TimePickerProps) {
  // State Management //////////////////////////////
  const id = useId();
  const [date, setDate] = useState<Date>(value ?? new Date());
  const currentDate = value ?? date;
  const handleChange = useCallback(
    (newVal: Date) => {
      if (onChange) {
        onChange(newVal);
        return;
      }
      setDate(newVal);
    },
    [onChange]
  );
  //   Helper Constants ///////////////////////////////
  const minutesArray = Array?.from({ length: 12 }, (_, i) => i * 5);
  const hoursArray = Array?.from({ length: 11 }, (_, i) => i + 1);
  const ampmArray: ("AM" | "PM")[] = ["AM", "PM"];
  const formattedHourString = new Date(currentDate)?.toLocaleTimeString(
    "ar-EG",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
  useEffect(() => {
    setDate(value ?? new Date());
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col gap-1 ">
          {!!label && (
            <label
              htmlFor={id}
              {...labelProps}
              className={cn(
                "font-semibold text-gray-700 self-start dark:text-gray-200",
                labelProps?.className
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
              className
              // `${hasError ? "border-red-700 focus-visible:border-red-700" : ""}`
            )}
          >
            {startElement}
            <input
              type="date"
              value={currentDate}
              className="hidden"
              {...other}
            />
            <input
              value={formattedHourString}
              data-slot="input"
              className={cn(
                " file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0   bg-transparent px-3 py-1 text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
                //   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-[48px]"
              )}
              id={id}
            />
            {loading && (
              <div className="px-2">
                <Icon icon="formkit:spinner" className="animate-spin text-xl" />
              </div>
            )}
            {endElement}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit  bg-modal-dark p-2">
        <div className="flex rtl:flex-row ltr:flex-row-reverse w-fit gap-2">
          <ScrollArea className="h-64">
            <ul className="mr-2">
              {minutesArray?.map((min) => (
                <li
                  key={min}
                  className={cn(
                    "px-4 text-center py-1 cursor-pointer dark:bg-modal-dark transition-all transition-300 rounded-md hover:brightness-125 text-lg font-semibold select-none",
                    getDate(
                      "minutes",
                      min,
                      value ?? currentDate
                    ).getMinutes() === currentDate?.getMinutes()
                      ? "dark:bg-neon dark:text-modal-dark"
                      : ""
                  )}
                  onClick={() =>
                    handleChange(getDate("minutes", min, value ?? currentDate))
                  }
                >
                  {min}
                </li>
              ))}
            </ul>
          </ScrollArea>
          <ScrollArea className="h-64">
            <ul className="mr-2">
              {hoursArray?.map((hour) => (
                <li
                  key={hour}
                  className={cn(
                    "px-4 text-center py-1 cursor-pointer dark:bg-modal-dark transition-all transition-300 rounded-md hover:brightness-125 text-lg font-semibold select-none",
                    getDate("hours", hour, value ?? currentDate).getHours() ===
                      currentDate?.getHours()
                      ? "dark:bg-neon dark:text-modal-dark"
                      : ""
                  )}
                  onClick={() =>
                    handleChange(getDate("hours", hour, value ?? currentDate))
                  }
                >
                  {hour}
                </li>
              ))}
            </ul>
          </ScrollArea>
          <ScrollArea className="h-64">
            <ul className="mr-2">
              {ampmArray?.map((ampm) => (
                <li
                  key={ampm}
                  className={cn(
                    "px-4 text-center py-1 cursor-pointer dark:bg-modal-dark transition-all transition-300 rounded-md hover:brightness-125 text-lg font-semibold select-none",
                    getDate("ampm", ampm, value ?? currentDate).getHours() -
                      currentDate?.getHours() ===
                      0
                      ? "dark:bg-neon dark:text-modal-dark"
                      : ""
                  )}
                  onClick={() =>
                    handleChange(getDate("ampm", ampm, value ?? currentDate))
                  }
                >
                  {ampm}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
