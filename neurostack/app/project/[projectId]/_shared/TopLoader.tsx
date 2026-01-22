"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TopLoaderProps {
  visible: boolean;
  message?: string;
}

export default function TopLoader({
  visible,
  message = "Loading…",
}: TopLoaderProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ================= CARD ================= */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative w-[280px]
              rounded-2xl
              border
              bg-white text-black
              dark:bg-black dark:text-white
              border-black/10 dark:border-white/10
              shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              overflow-hidden
            "
          >
            {/* ================= SHIMMER ================= */}
            <motion.div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-transparent
                via-black/5 dark:via-white/10
                to-transparent
              "
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
            />

            {/* ================= CONTENT ================= */}
            <div className="relative z-10 flex flex-col items-center gap-3 px-6 py-5">
              {/* spinner */}
              <motion.div
                className="
                  h-6 w-6 rounded-full
                  border-2
                  border-black dark:border-white
                  border-t-transparent
                "
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "linear",
                }}
              />

              {/* text */}
              <span className="text-sm font-medium tracking-wide opacity-80">
                {message}
              </span>
            </div>

            {/* ================= PROGRESS BAR ================= */}
            <motion.div
              className="
                absolute bottom-0 left-0 h-[3px]
                bg-gradient-to-r
                from-black dark:from-white
                via-neutral-500
                to-black dark:to-white
              "
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
