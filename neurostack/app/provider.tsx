"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";


interface ProviderProps
  extends React.ComponentProps<typeof NextThemesProvider> {
  children: React.ReactNode;
}

export default function Provider({
  children,
  ...props
}: ProviderProps): JSX.Element {


  return (
    
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      
          <div className="w-full">{children}</div>
       
    </NextThemesProvider>
  );
}
