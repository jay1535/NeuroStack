"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import axios from "axios";
import { UserDetailContext } from "./context/UserDetailContext";


interface ProviderProps
  extends React.ComponentProps<typeof NextThemesProvider> {
  children: React.ReactNode;
}

export default function Provider({
  children,
  ...props
}: ProviderProps): JSX.Element {

const [userDetail,setUserDetail] = React.useState();
  React.useEffect(()=>{
    CreateNewUser();
  })
  const CreateNewUser= async ()=>{
    const result = await axios.post('api/user',{});
    setUserDetail(result.data);
  }


  return (
    
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <UserDetailContext.Provider value={userDetail}>
          <div className="w-full">{children}</div>
       </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}
