import Script from "next/script";
import {themeInitScript} from "@/lib/theme-init-script";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script id="theme-init" strategy="beforeInteractive">
        {themeInitScript}
      </Script>
      {children}
    </>
  );
}
