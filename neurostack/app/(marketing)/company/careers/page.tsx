"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-28 relative">

      {/* Back Ribbon */}
      <Link href="/" className="fixed top-6 left-0 z-50 group">
        <div className="
          pl-6 pr-5 py-2
          rounded-r-full
          bg-purple-700 dark:bg-orange-600
          text-white text-sm font-semibold
          shadow-lg
          transition-all duration-300
          hover:pl-8
        ">
          ← Back 
        </div>
      </Link>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-24">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-xs tracking-widest">
          CAREERS
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Careers at NeuroStack
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-400">
          We’re building thoughtful AI products with a small, focused team.
        </p>
      </div>

      {/* No Openings */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          max-w-xl mx-auto
          rounded-3xl
          p-12
          text-center
          bg-black/5 dark:bg-white/5
          border border-black/10 dark:border-white/10
        "
      >
        <h2 className="text-2xl font-semibold mb-4">
          No Open Positions Right Now
        </h2>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          We don’t have any active openings at the moment, but we’re always
          excited to connect with passionate builders and designers.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          Feel free to reach out — we’d love to hear from you.
        </p>

        {/* ✅ Linked to Contact Page */}
        <Link
          href="/company/contact"
          className="
            inline-block mt-8
            px-8 py-3
            rounded-xl
            bg-black dark:bg-white
            text-white dark:text-black
            font-semibold
            transition hover:opacity-90
          "
        >
          Contact Now
        </Link>
      </motion.div>
    </main>
  );
}
