"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const roadmap = [
  {
    phase: "Phase 1",
    time: "Q1 2026",
    title: "Foundation",
    desc: "Core AI UI generation, onboarding, and platform stability.",
  },
  {
    phase: "Phase 2",
    time: "Q2 2026",
    title: "Design Intelligence",
    desc: "UX best practices, accessibility checks, and smart layouts.",
  },
  {
    phase: "Phase 3",
    time: "Q3 2026",
    title: "Collaboration",
    desc: "Team workspaces, versioning, and shared previews.",
  },
  {
    phase: "Phase 4",
    time: "Q4 2026",
    title: "Ecosystem",
    desc: "Figma export, public APIs, and integrations.",
  },
];

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-28 relative">

      {/* Back Ribbon */}
      <Link href="/" className="fixed top-6 left-0 z-50 group">
        <div className="
          pl-6 pr-5 py-2
          rounded-r-full
          bg-purple-700 dark:bg-rose-500
          text-white text-sm font-semibold
          shadow-lg
          transition-all duration-300
          hover:pl-8
        ">
          ← Back 
        </div>
      </Link>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-28">
        <span className="inline-block mb-3 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-xs tracking-widest">
          ROADMAP
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Product Roadmap
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-400">
          A transparent look at how NeuroStack is evolving.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative">

        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-black/15 dark:bg-white/15" />

        <div className="space-y-20">
          {roadmap.map((item, i) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`
                relative flex flex-col md:flex-row gap-8
                ${i % 2 === 0 ? "md:flex-row-reverse" : ""}
              `}
            >
              {/* Node */}
              <div className="
                absolute left-0 md:left-1/2
                -translate-x-1/2
                w-8 h-8
                rounded-full
                bg-black dark:bg-white
                flex items-center justify-center
              ">
                <div className="w-3 h-3 rounded-full bg-white dark:bg-black" />
              </div>

              {/* Content */}
              <div className="
                md:w-1/2
                ml-14 md:ml-0
                rounded-2xl
                p-8
                bg-black/5 dark:bg-white/5
                border border-black/10 dark:border-white/10
              ">
                <div className="text-sm text-gray-500 mb-2">
                  {item.phase} • {item.time}
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
