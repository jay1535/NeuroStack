"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import StartupLoader from "./StartupLoader";
import LogoRingLoader from "./LogoRingLoader";

interface AppLoaderWrapperProps {
  children: React.ReactNode;
}

export default function AppLoaderWrapper({
  children,
}: AppLoaderWrapperProps): JSX.Element {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [loading, setLoading] = useState(false);
  const [showStartup, setShowStartup] = useState(false);

  useEffect(() => {
    const hasSeenStartup = sessionStorage.getItem("ns-startup-seen");

    // ✅ First visit to home → show cinematic loader
    if (isHome && !hasSeenStartup) {
      setShowStartup(true);
      setLoading(true);

      sessionStorage.setItem("ns-startup-seen", "true");

      const timer = setTimeout(() => {
        setLoading(false);
        setShowStartup(false);
      }, 3600);

      return () => clearTimeout(timer);
    }

    // ✅ Other routes → quick ring loader
    if (!isHome) {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [pathname, isHome]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          showStartup ? (
            <StartupLoader key="startup-loader" />
          ) : (
            <LogoRingLoader key="ring-loader" />
          )
        )}
      </AnimatePresence>

      {!loading && children}
    </>
  );
}
