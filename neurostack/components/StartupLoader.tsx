"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StartupLoader(): JSX.Element {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
    >
      {/* Global ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_75%)]" />

      {/* MAIN STACK */}
      <motion.div
        className="relative flex min-h-[360px] sm:min-h-[460px] flex-col items-center justify-center"
        initial={{ scale: 0.985 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle depth */}
        <div className="pointer-events-none absolute -inset-24 rounded-full bg-gradient-to-b from-gray-700/25 via-gray-600/10 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -inset-32 rounded-full bg-gray-500/10 blur-[120px]" />

        {/* LOGO */}
        <motion.div
          initial={{ y: -120, scale: 0.96, opacity: 0 }}
          animate={{
            y: [-120, 16, -8, 5, -3, 0],
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mb-10 sm:mb-14"
        >
          {/* Dark rose aura */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl bg-rose-700/14"
            animate={{ opacity: [0.08, 0.18, 0.12] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo with animated drop blur */}
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 14px rgba(190,18,60,0.18)) drop-shadow(0 0 26px rgba(190,18,60,0.25))",
                "drop-shadow(0 0 22px rgba(190,18,60,0.28)) drop-shadow(0 0 38px rgba(190,18,60,0.36))",
                "drop-shadow(0 0 16px rgba(190,18,60,0.20)) drop-shadow(0 0 30px rgba(190,18,60,0.28))",
              ],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 rounded-full"
          >
            <Image
              src="/logo.png"
              alt="NeuroStack Logo"
              width={96}
              height={96}
              priority
              className="rounded-full sm:w-[120px] sm:h-[120px]"
            />
          </motion.div>
        </motion.div>

        {/* BRAND NAME */}
        <div className="overflow-visible">
          <div className="flex text-[2.8rem] sm:text-[4.4rem] font-bold tracking-[0.02em] leading-none">
            {/* Neuro */}
            <motion.span
              className="text-white"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.1,
                duration: 0.9,
                ease: "easeOut",
              }}
            >
              Neuro
            </motion.span>

            {/* Stack — jumping from right */}
            <motion.span
              className="text-rose-500"
              initial={{ opacity: 0, x: 180, y: 0 }}
              animate={{
                opacity: 1,
                x: [180, 120, 60, 0],
                y: [0, -26, 0, -14, 0, -6, 0],
              }}
              transition={{
                delay: 1.3,
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Stack
            </motion.span>
          </div>
        </div>

        {/* TAGLINE */}
        <motion.span
          className="mt-5 sm:mt-6 text-[11px] sm:text-[15px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-gray-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2.6,
            duration: 0.9,
            ease: "easeOut",
          }}
        >
          AI UI / UX ENGINE
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
