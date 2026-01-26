"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useAuth } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import { UserDetailContext } from "./context/UserDetailContext";
import { SettingContext } from "./context/SettingContext";
import { RefreshDataContext } from "./context/RefreshDataContext";
import { createUserIfNotExists } from "@/app/actions/create-user";

interface ProviderProps
  extends React.ComponentProps<typeof NextThemesProvider> {
  children: React.ReactNode;
}

export default function Provider({
  children,
  ...props
}: ProviderProps) {
  const { isLoaded, userId } = useAuth();

  const [userDetail, setUserDetail] = React.useState<any>(null);
  const [settingInfo, setSettingInfo] = React.useState<any>(null);
  const [refreshData, setRefreshData] = React.useState<boolean>(false);

  const calledRef = React.useRef(false);

  const createUser = async () => {
    try {
      const user = await createUserIfNotExists();
      setUserDetail(user);
    } catch (error) {
      console.error("CreateNewUser failed:", error);
    }
  };

  React.useEffect(() => {
    if (!isLoaded || !userId || calledRef.current) return;

    calledRef.current = true;
    createUser();
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

      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <SettingContext.Provider value={{ settingInfo, setSettingInfo }}>
          <RefreshDataContext.Provider
            value={{ refreshData, setRefreshData }}
          >
            <div className="w-full">{children}</div>
          </RefreshDataContext.Provider>
        </SettingContext.Provider>
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}
