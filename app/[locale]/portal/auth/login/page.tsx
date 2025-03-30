"use client";
import { login } from "@/api/auth";
import { dispatchLogin } from "@/components/store/slices/auth/slice";
import Form from "@/components/form-provider/form-provider";
// import Form from "@/components/form-provider/form-provider";
import Logo from "@/components/logo/logo";
import RHFTextfield from "@/components/rhf-textfield/rhf-textfield";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { LoginCredentials } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/components/store/store";

// import { useForm } from "react-hook-form";

export default function AuthLoginPage() {
  // Custom Hooks ////////////////////////////////////////
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  // Form Setup ////////////////////////////////////////
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please Enter a Valid Email Format")
      .required("Please Enter your email"),
    password: Yup.string().required("Please Enter your password"),
  });
  const defaultValues = {
    email: "",
    password: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginFormSchema),
  });
  const {
    formState: { isSubmitting },
  } = methods;

  // Callbacks ////////////////////////////////////////
  const onSubmit = async (data: LoginCredentials) => {
    try {
      const res = await login(data);
      dispatch(dispatchLogin(res?.data?.user));
    } catch (err: any) {
      toast.error(err?.message);
      // toast(err?.message, {
      //   description: "",
      // });
    }
  };
  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      className="p-3 flex flex-col gap-2"
    >
      <p>{user?._id ?? "--"}</p>
      <Logo />
      <div className="h-full md:w-128 sm:w-full self-center  flex flex-col justify-center p-2">
        <div className="mb-4">
          <h5 className="text-4xl font-semibold">Sign in</h5>
          <span className="text-gray-800 text-sm ">
            Please Enter your credentials to login to your account
          </span>
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <RHFTextfield
            name="email"
            label="Email Address"
            placeholder="Email Address"
          />
          <RHFTextfield
            name="password"
            type="password"
            label="Password"
            placeholder="password"
          />
        </div>
        <Button
          className="py-5.5 bg-teal-900 transition-all hover:bg-teal-800 cursor-pointer"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {/* {isSubmitting && <Icon} */}
          Log In
        </Button>
        <Toaster />
      </div>
    </Form>
  );
}
