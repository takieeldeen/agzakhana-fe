"use client";
import { Controller, useFormContext } from "react-hook-form";
import { TimePickerProps } from "../time-picker/types";
import TimePicker from "../time-picker/time-picker";

export type RHFTimepickerProps = {
  name: string;
} & TimePickerProps;
export default function RHFTimepicker({ name }: RHFTimepickerProps) {
  const methods = useFormContext();
  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field }) => (
        <TimePicker
          onChange={(value) => field.onChange(value)}
          value={field.value}
        />
      )}
    />
  );
}
