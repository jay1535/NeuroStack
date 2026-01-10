"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import StartupLoader from "./StartupLoader";

interface AppLoaderWrapperProps {
  children: React.ReactNode;
}

export default function AppLoaderWrapper({
  children,
}: AppLoaderWrapperProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // ⏳ 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <StartupLoader />}
      </AnimatePresence>

      {!loading && children}
    </>
  );
}
