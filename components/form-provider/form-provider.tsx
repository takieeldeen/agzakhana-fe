"use client";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

interface FormProps {
  children: React.ReactNode;
  methods: UseFormReturn<any, unknown, undefined>;
  onSubmit: SubmitHandler<any>;
  [key: string]: unknown;
}

export default function Form({
  children,
  methods,
  onSubmit,
  ...other
}: FormProps) {
  return (
    <FormProvider {...methods}>
      <form {...other} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
