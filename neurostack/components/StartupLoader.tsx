"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StartupLoader() {
  return (
    <motion.div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        overflow-hidden px-4
        bg-black
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
    >
      {/* 🌑 NIGHT SKY — subtle distant purple light */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-[42%]
          h-[420px] w-[420px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(88,28,135,0.22),rgba(0,0,0,0.92)_68%)]
          blur-[90px]
        "
      />

      {/* ================= MAIN STACK ================= */}
      <motion.div
        className="relative flex min-h-90 sm:min-h-115 flex-col items-center justify-center"
        initial={{ scale: 0.985 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 🌌 VERY DARK ATMOSPHERIC DEPTH */}
        <div className="pointer-events-none absolute -inset-36 rounded-full bg-purple-950/20 blur-[160px]" />
        <div className="pointer-events-none absolute -inset-48 rounded-full bg-purple-900/10 blur-[200px]" />

        {/* ================= LOGO ================= */}
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
          {/* 🟣 DARK PURPLE AURA (tight + deep) */}
          <motion.div
            className="
              absolute inset-0 rounded-full
              bg-[radial-gradient(circle,rgba(126,34,206,0.38),rgba(88,28,135,0.28),rgba(0,0,0,0.9)_72%)]
              blur-[70px]
            "
            animate={{ opacity: [0.18, 0.32, 0.24] }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* LOGO GLOW — restrained, night-safe */}
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 14px rgba(126,34,206,0.35))",
                "drop-shadow(0 0 22px rgba(126,34,206,0.55))",
                "drop-shadow(0 0 16px rgba(126,34,206,0.40))",
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
              className="rounded-full sm:w-30 sm:h-30"
            />
          </motion.div>
        </motion.div>

        {/* ================= BRAND NAME ================= */}
        <div className="overflow-visible">
          <div className="flex text-[2.8rem] sm:text-[4.4rem] font-bold tracking-[0.02em] leading-none">
            <motion.span
              className="text-white"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
            >
              Neuro
            </motion.span>

            <motion.span
              className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 180 }}
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

        {/* ================= TAGLINE ================= */}
        <motion.span
          className="
            mt-5 sm:mt-6
            text-[11px] sm:text-[15px]
            tracking-[0.35em] sm:tracking-[0.4em]
            uppercase
            text-purple-400/60
            text-center
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.9, ease: "easeOut" }}
        >
          AI UI / UX ENGINE
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
