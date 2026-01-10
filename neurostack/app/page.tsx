"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Dark rose ambient glow (ONLY HERE) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(190,18,60,0.22),transparent_55%)]" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9 }}
          className="relative max-w-4xl text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            AI-Powered{" "}
            <span className="text-rose-500">UI/UX Design</span>
            <br /> for Mobile & Web
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            NeuroStack generates clean, modern, production-ready UI/UX
            for mobile apps and websites — powered by AI.
          </p>

          {/* ✅ RESPONSIVE BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="
                w-full sm:w-auto
                px-6 sm:px-8 py-3
                rounded-xl
                bg-white text-black font-semibold
                transition-all duration-300
                hover:bg-gray-200
                hover:-translate-y-0.5
                hover:shadow-[0_8px_24px_rgba(255,255,255,0.25)]
              "
            >
              Get Started
            </button>

            <button
              className="
                w-full sm:w-auto
                px-6 sm:px-8 py-3
                rounded-xl
                border border-white/20 text-white
                transition-all duration-300
                hover:bg-white/5
                hover:border-rose-600/60
                hover:-translate-y-0.5
              "
            >
              View Features
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-32 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Everything You Need to Design Faster
          </h2>

          <p className="mt-4 text-gray-400 text-center max-w-xl mx-auto">
            From mobile apps to full websites — NeuroStack handles UI & UX intelligently.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              ["Mobile App UI", "AI-generated Android & iOS layouts."],
              ["Web & SaaS UI", "Landing pages, dashboards, and platforms."],
              ["AI UX Intelligence", "Accessibility and UX best practices built-in."],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="
                  rounded-2xl p-8
                  bg-white/5 border border-white/10
                  transition-all duration-300
                  hover:border-rose-600/40
                  hover:-translate-y-1
                "
              >
                <h3 className="text-lg font-semibold text-rose-500">
                  {title}
                </h3>
                <p className="mt-3 text-gray-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT PREVIEW ================= */}
      <section className="py-32 px-6 bg-neutral-950 min-h-screen">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 text-xs tracking-widest text-gray-300">
              AI WORKFLOW
            </span>

            <h2 className="text-4xl font-extrabold leading-tight">
              From Prompt to{" "}
              <span className="text-rose-500">Production UI</span>
            </h2>

            <p className="mt-6 text-gray-400 max-w-xl">
              Describe your product idea in plain language.
              NeuroStack transforms it into structured UI screens and UX flows.
            </p>

            <ul className="mt-8 space-y-4 text-gray-400">
              {[
                "Natural language → UI screens",
                "Mobile & web layouts generated",
                "UX best practices built-in",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="h-full rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                <p className="text-gray-400 text-sm tracking-wide">
                  AI-GENERATED UI PREVIEW
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-36 px-6 bg-neutral-950 min-h-screen">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block mb-6 px-4 py-1 rounded-full bg-white/5 text-xs tracking-widest text-gray-300">
            GET STARTED
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Design Faster with{" "}
            <span className="text-rose-500">NeuroStack</span>
          </h2>

          <p className="mt-6 text-gray-400 max-w-xl mx-auto">
            Turn ideas into beautiful, production-ready UI/UX in minutes.
          </p>

          {/* ✅ RESPONSIVE CTA BUTTON */}
          <button
            className="
              mt-12
              w-full sm:w-auto
              px-8 sm:px-12 py-3
              rounded-xl
              bg-white text-black font-semibold
              transition-all duration-300
              hover:bg-gray-200
              hover:-translate-y-1
              hover:shadow-[0_12px_32px_rgba(255,255,255,0.35)]
            "
          >
            Try NeuroStack
          </button>

          <p className="mt-6 text-xs text-gray-500">
            No credit card required • Free to get started
          </p>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-14 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-sm text-gray-400">
          <div>
            <h3 className="text-white font-semibold">NeuroStack</h3>
            <p className="mt-3">
              AI-powered UI/UX generation for mobile and web products.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">Product</h4>
            <ul className="mt-3 space-y-2">
              <li className="hover:text-rose-500 cursor-pointer">Features</li>
              <li className="hover:text-rose-500 cursor-pointer">Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Company</h4>
            <ul className="mt-3 space-y-2">
              <li className="hover:text-rose-500 cursor-pointer">About</li>
              <li className="hover:text-rose-500 cursor-pointer">Privacy</li>
              <li className="hover:text-rose-500 cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} NeuroStack. All rights reserved.
        </p>
      </footer>

    </main>
  );
}
