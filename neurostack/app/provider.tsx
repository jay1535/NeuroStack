"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { UserDetailContext } from "./context/UserDetailContext";
import { Toaster } from "react-hot-toast";

interface ProviderProps
  extends React.ComponentProps<typeof NextThemesProvider> {
  children: React.ReactNode;
}

export default function Provider({
  children,
  ...props
}: ProviderProps): JSX.Element {
  const { isLoaded, userId } = useAuth();
  const [userDetail, setUserDetail] = React.useState(null);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user");
      setUserDetail(result.data);
    } catch (error) {
      console.error("CreateNewUser failed:", error);
    }
  };

  React.useEffect(() => {
    // 🔒 WAIT for Clerk
    if (!isLoaded || !userId) return;

    CreateNewUser();
  }, [isLoaded, userId]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <Toaster position="top-right" />

      <UserDetailContext.Provider value={userDetail}>
        <div className="w-full">{children}</div>
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}
