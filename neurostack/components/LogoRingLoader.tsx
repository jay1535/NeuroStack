"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function LogoRingLoader(): JSX.Element | null {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Prevent SSR / hydration mismatch
  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <motion.div
      className={`
        fixed inset-0 z-50
        flex flex-col items-center justify-center
        ${isDark ? "bg-black text-white" : "bg-white text-black"}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ================= RING STACK ================= */}
      <div className="relative flex items-center justify-center">

        {/* Ring 1 */}
        <motion.div
          className={`
            absolute h-40 w-40 rounded-full border
            ${isDark ? "border-rose-500/30" : "border-rose-600/40"}
          `}
          animate={{ scale: [0.9, 1.2], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Ring 2 */}
        <motion.div
          className={`
            absolute h-28 w-28 rounded-full border
            ${isDark ? "border-rose-500/40" : "border-rose-600/50"}
          `}
          animate={{ scale: [0.9, 1.25], opacity: [0.6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.4,
          }}
        />

        {/* Ring 3 */}
        <motion.div
          className={`
            absolute h-16 w-16 rounded-full border
            ${isDark ? "border-rose-200/50" : "border-rose-600/60"}
          `}
          animate={{ scale: [0.9, 1.3], opacity: [0.6, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.8,
          }}
        />

        {/* LOGO (theme-safe) */}
        <Image
          src={isDark ? "/logo.png" : "/black-logo.png"}
          alt="NeuroStack Logo"
          width={100}
          height={100}
          priority
          className="relative z-10 rounded-full"
        />
      </div>

      {/* ================= PROJECT NAME ================= */}
      <motion.div
  initial={{ opacity: 0, y: 10, scale: 0.96 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
  className="
    mt-10
    text-4xl sm:text-5xl md:text-6xl
    font-extrabold
    tracking-wide
    flex items-center gap-1
  "
>
  <span>Neuro</span>
  <span className="dark:text-rose-500 text-purple-700">Stack</span>
</motion.div>

    </motion.div>
  );
}
