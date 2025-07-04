import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useTranslations } from "next-intl";

export interface AutocompletePropsApi<T> {
  getOptionLabel?: (option: T | null) => string;
  getOptionId?: (option: T) => string | number;
  isOptionEqualToValue?: (option: T, value: T | null) => boolean;
  isOptionSelected?: (option: T, value: T | T[] | null) => boolean;
}

export interface AutocompleteProps<T> {
  inputProps?: React.ComponentProps<"input">;
  itemProps?: React.ComponentProps<"li">;
  options?: T[];
  allowFiltering?: boolean;
  api?: AutocompletePropsApi<T>;
  onAutoCompleteChange?: (value: T | null) => void;
  placeholder?: string;
}

export default function Autocomplete<T>({
  inputProps,
  itemProps,
  options = [],
  allowFiltering = true,
  api,
  onAutoCompleteChange,
  placeholder,
}: AutocompleteProps<T>) {
  // State Management ////////////////////////////////////////
  const [filteredOptions, setFilteredOptions] = useState<T[]>(options);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [optionsOpened, setOptionsOpened] = useState<boolean>(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
    null
  );
  const [value, setValue] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  // Custom Hooks ///////////////////////////////////////////
  const t = useTranslations("COMMON");
  const {
    getOptionId,
    getOptionLabel,
    isOptionSelected,
    isOptionEqualToValue,
  } = useAutocomplete<T>({
    getOptionLabel: api?.getOptionLabel,
    getOptionId: api?.getOptionId,
    isOptionEqualToValue: api?.isOptionEqualToValue,
  });
  // DOM Manipulation ///////////////////////////////////////////
  const inputRef = useRef<HTMLInputElement | null>(null);
  const optionRefs = useRef<any>([]);
  // Callbacks ///////////////////////////////////////////
  const handleInputFocus = useCallback(() => {
    if (inputRef) inputRef?.current?.focus();
  }, []);
  const handleAutocompleteBlur = useCallback(() => {
    setInputValue(value ? getOptionLabel(value) : "");
  }, [getOptionLabel, value]);
  const filterOptions = useCallback(
    (currentValue: string) => {
      if (!currentValue) currentValue = "";
      // NonOverridable Changes
      if (!allowFiltering) return;

      if (!isSearching)
        setFilteredOptions(
          options?.filter((option) => !isOptionSelected(option, value))
        );
      // Overridable Changes

      if (isSearching)
        setFilteredOptions(
          options?.filter(
            (option) =>
              getOptionLabel(option)
                ?.toLowerCase()
                ?.includes(currentValue?.toLowerCase()) &&
              !isOptionSelected(option, value)
          )
        );
    },
    [
      allowFiltering,
      getOptionLabel,
      isOptionSelected,
      isSearching,
      options,
      value,
    ]
  );
  const handlePopoverToggle = useCallback(
    (newState: boolean) => {
      setIsSearching(false);
      setFocusedOptionIndex(
        value
          ? filteredOptions.findIndex((option) =>
              isOptionEqualToValue(option, value)
            )
          : null
      );
      setOptionsOpened(newState);
      handleAutocompleteBlur();
      filterOptions(inputValue);
    },
    [
      filterOptions,
      filteredOptions,
      handleAutocompleteBlur,
      inputValue,
      isOptionEqualToValue,
      value,
    ]
  );
  const handleChange = useCallback(
    (newValue: T | null, closePortal: boolean = true) => {
      // NonOverridable Changes
      if (closePortal) handlePopoverToggle(false);
      handleInputFocus();
      filterOptions(getOptionLabel(newValue));
      // Overridable Changes
      if (onAutoCompleteChange) onAutoCompleteChange(newValue);
      setValue(newValue);
      setInputValue(getOptionLabel(newValue));
    },
    [
      filterOptions,
      getOptionLabel,
      handleInputFocus,
      handlePopoverToggle,
      onAutoCompleteChange,
    ]
  );

  const onInputBlur = useCallback(() => {
    setInputFocused(false);
    handleAutocompleteBlur();
  }, [handleAutocompleteBlur]);
  const handleOptionsNavigation = useCallback(
    (payload: 1 | -1) => {
      setFocusedOptionIndex((prevFocusedOptionIndex) => {
        if (filteredOptions?.length === 0) return prevFocusedOptionIndex;
        const temp =
          prevFocusedOptionIndex === null
            ? payload === 1
              ? filteredOptions?.length - 1
              : 0
            : prevFocusedOptionIndex;
        const nextFocusedOptionIndex = temp + payload;
        if (nextFocusedOptionIndex > filteredOptions?.length - 1) return 0;
        if (nextFocusedOptionIndex < 0) return filteredOptions?.length - 1;
        return nextFocusedOptionIndex;
      });
    },
    [filteredOptions?.length]
  );
  const handleArrowNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && optionsOpened) handleOptionsNavigation(1);
      if (e.key === "ArrowUp" && optionsOpened) handleOptionsNavigation(-1);
    },
    [handleOptionsNavigation, optionsOpened]
  );
  const handleKeyboardSelection = useCallback(
    (e: KeyboardEvent) => {
      if (optionsOpened && focusedOptionIndex !== null && e.key === "Enter") {
        handleChange(filteredOptions?.[focusedOptionIndex]);
      }
    },
    [filteredOptions, focusedOptionIndex, handleChange, optionsOpened]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // Non-OverridableValues
      handlePopoverToggle(true);
      setIsSearching(true);
      filterOptions(e?.target?.value);
      // Non-OverridableValues
      setInputValue(e?.target?.value);
      if (e?.target?.value === "") handleChange(null, false);
      if (inputProps?.onChange) inputProps.onChange(e);
    },
    [filterOptions, handleChange, handlePopoverToggle, inputProps]
  );

  // Component LifeCycle /////////////////////////////////////////
  useEffect(() => {
    document.addEventListener("keydown", handleArrowNavigation);
    return () => document.removeEventListener("keydown", handleArrowNavigation);
  }, [handleArrowNavigation]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardSelection);
    return () =>
      document.removeEventListener("keydown", handleKeyboardSelection);
  }, [handleKeyboardSelection]);
  //   useLayoutEffect(() => {
  //     if (focusedOptionIndex !== null && optionRefs.current[focusedOptionIndex]) {
  //       setTimeout(() => {
  //         optionRefs?.current?.[focusedOptionIndex]?.focus();
  //       }, 0);
  //     }
  //   }, [focusedOptionIndex, optionsOpened]);
  return (
    // Input Wrapper
    <div
      className={cn(
        "flex flex-row hover:border-blue-400 transition-all transition-300 border-[1px] rounded-md h-[48px] items-center group/wrapper",
        inputFocused && "border-blue-500"
      )}
    >
      <Popover onOpenChange={handlePopoverToggle} open={optionsOpened}>
        <PopoverTrigger asChild>
          <div className="flex items-center w-full ltr:pr-2 rtl:pl-2 group">
            <input
              data-slot="input"
              className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md  bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:group/wrapper:bg-red-500",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                " h-full w-full",
                inputProps?.className
              )}
              {...inputProps}
              value={inputValue}
              onBlur={onInputBlur}
              onFocus={() => setInputFocused(true)}
              ref={inputRef}
              onChange={handleInputChange}
              placeholder={placeholder}
            />
            {value && (
              <Icon
                icon="material-symbols:close-rounded"
                className={cn(
                  "bg-inherit p-0 m-0 cursor-pointer  transition-all  rounded-[50%] aspect-square w-5 h-5 hidden group-hover:flex items-center justify-center hover:bg-gray-700/30"
                )}
                onClick={() => handleChange(null)}
              />
            )}
            <Icon
              icon={"line-md:chevron-down"}
              className={cn(
                "cursor-pointer hover:bg-gray-700/30 p-1 rounded-full w-6 h-6 transition-all transition-300 aspect-square",
                optionsOpened && "rotate-180"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={12}
          className="w-[var(--radix-popover-trigger-width)] p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
          asChild
        >
          <ul className="dark:bg-autocomplete-options-dark-background px-2 py-1 flex flex-col gap-1.5">
            {!filteredOptions?.length && (
              <li
                className={cn(
                  "py-2 px-2 bg-inherit rounded-md hover:brightness-125 transition-all transition-300 focus:border-0 focus:outline-0",
                  itemProps?.className
                )}
              >
                {t("NO_RESULTS")}
              </li>
            )}
            {filteredOptions?.map((option, index) => (
              <li
                key={getOptionId(option)}
                tabIndex={0}
                ref={(element) => {
                  if (element) {
                    optionRefs.current[index] = element; // Assign ref to each <li>
                  }
                }} // Assign ref to each <li>
                {...itemProps}
                onClick={() => {
                  handleChange(option);
                }}
                className={cn(
                  "py-2 px-2 bg-inherit rounded-md hover:brightness-125 transition-all transition-300 cursor-pointer focus:border-0 focus:outline-0",
                  focusedOptionIndex === index && "brightness-125",
                  itemProps?.className
                )}
              >
                {getOptionLabel(option)}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function useAutocomplete<T>({
  getOptionLabel,
  getOptionId,
  isOptionEqualToValue,
  isOptionSelected,
}: AutocompletePropsApi<T>) {
  const finalGetOptionId =
    getOptionId ?? ((option: T) => option as string | number);
  const finalGetOptionLabel =
    getOptionLabel ??
    ((option: T | null) =>
      typeof option === "string" ? (option as string) ?? "" : "");
  const finalIsOptionEqualToValue =
    isOptionEqualToValue ??
    ((option: T, value: T | null): boolean => option === value);
  const finalIsOptionSelected =
    isOptionSelected ??
    ((option: T, value: T | T[] | null): boolean =>
      Array.isArray(value)
        ? !!value?.find((val) => finalIsOptionEqualToValue(option, val))
        : finalIsOptionEqualToValue(option, value));
  return {
    getOptionId: finalGetOptionId,
    getOptionLabel: finalGetOptionLabel,
    isOptionEqualToValue: finalIsOptionEqualToValue,
    isOptionSelected: finalIsOptionSelected,
  };
}
