/* eslint-disable react/display-name */
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "next/navigation";
import {
  SnackbarContent,
  CustomContentProps,
  closeSnackbar,
  SnackbarKey,
  SnackbarMessage,
} from "notistack";
import React from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

declare module "notistack" {
  interface VariantOverrides {
    // removes the `warning` variant
    //   warning: false;
    // adds `myCustomVariant` variant
    myCustomVariant: true;
    // adds `reportComplete` variant and specifies the
    // "extra" props it takes in options of `enqueueSnackbar`
    // reportComplete: {
    //   allowDownload: boolean;
    // };
  }
}

type SnackbarVariant = "error" | "success" | "info" | "warning" | "default";
type SnackbarVariantProps = {
  styles: string;
  title: string;
  icon: {
    icon: string;
    styles: string;
  };
};
interface ReportCompleteProps extends CustomContentProps {
  allowDownload: boolean;
}

const SnackbarSuccess = React.forwardRef<HTMLDivElement, ReportCompleteProps>(
  (props, ref) => {
    const { id, message, ...other } = props;
    return (
      <SnackbarContent ref={ref} role="alert" {...other}>
        <CustomSnackbar message={message} id={id} variant="success" />
      </SnackbarContent>
    );
  }
);
const SnackbarWarning = React.forwardRef<HTMLDivElement, ReportCompleteProps>(
  (props, ref) => {
    const { id, message, ...other } = props;
    return (
      <SnackbarContent ref={ref} role="alert" {...other}>
        <CustomSnackbar message={message} id={id} variant="warning" />
      </SnackbarContent>
    );
  }
);
const SnackbarError = React.forwardRef<HTMLDivElement, ReportCompleteProps>(
  (props, ref) => {
    const { id, message, ...other } = props;
    return (
      <SnackbarContent ref={ref} role="alert" {...other}>
        <CustomSnackbar message={message} id={id} variant="error" />
      </SnackbarContent>
    );
  }
);

export { SnackbarSuccess, SnackbarWarning, SnackbarError };

function CustomSnackbar({
  message,
  id,
  variant,
}: {
  message: SnackbarMessage;
  id: SnackbarKey;
  variant: SnackbarVariant;
}) {
  const t = useTranslations("");
  const { locale } = useParams();
  const variantStyles: {
    [key in SnackbarVariant]: SnackbarVariantProps;
  } = {
    success: {
      styles: "bg-[rgb(2,140,77)]",
      title: t("NOTIFICATIONS.SUCCESSFUL_PROCESS"),
      icon: {
        icon: "mdi:success",
        styles: "bg-[rgb(2,92,54)]",
      },
    },
    error: {
      styles: "bg-[rgb(218,50,86)]",
      title: t("NOTIFICATIONS.FAILED_PROCESS"),
      icon: {
        icon: "radix-icons:cross-2",
        styles: "bg-[rgb(129,29,61)]",
      },
    },
    warning: {
      styles: "bg-[rgb(253,136,33)]",
      title: t("NOTIFICATIONS.WARNING"),
      icon: {
        icon: "healthicons:warning",
        styles: "bg-[rgb(194,74,21)]",
      },
    },
    info: {
      styles: "bg-[rgb(0,112,224)]",
      title: t("NOTIFICATIONS.WARNING"),

      icon: {
        icon: "uil:info",
        styles: "bg-[rgb(1,73,142)]",
      },
    },
    default: {
      styles: "bg-[rgb(0,112,224)]",
      title: t("NOTIFICATIONS.WARNING"),
      icon: {
        icon: "uil:info",
        styles: "bg-[rgb(1,73,142)]",
      },
    },
  };
  return (
    <div
      className={cn(
        "p-2  rounded-md flex  gap-3 items-center",
        locale === "en" ? "flex-row-reverse" : "flex-row",
        variantStyles[variant].styles
      )}
    >
      <div
        className={cn(
          "h-12 w-12 rounded-md flex items-center justify-center",
          variantStyles[variant].icon.styles
        )}
      >
        <Icon
          icon={variantStyles[variant].icon.icon}
          className="h-7 w-7 text-white"
        ></Icon>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-lg">{variantStyles[variant].title}</p>
        <p className="text-sm font-semibold text-gray-200">{message}</p>
      </div>
      <Button
        onClick={() => closeSnackbar(id)}
        className="bg-transparent hover:bg-transparent hover:brightness-90 transition-all h-12 w-12 p-0 m-0 text-xl"
      >
        <Icon
          icon="radix-icons:cross-2"
          className=" text-white h-6! w-6!"
        ></Icon>
      </Button>
    </div>
  );
}
