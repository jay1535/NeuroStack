import type { Metadata } from "next";

import "./globals.css";
import AppLoaderWrapper from "@/components/AppLoaderWrapper";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "NeuroStack",
  description: "UI/UX generator website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${exo2.className}  antialiased`}
      >
        <AppLoaderWrapper>{children}</AppLoaderWrapper>
      </body>
    </html>
  );
}
