"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StartupLoader(): JSX.Element {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
    >
      {/* Global ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_75%)]" />

      {/* MAIN STACK (INCREASED SIZE) */}
      <motion.div
        className="relative flex min-h-[460px] flex-col items-center justify-center"
        initial={{ scale: 0.985 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gray shaded backdrop behind logo + text */}
        <div className="pointer-events-none absolute -inset-24 rounded-full bg-gradient-to-b from-gray-700/25 via-gray-600/10 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute -inset-32 rounded-full bg-gray-500/10 blur-[120px]" />

        {/* LOGO — FAST 3 SMOOTH BOUNCES */}
        <motion.div
          initial={{ y: -140, scale: 0.96, opacity: 0 }}
          animate={{
            y: [-140, 18, -10, 6, -3, 0],
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mb-14"
        >
          {/* Soft orange aura */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl bg-orange-500/12"
            animate={{ opacity: [0.08, 0.16, 0.12] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* LOGO with animated drop blur */}
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 14px rgba(255,255,255,0.10)) drop-shadow(0 0 24px rgba(249,115,22,0.18))",
                "drop-shadow(0 0 22px rgba(255,255,255,0.18)) drop-shadow(0 0 36px rgba(249,115,22,0.30))",
                "drop-shadow(0 0 16px rgba(255,255,255,0.12)) drop-shadow(0 0 28px rgba(249,115,22,0.22))",
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
              width={120}
              height={120}
              priority
              className="rounded-full"
            />
          </motion.div>
        </motion.div>

        {/* BRAND NAME */}
        <div className="overflow-visible">
          <div className="flex text-[4.4rem] font-bold tracking-[0.025em] leading-none">
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

            {/* Stack — JUMPING FROM RIGHT (3 JUMPS) */}
            <motion.span
              className="text-orange-500"
              initial={{ opacity: 0, x: 260, y: 0 }}
              animate={{
                opacity: 1,
                x: [260, 160, 80, 0],
                y: [0, -32, 0, -18, 0, -8, 0],
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
          className="mt-6 text-[15px] tracking-[0.4em] uppercase text-gray-300"
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
