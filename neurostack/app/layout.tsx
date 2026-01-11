import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

import AppLoaderWrapper from "@/components/AppLoaderWrapper";
import { Exo_2 } from "next/font/google";
import Provider from "./provider";


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
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo2.className} antialiased`}>
        <Provider>
          <AppLoaderWrapper>
            {children}
          </AppLoaderWrapper>
       </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
