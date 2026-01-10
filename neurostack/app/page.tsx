"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_50%)]" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            AI-Powered <span className="text-orange-500">UI/UX Design</span>
            <br /> for Mobile & Web
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            NeuroStack instantly generates clean, modern, production-ready UI/UX
            for mobile apps and websites — guided by AI.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {/* Primary */}
            <button
              className="
                px-8 py-3 rounded-xl
                bg-orange-500 text-black font-semibold
                transition-all duration-300
                hover:bg-orange-400
                hover:-translate-y-0.5
                hover:shadow-[0_8px_24px_rgba(249,115,22,0.35)]
                active:translate-y-0
              "
            >
              Get Started
            </button>

            {/* Secondary */}
            <button
              className="
                px-8 py-3 rounded-xl
                border border-white/15 text-white
                transition-all duration-300
                hover:bg-white/5
                hover:border-orange-500/40
                hover:-translate-y-0.5
              "
            >
              View Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-28 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Everything You Need to Design Faster
          </h2>

          <p className="mt-4 text-gray-400 text-center max-w-xl mx-auto">
            From mobile apps to full websites — NeuroStack handles UI & UX
            intelligently.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              ["Mobile App UI", "Generate Android & iOS UI with UX-optimized layouts."],
              ["Web & SaaS UI", "Landing pages, dashboards, and full websites."],
              ["AI UX Intelligence", "Accessibility, usability, and best practices built-in."],
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl p-8 bg-white/5 border border-white/10 hover:border-orange-500/40 transition"
              >
                <h3 className="text-lg font-semibold text-orange-500">
                  {title}
                </h3>
                <p className="mt-3 text-gray-300">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT PREVIEW ================= */}
     <section className="relative py-32 px-6 bg-neutral-950 overflow-hidden min-h-screen">
  {/* subtle background glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.06),transparent_60%)]" />

  <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
    
    {/* LEFT CONTENT */}
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
        <span className="text-orange-500">Production UI</span>
      </h2>

      <p className="mt-6 text-gray-300 max-w-xl">
        Describe your app or website idea in plain language. NeuroStack
        instantly generates structured UI screens and UX flows that are
        production-ready and fully customizable.
      </p>

      <ul className="mt-8 space-y-4 text-gray-300">
        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          Natural language → UI screens
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          Mobile & web layouts generated
        </li>
        <li className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          UX best practices built-in
        </li>
      </ul>
    </motion.div>

    {/* RIGHT VISUAL PREVIEW */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* glow */}
      <div className="absolute -inset-10 rounded-3xl bg-orange-500/20 blur-3xl" />

      {/* preview card */}
      <div className="relative h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div className="h-full rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
          <p className="text-gray-400 text-sm tracking-wide">
            UI PREVIEW GENERATED BY AI
          </p>
        </div>
      </div>
    </motion.div>

  </div>
</section>


      {/* ================= WHO IT'S FOR ================= */}
     <section className="relative py-32 px-6 overflow-hidden min-h-screen">
  {/* soft background wash */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_65%)]" />

  <div className="relative max-w-6xl mx-auto text-center">
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-extrabold"
    >
      Built for{" "}
      <span className="text-orange-500">Modern Product Teams</span>
    </motion.h2>

    <p className="mt-4 text-gray-400 max-w-xl mx-auto">
      Whether you’re launching fast, scaling products, or refining UX —
      NeuroStack adapts to your workflow.
    </p>

    <div className="mt-20 grid md:grid-cols-4 gap-8">
      {[
        {
          role: "Startups",
          desc: "Launch MVPs faster with AI-generated UI flows.",
        },
        {
          role: "Developers",
          desc: "Skip design bottlenecks and focus on building.",
        },
        {
          role: "Designers",
          desc: "Accelerate ideation and iteration with AI.",
        },
        {
          role: "Founders",
          desc: "Turn ideas into production-ready interfaces.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="
            group relative rounded-2xl p-8
            bg-white/5 border border-white/10
            transition-all duration-300
            hover:border-orange-500/40
            hover:-translate-y-1
          "
        >
          {/* subtle hover glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-orange-500/0 group-hover:bg-orange-500/5 transition" />

          <p className="relative z-10 text-orange-500 font-semibold text-lg">
            {item.role}
          </p>
          <p className="relative z-10 mt-3 text-gray-300 text-sm leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* ================= CTA ================= */}
      <section className="relative py-36 px-6 bg-neutral-950 overflow-hidden min-h-screen">
  {/* ambient glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-orange-500/20 blur-[140px]" />

  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative max-w-3xl mx-auto text-center"
  >
    <span className="inline-block mb-6 px-4 py-1 rounded-full bg-white/5 text-xs tracking-widest text-gray-300">
      GET STARTED
    </span>

    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
      Design Faster with{" "}
      <span className="text-orange-500">NeuroStack</span>
    </h2>

    <p className="mt-6 text-gray-400 max-w-xl mx-auto leading-relaxed">
      Turn ideas into beautiful, production-ready UI/UX for mobile apps
      and websites — in minutes, not weeks.
    </p>

    <button
      className="
        mt-12 px-12 py-3 rounded-xl
        bg-orange-500 text-black font-semibold
        transition-all duration-300
        hover:bg-orange-400
        hover:-translate-y-1
        hover:shadow-[0_12px_32px_rgba(249,115,22,0.4)]
        active:translate-y-0
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
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-sm text-gray-400">
          <div>
            <h3 className="text-white font-semibold">NeuroStack</h3>
            <p className="mt-3">
              AI-powered UI/UX generation for mobile and web products.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold">Product</h4>
            <ul className="mt-3 space-y-2">
              <li>Features</li>
              <li>Demo</li>
              <li>Pricing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Company</h4>
            <ul className="mt-3 space-y-2">
              <li>About</li>
              <li>Privacy</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2">
              <li>Docs</li>
              <li>Support</li>
              <li>Community</li>
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
