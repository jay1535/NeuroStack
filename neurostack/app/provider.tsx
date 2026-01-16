"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import axios from "axios";
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
  const [userDetail, setUserDetail] = React.useState(null);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {});
      setUserDetail(result.data);
    } catch (error) {
      console.error("CreateNewUser failed:", error);
    }
  };

  React.useEffect(() => {
    CreateNewUser();
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {/* ✅ REQUIRED FOR TOASTS */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <UserDetailContext.Provider value={userDetail}>
        <div className="w-full">{children}</div>
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}
