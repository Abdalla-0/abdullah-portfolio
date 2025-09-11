/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";
import ScrollTopButton from "@/components/shared/Buttons/ScrollTopButton/ScrollTopButton";
import Settings from "@/components/shared/Settings/Settings";
import { routing } from "@/i18n/routing";
import "@/styles/globals.css";
import { Directions, Languages } from "@/utils/constants";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import {
  Cairo,
  Tajawal,
  Work_Sans
} from "next/font/google";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-cairo",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-tajawal",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-work-sans",
});


export const metadata: Metadata = {
  title: "Abdalla Atef | Frontend Developer & UI/UX Designer",
  description:
    "Portfolio of Abdullah Atef, a passionate Fullstack Developer and UI/UX Designer with expertise in React, Next.js, TypeScript, and other modern web technologies. Skilled in crafting responsive, high-performance websites and intuitive user experiences. Explore my projects, case studies, and design work.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
    >
      <body
        className={`${
          locale === Languages.ARABIC
            ? `${cairo.variable} ${tajawal.variable}`
            : workSans.variable
        } ${locale === Languages.ARABIC && "ar"}`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-full before:h-[700px] before:bg-gradient-to-b before:from-[color-mix(in_srgb,var(--color-primary),white_90%)] before:to-transparent before:z-[-1]">
            <Header />
            <main className="min-h-[600px]">
              <ToastContainer />
              <Settings />
              <ScrollTopButton />
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
