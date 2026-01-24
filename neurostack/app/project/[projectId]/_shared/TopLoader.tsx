"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TopLoaderProps {
  visible: boolean;
  message?: string;
}

export default function TopLoader({
  visible,
  message = "Loading",
}: TopLoaderProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* ===== BACKDROP ===== */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ===== CARD ===== */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative z-10 w-[300px]
              rounded-2xl
              border border-white/10
              bg-white/80 text-black
              dark:bg-black/70 dark:text-white
              backdrop-blur-xl
              shadow-[0_40px_120px_rgba(0,0,0,0.35)]
              overflow-hidden
            "
          >
            {/* ===== SOFT SHIMMER ===== */}
            <motion.div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-transparent
                via-purple-500/10 dark:via-purple-500/10
                to-transparent
              "
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />

            {/* ===== CONTENT ===== */}
            <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-6">
              {/* Spinner */}
              <motion.div
                className="
                  h-8 w-8 rounded-full
                  border-2
                  border-purple-600/30 dark:border-purple-500/30
                  border-t-purple-600 dark:border-t-purple-500
                "
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9,
                  ease: "linear",
                }}
              />

              {/* Text + dots */}
              <div className="flex items-center gap-1 text-sm font-medium tracking-wide opacity-80">
                <span>{message}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                >
                  .
                </motion.span>
              </div>
            </div>

            {/* ===== PROGRESS LINE ===== */}
            <motion.div
              className="
                absolute bottom-0 left-0 h-[3px]
                bg-gradient-to-r
                from-purple-600 via-purple-400 to-purple-600
                dark:from-purple-500 dark:via-purple-400 dark:to-purple-500
              "
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
