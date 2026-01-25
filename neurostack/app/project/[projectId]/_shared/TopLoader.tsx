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
  const dots = [0, 1, 2];

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
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ===== FLOATING BACKGROUND DOTS ===== */}
          <motion.div
            className="absolute w-56 h-56 rounded-full bg-purple-500/20 blur-3xl"
            animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
            transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-44 h-44 rounded-full bg-indigo-500/20 blur-3xl"
            animate={{ x: [0, -30, 30, 0], y: [0, 30, -30, 0] }}
            transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
          />

          {/* ===== CARD ===== */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="
              relative z-10
              w-[300px]
              rounded-2xl
              border border-white/10
              bg-white/80 text-black
              dark:bg-black/70 dark:text-white
              backdrop-blur-xl
              shadow-[0_30px_100px_rgba(0,0,0,0.45)]
              px-6 py-8
            "
          >
            {/* ===== DOT WAVE ===== */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {dots.map((i) => (
                <motion.span
                  key={i}
                  className="h-3 w-3 rounded-full bg-purple-600 dark:bg-purple-500"
                  animate={{
                    y: ["0%", "-60%", "0%"],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>

            {/* ===== TEXT ===== */}
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-center text-sm font-medium tracking-wide"
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
