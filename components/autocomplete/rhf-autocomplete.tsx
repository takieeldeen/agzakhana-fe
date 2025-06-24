import { useFormContext } from "react-hook-form";
import Autocomplete, { AutocompleteProps } from "./autocomplete";
export type RHFAutocompleteProps<T> = {
  name: string;
  onChange?: (value: T | null) => void;
} & Omit<AutocompleteProps<T>, "onAutoCompleteChange">;
export default function RHFAutocomplete<T>({
  name,
  onChange,
  ...props
}: RHFAutocompleteProps<T>) {
  const methods = useFormContext();
  return (
    <Autocomplete
      onAutoCompleteChange={(value) =>
        onChange ? onChange(value) : methods.setValue(name, value)
      }
      {...props}
    />
  );
}
