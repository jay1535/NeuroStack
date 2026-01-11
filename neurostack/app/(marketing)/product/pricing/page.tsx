"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PricingPage() {
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
            bg-rose-500
            text-white
            font-semibold text-sm
            rounded-r-full
            shadow-lg
            transition-all duration-300
            hover:bg-rose-600
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
          <h1 className="text-4xl md:text-5xl font-extrabold dark:text-rose-500 text-black">
            Simple, Transparent Pricing
          </h1>

          <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
            NeuroStack pricing is designed to scale with your needs — whether
            you’re exploring ideas solo or building products with a team.
            No hidden fees. No surprises.
          </p>
        </motion.div>

        {/* ================= PRICING CARDS ================= */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {/* FREE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              rounded-2xl p-8
              bg-black/5 border border-black/10
              dark:bg-white/5 dark:border-white/10
              transition-all duration-300
              hover:border-rose-600/40
            "
          >
            <h3 className="text-lg font-semibold dark:text-rose-500 text-black">Free</h3>

            <p className="text-3xl font-extrabold mt-4">₹0</p>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Perfect for exploring NeuroStack and understanding how AI-powered
              UI/UX generation fits into your workflow.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>• Limited AI UI generations</li>
              <li>• Mobile & web layouts</li>
              <li>• UX best-practice layouts</li>
              <li>• Community access</li>
            </ul>

            <button
              className="
                mt-8 w-full
                px-6 py-3 rounded-xl
                bg-black text-white
                dark:bg-white dark:text-black
                font-semibold
                transition-all duration-300
                hover:opacity-90
              "
            >
              Get Started Free
            </button>
          </motion.div>

          {/* PRO */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              relative rounded-2xl p-8
              bg-black/5 border border-rose-600/40
              dark:bg-white/5
              scale-[1.03]
            "
          >
            <span
              className="
                absolute -top-3 left-1/2 -translate-x-1/2
                px-4 py-1 text-xs rounded-full
                bg-rose-600 text-white
              "
            >
              MOST POPULAR
            </span>

            <h3 className="text-lg font-semibold dark:text-rose-500 text-black">Pro</h3>

            <p className="text-3xl font-extrabold mt-4">
              ₹99{" "}
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                / month
              </span>
            </p>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Designed for professionals who need speed, flexibility, and
              production-ready UI/UX outputs.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>• Unlimited AI UI generations</li>
              <li>• High-fidelity layouts</li>
              <li>• Export-ready design structures</li>
              <li>• Priority performance</li>
              <li>• Early access to new features</li>
            </ul>

            <button
              className="
                mt-8 w-full
                px-6 py-3 rounded-xl
                bg-rose-600 text-white font-semibold
                transition-all duration-300
                hover:bg-rose-700
                hover:-translate-y-0.5
              "
            >
              Upgrade to Pro
            </button>
          </motion.div>

          {/* TEAM */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              rounded-2xl p-8
              bg-black/5 border border-black/10
              dark:bg-white/5 dark:border-white/10
              transition-all duration-300
              hover:border-rose-600/40
            "
          >
            <h3 className="text-lg font-semibold dark:text-rose-500 text-black">
              Team / Enterprise
            </h3>

            <p className="text-3xl font-extrabold mt-4">Custom</p>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Built for teams and organizations that need collaboration,
              governance, and scalability.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li>• Team collaboration tools</li>
              <li>• Role-based access control</li>
              <li>• Custom AI workflows</li>
              <li>• Dedicated support</li>
              <li>• Enterprise security options</li>
            </ul>

            <button
              className="
                mt-8 w-full
                px-6 py-3 rounded-xl
                border border-black/20
                dark:border-white/20
                font-semibold
                transition-all duration-300
                hover:bg-black/5
                dark:hover:bg-white/5
                hover:border-rose-600/60
              "
            >
              Contact Sales
            </button>
          </motion.div>
        </div>

        {/* ================= FINAL NOTE ================= */}
        <section className="mt-32 max-w-4xl mx-auto text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold"
          >
            No Hidden Costs. Cancel Anytime.
          </motion.h2>

          <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
            You can upgrade, downgrade, or cancel your subscription at any time.
            We believe pricing should be transparent and flexible — just like
            modern product teams.
          </p>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Still unsure? Start with the free plan and upgrade when you’re ready.
          </p>
        </section>
      </div>
    </main>
  );
}
