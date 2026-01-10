"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PricingPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-32 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-rose-500">
            Simple, Transparent Pricing
          </h1>

          <p className="mt-6 text-gray-400 leading-relaxed">
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
              bg-white/5 border border-white/10
              transition-all duration-300
              hover:border-rose-600/40
            "
          >
            <h3 className="text-lg font-semibold text-rose-500">
              Free
            </h3>

            <p className="text-3xl font-extrabold mt-4">
              ₹0
            </p>

            <p className="mt-4 text-gray-400">
              Perfect for exploring NeuroStack and understanding how AI-powered
              UI/UX generation fits into your workflow.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-400">
              <li>• Limited AI UI generations</li>
              <li>• Mobile & web layouts</li>
              <li>• UX best-practice layouts</li>
              <li>• Community access</li>
            </ul>

            <button
              className="
                mt-8 w-full
                px-6 py-3 rounded-xl
                bg-white text-black font-semibold
                transition-all duration-300
                hover:bg-gray-200
              "
            >
              Get Started Free
            </button>
          </motion.div>

          {/* PRO (HIGHLIGHTED) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              relative rounded-2xl p-8
              bg-white/5 border border-rose-600/40
              scale-[1.03]
            "
          >
            <span className="
              absolute -top-3 left-1/2 -translate-x-1/2
              px-4 py-1 text-xs rounded-full
              bg-rose-600 text-white
            ">
              MOST POPULAR
            </span>

            <h3 className="text-lg font-semibold text-rose-500">
              Pro
            </h3>

            <p className="text-3xl font-extrabold mt-4">
              ₹999 <span className="text-base font-normal text-gray-400">/ month</span>
            </p>

            <p className="mt-4 text-gray-400">
              Designed for professionals who need speed, flexibility, and
              production-ready UI/UX outputs.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-400">
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
              bg-white/5 border border-white/10
              transition-all duration-300
              hover:border-rose-600/40
            "
          >
            <h3 className="text-lg font-semibold text-rose-500">
              Team / Enterprise
            </h3>

            <p className="text-3xl font-extrabold mt-4">
              Custom
            </p>

            <p className="mt-4 text-gray-400">
              Built for teams and organizations that need collaboration,
              governance, and scalability.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-gray-400">
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
                border border-white/20
                text-white font-semibold
                transition-all duration-300
                hover:bg-white/5
                hover:border-rose-600/60
              "
            >
              Contact Sales
            </button>
          </motion.div>
        </div>

        {/* ================= FAQ / NOTE ================= */}
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

          <p className="mt-6 text-gray-400 leading-relaxed">
            You can upgrade, downgrade, or cancel your subscription at any time.
            We believe pricing should be transparent and flexible — just like
            modern product teams.
          </p>

          <p className="mt-4 text-gray-400">
            Still unsure? Start with the free plan and upgrade when you’re ready.
          </p>
        </section>

      </div>
    </main>
  );
}
