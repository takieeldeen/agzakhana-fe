"use client";
import { SnackbarProvider } from "notistack";
import {
  SnackbarError,
  SnackbarSuccess,
  SnackbarWarning,
} from "../snackbar/snackbar";

export default function NotistackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={3000}
      maxSnack={3}
      Components={{
        error: SnackbarError,
        success: SnackbarSuccess,
        warning: SnackbarWarning,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
