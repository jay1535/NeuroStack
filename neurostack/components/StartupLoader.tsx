"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StartupLoader(): JSX.Element {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_75%)]" />

      {/* MAIN STACK */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ scale: 0.985 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LOGO — FAST 3 BOUNCES */}
        <motion.div
          initial={{ y: -140, scale: 0.96, opacity: 0 }}
          animate={{
            y: [-140, 18, -10, 6, -3, 0], // 👈 3 fast bounces
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.9, // fast but smooth
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mb-14"
        >
          {/* Controlled aura */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl bg-orange-500/12"
            animate={{ opacity: [0.08, 0.16, 0.12] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <Image
            src="/logo.png"
            alt="NeuroStack Logo"
            width={120}
            height={120}
            priority
            className="relative z-10 rounded-full"
          />
        </motion.div>

        {/* BRAND */}
        <div className="overflow-hidden">
          <div className="flex text-[4.4rem] font-bold tracking-[0.025em] leading-none">
            {/* Neuro — calm reveal */}
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

            {/* Stack — FAST 3 BOUNCES */}
            <motion.span
              className="text-orange-500"
              initial={{ opacity: 0, y: 26 }}
              animate={{
                opacity: 1,
                y: [26, -10, 6, -3, 0], // 👈 3 fast bounces
              }}
              transition={{
                delay: 1.3,
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Stack
            </motion.span>
          </div>
        </div>

        {/* TAGLINE */}
        <motion.span
          className="mt-6 text-[15px] tracking-[0.4em] uppercase text-gray-400"
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
