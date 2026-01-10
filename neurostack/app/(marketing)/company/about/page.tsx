"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-32 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-28">

        {/* ================= HERO ================= */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-rose-500">
            About NeuroStack
          </h1>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            NeuroStack is an AI-powered UI/UX generation platform built to
            eliminate friction between product ideas and execution.
            We help teams design faster, smarter, and with confidence.
          </p>
        </motion.section>

        {/* ================= MISSION ================= */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to empower creators by removing repetitive,
              time-consuming design work while preserving creative control.
              We believe AI should amplify human decision-making — not replace it.
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed">
              NeuroStack bridges the gap between raw ideas and polished interfaces,
              helping teams move from concept to production in minutes.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <ul className="space-y-4 text-gray-300">
              <li className="flex gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-rose-600" />
                Design speed without sacrificing quality
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-rose-600" />
                AI-assisted, human-controlled workflows
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-rose-600" />
                Production-ready outputs by default
              </li>
            </ul>
          </div>
        </section>

        {/* ================= STORY ================= */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why We Built NeuroStack</h2>
          <p className="text-gray-400 leading-relaxed">
            Modern product teams waste weeks aligning designs, iterations,
            and UX decisions. NeuroStack was created after seeing founders,
            developers, and designers struggle with slow handoffs and tooling gaps.
          </p>
          <p className="mt-4 text-gray-400 leading-relaxed">
            We asked a simple question:
            <strong className="text-white">
              {" "}Why can’t describing a product generate its UI?
            </strong>
          </p>
          <p className="mt-4 text-gray-400 leading-relaxed">
            NeuroStack answers that question by translating intent into
            structured design systems, screens, and flows — instantly.
          </p>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-14">
            How NeuroStack Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Describe",
                desc: "Explain your app or website idea using natural language.",
              },
              {
                title: "Generate",
                desc: "AI creates UI layouts, UX flows, and component structures.",
              },
              {
                title: "Customize",
                desc: "Refine, iterate, and export production-ready designs.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 p-8 hover:border-rose-600/40 transition"
              >
                <h3 className="text-xl font-semibold text-rose-500">
                  {item.title}
                </h3>
                <p className="mt-4 text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WHO IT'S FOR ================= */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-14">
            Who Uses NeuroStack
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Startup Founders",
              "Product Designers",
              "Frontend Developers",
              "Product Managers",
            ].map((role, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 border border-white/10 p-6 text-center hover:border-rose-600/40 transition"
              >
                <p className="text-rose-500 font-semibold">{role}</p>
                <p className="mt-3 text-sm text-gray-400">
                  Build faster with fewer design bottlenecks.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Human-First AI",
                desc: "AI assists creativity, it never replaces judgment.",
              },
              {
                title: "Speed with Clarity",
                desc: "Fast output without sacrificing UX principles.",
              },
              {
                title: "Design for Scale",
                desc: "Everything we generate is built to grow.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 p-8"
              >
                <h3 className="text-lg font-semibold text-rose-500">
                  {v.title}
                </h3>
                <p className="mt-4 text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= FUTURE ================= */}
        <section className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            The Future of NeuroStack
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We’re building toward a future where product teams
            can design, validate, and ship interfaces without friction.
            NeuroStack will continue expanding into design systems,
            accessibility intelligence, and full product workflows.
          </p>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Our vision is simple:
            <strong className="text-white">
              {" "}Design should never slow innovation.
            </strong>
          </p>
        </section>

      </div>
    </main>
  );
}
