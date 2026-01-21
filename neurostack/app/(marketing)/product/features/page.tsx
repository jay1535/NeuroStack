"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function FeaturesPage() {
  return (
    <main
      className="
        bg-white text-black
        dark:bg-black dark:text-white
        min-h-screen px-6 py-32
        overflow-x-hidden relative
      "
    >
      {/* ================= BACK RIBBON ================= */}
      <Link
        href="/"
        aria-label="Back to Home"
        className="fixed top-6 left-0 z-50 group"
      >
        <div
          className="
            pl-6 pr-5 py-2
            dark:bg-orange-500 bg-purple-700
            text-white
            font-semibold text-sm
            rounded-r-full
            shadow-lg
            transition-all duration-300
            hover:dark:bg-orange-600 hover:bg-purple-900
            hover:pl-8
          "
        >
          ← Back
        </div>
      </Link>

      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold dark:text-orange-500 text-black">
            NeuroStack Features
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
            NeuroStack is designed to eliminate the friction between ideas and
            execution. Every feature is built to help teams design faster,
            smarter, and with confidence — without compromising UX quality.
          </p>
        </motion.div>

        {/* ================= FEATURE GRID ================= */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered UI Generation",
              desc: "Convert natural language prompts into clean, structured UI layouts optimized for real-world products.",
            },
            {
              title: "Mobile & Web Design",
              desc: "Generate responsive interfaces for Android, iOS, and modern web platforms from a single prompt.",
            },
            {
              title: "UX Intelligence Engine",
              desc: "Layouts are generated using proven UX principles such as hierarchy, spacing, and usability.",
            },
            {
              title: "Accessibility Awareness",
              desc: "Contrast ratios, readable typography, and accessible patterns are considered automatically.",
            },
            {
              title: "Developer-Friendly Output",
              desc: "Designs are structured logically, making handoff to development smoother and faster.",
            },
            {
              title: "Rapid Prototyping",
              desc: "Go from idea to visual structure in minutes instead of days or weeks.",
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
                rounded-2xl p-8
                bg-black/5 border border-black/10
                dark:bg-white/5 dark:border-white/10
                transition-all duration-300
                hover:border-orange-600/40
                hover:-translate-y-1
              "
            >
              <h3 className="text-lg font-semibold dark:text-orange-500 text-black">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= DEEP DIVE ================= */}
        <section className="mt-32 max-w-4xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold mb-6"
          >
            How NeuroStack Works
          </motion.h2>

          <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              NeuroStack begins with your idea — expressed in natural language.
              Whether you describe a mobile app, a dashboard, or a marketing
              website, our AI interprets your intent and transforms it into a
              structured UI blueprint.
            </p>

            <p>
              The system understands common UI patterns, industry standards,
              and modern UX conventions. This ensures that generated layouts
              are not only visually clean but also intuitive and usable.
            </p>

            <p>
              Each generated interface follows a logical hierarchy, making it
              easier for designers to iterate and for developers to implement.
              NeuroStack does not replace creativity — it accelerates it.
            </p>
          </div>
        </section>

        {/* ================= USE CASES ================= */}
        <section className="mt-32">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-center"
          >
            Designed for Real-World Use Cases
          </motion.h2>

          <div className="mt-16 grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Startups",
                desc: "Validate ideas faster and launch MVPs without design bottlenecks.",
              },
              {
                title: "Developers",
                desc: "Skip wireframing and focus on building functionality.",
              },
              {
                title: "Designers",
                desc: "Accelerate ideation while maintaining creative control.",
              },
              {
                title: "Product Teams",
                desc: "Align stakeholders quickly with clear visual structures.",
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
                  rounded-2xl p-6
                  bg-black/5 border border-black/10
                  dark:bg-white/5 dark:border-white/10
                  hover:border-orange-600/40
                  transition-all duration-300
                "
              >
                <p className="dark:text-orange-500 text-black font-semibold">
                  {item.title}
                </p>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FINAL NOTE ================= */}
        <section className="mt-32 max-w-3xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold"
          >
            Built to Scale With You
          </motion.h2>

          <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
            NeuroStack is not just a UI generator — it’s a design acceleration
            platform. As your product grows, our AI adapts to support more
            complex workflows, layouts, and product structures.
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Design faster. Iterate smarter. Ship with confidence.
          </p>
        </section>
      </div>
    </main>
  );
}
