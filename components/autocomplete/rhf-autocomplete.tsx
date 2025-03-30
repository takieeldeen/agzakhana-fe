import { useFormContext } from "react-hook-form";
import Autocomplete, { AutocompleteProps } from "./autocomplete";
export type RHFAutocompleteProps<T> = {
  name: string;
} & AutocompleteProps<T>;
export default function RHFAutocomplete<T>({ name }: RHFAutocompleteProps<T>) {
  const methods = useFormContext();
  return (
    <Autocomplete
      onAutoCompleteChange={(value) => methods.setValue(name, value)}
    />
  );
}
