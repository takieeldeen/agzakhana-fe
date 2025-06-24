"use client";
import { login } from "@/api/auth";
import { dispatchLogin } from "@/components/store/slices/auth/slice";
import Form from "@/components/form-provider/form-provider";
// import Form from "@/components/form-provider/form-provider";
import RHFTextfield from "@/components/rhf-textfield/rhf-textfield";
import { Button } from "@/components/ui/button";
import { LoginCredentials } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/components/store/store";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { useParams, useRouter } from "next/navigation";

// import { useForm } from "react-hook-form";

export default function AuthLoginPage() {
  // Custom Hooks ////////////////////////////////////////
  const dispatch = useAppDispatch();
  const router = useRouter();
  const authSlice = useAppSelector((state) => state.auth);
  const t = useTranslations();
  const { locale } = useParams();
  // Form Setup ////////////////////////////////////////
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
      .email(
        t("VALIDATIONS.INVALID_FIELD", {
          field: t("LOGIN_PAGE.EMAIL"),
        })
      )
      .required(
        t("VALIDATIONS.REQUIRED_FIELD", {
          field: t("LOGIN_PAGE.EMAIL"),
        })
      ),
    password: Yup.string().required(
      t("VALIDATIONS.REQUIRED_FIELD", {
        field: t("LOGIN_PAGE.PASSWORD"),
      })
    ),
  });
  const defaultValues = {
    email: "takie.eldeen1998@gmail.com",
    password: "6316760de4bb339f",
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
      enqueueSnackbar(t("NOTIFICATIONS.LOGGED_IN_SUCCESS"), {
        variant: "success",
      });
      dispatch(dispatchLogin(res?.data?.user));
      router.push(`/${locale}/portal`);
    } catch (err: any) {
      enqueueSnackbar(err?.message, { variant: "error" });
      // toast(err?.message, {
      //   description: "",
      // });
    }
  };
  useEffect(() => {
    console.log(authSlice);
  }, [authSlice]);
  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      className="p-3 flex flex-col gap-4 items-center "
    >
      <div className="h-full md:w-128 sm:w-full self-center  flex flex-col justify-center p-2">
        <div className="mb-4 flex flex-col gap-3">
          <h2 className="text-5xl font-bold">{t("LOGIN_PAGE.PAGE_TITLE")}</h2>
          <span className="text-gray-800 dark:text-gray-300 text-xl">
            {t("LOGIN_PAGE.PAGE_SUBTITLE")}
          </span>
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <RHFTextfield
            inputProps={{
              label: {
                className: "dark:text-gray-400 mb-1",
              },
            }}
            name="email"
            label={t("LOGIN_PAGE.EMAIL")}
            placeholder={t("LOGIN_PAGE.EMAIL")}
          />
          <RHFTextfield
            inputProps={{
              label: {
                className: "dark:text-gray-400 mb-1",
              },
            }}
            name="password"
            type="password"
            label={t("LOGIN_PAGE.PASSWORD")}
            placeholder={t("LOGIN_PAGE.PASSWORD")}
          />
        </div>
        <Button
          className="py-5.5 bg-neon font-bold  brightness-100 hover:brightness-125 hover:bg-neon transition-all cursor-pointer"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {/* {isSubmitting && <Icon} */}
          {t("LOGIN_PAGE.LOGIN_BUTTON")}
        </Button>
      </div>
      <Link href="/" className="text-gray-200 hover:underline transition-all">
        {t("LOGIN_PAGE.FORGOT_PASSWORD")}
      </Link>
    </Form>
  );
}
