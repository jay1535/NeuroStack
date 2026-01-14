import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Exo_2 } from "next/font/google";

import Provider from "./provider";
import AppLoaderWrapper from "@/components/AppLoaderWrapper";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${exo2.className} antialiased`}>
        {/* ✅ ClerkProvider MUST be inside body */}
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#7c3aed", 
            },
          }}
        >
          <Provider>
            <AppLoaderWrapper>
              {children}
            </AppLoaderWrapper>
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
