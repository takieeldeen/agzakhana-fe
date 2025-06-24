import type { Metadata } from "next";
import { Cairo, Lato } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/store";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import ConfirmationDialogProvider from "@/components/confirmation-dialog/confirmation-dialog-provider";
import QueryProvider from "@/components/query-provider/query-provider";
import { Toaster } from "@/components/ui/sonner";
import NotistackProvider from "@/components/notistack-provider/notistack-provider";
import AuthChecker from "@/components/auth-checker/auth-checker";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Agzakhana",
  description: "System for managing multi-branch pharmacies",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { [prop: string]: unknown };
}>) {
  const messages = useMessages();
  const { locale } = params;
  const renderedFont = locale === "ar" ? cairo : lato;
  return (
    <html
      lang={locale as string}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        // className={`${renderedFont.variable} ${renderedFont.variable} antialiased`}
        className={`${renderedFont.className}`}
      >
        <NextIntlClientProvider locale={locale as string} messages={messages}>
          <StoreProvider>
            <AuthChecker />
            <QueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <NotistackProvider>
                  <ConfirmationDialogProvider>
                    {children}
                    <Toaster />
                  </ConfirmationDialogProvider>
                </NotistackProvider>
              </ThemeProvider>
            </QueryProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
