"use client";

import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import Link from "next/link";
import FooterDialog from "@/components/footer-dialog";
import {
  PrivacyPolicyContent,
  TermsContent,
} from "@/app/content/footer-content";

import { motion } from "framer-motion";
import AppHeader from "@/components/AppHeader";
import ClientOnly from "./ClientOnly";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-white text-black dark:bg-black dark:text-white overflow-x-hidden">
      <AppHeader />

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-6">
        {/* Ambient glow */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_55%)]
            dark:bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.20),transparent_55%)]
          "
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9 }}
          className="relative max-w-4xl text-center"
        >
          {/* Eyebrow */}
          <span
            className="
              inline-block mb-4 mt-3 px-3 py-1 rounded-full
              bg-black/5 text-gray-600
              dark:bg-white/5 dark:text-gray-300
              text-[11px] sm:text-xs tracking-widest
            "
          >
            AI UI/UX PLATFORM
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            AI-Powered{" "}
            <span className="dark:text-rose-500 text-purple-700">
              UI/UX Design
            </span>
            <br /> for Mobile & Web
          </h1>

          {/* Description */}
          <p
            className="
              mt-5 text-base sm:text-lg
              text-gray-600 dark:text-gray-400
              max-w-2xl mx-auto leading-relaxed
            "
          >
            NeuroStack turns product ideas into clean, production-ready UI/UX for
            mobile apps and modern web platforms — in minutes.
          </p>

          {/* ================= CTA BUTTONS ================= */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <div className="w-full sm:w-auto">
           
            <ClientOnly>
  <SignedIn>
    <Button
      onClick={() => router.push("/dashboard")}
      className="
        relative
        mx-auto
        w-[80%] sm:w-auto
        px-6 sm:px-12
        py-3
        rounded-xl
        bg-black text-white
        dark:bg-white dark:text-black
        font-semibold tracking-wide
        h-12
        transition-all duration-300 ease-out
        hover:scale-[1.03]
        active:scale-[0.96]
        shadow-[0_8px_24px_rgba(0,0,0,0.25)]
        dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)]
      "
    >
      Go to Dashboard
    </Button>
  </SignedIn>

  <SignedOut>
    <Button
      onClick={() => router.push("/sign-up")}
      className="
        relative
        mx-auto
        w-[80%] sm:w-auto
        px-6 sm:px-12
        py-3
        rounded-xl
        bg-black text-white
        dark:bg-white dark:text-black
        font-semibold tracking-wide
        h-12
        transition-all duration-300 ease-out
        hover:scale-[1.03]
        active:scale-[0.96]
        shadow-[0_8px_24px_rgba(0,0,0,0.25)]
        dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)]
      "
    >
      Get Started
    </Button>
  </SignedOut>
</ClientOnly>

            </div>
          </div>

          {/* Feature strip */}
          <div
            className="
              mt-10 grid grid-cols-1 sm:grid-cols-3
              gap-4 text-sm
              text-gray-600 dark:text-gray-400
            "
          >
            {[
              "AI-generated UI screens",
              "Mobile & web-ready layouts",
              "UX best practices built-in",
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-32 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Everything You Need to Design Faster
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400 text-center max-w-xl mx-auto">
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
                  bg-black/5 border border-black/10
                  dark:bg-white/5 dark:border-white/10
                  transition-all duration-300
                  hover:border-rose-600/40
                  hover:-translate-y-1
                "
              >
                <h3 className="text-lg font-semibold dark:text-rose-500 text-purple-700">
                  {title}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

         {/* ================= PRODUCT PREVIEW ================= */}
      <section className="py-32 px-6 bg-neutral-100 dark:bg-neutral-950 min-h-screen">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="
              inline-block mb-4 px-4 py-1 rounded-full
              bg-black/5 text-gray-600
              dark:bg-white/5 dark:text-gray-300
              text-xs tracking-widest
            ">
              AI WORKFLOW
            </span>

            <h2 className="text-4xl font-extrabold leading-tight">
              From Prompt to{" "}
              <span className="dark:text-rose-500 text-purple-700">Production UI</span>
            </h2>

            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-xl">
              Describe your product idea in plain language.
              NeuroStack transforms it into structured UI screens and UX flows.
            </p>

            <ul className="mt-8 space-y-4 text-gray-600 dark:text-gray-400">
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
            <div className="
              relative h-80 rounded-3xl
              border border-black/10
              bg-black/5
              dark:border-white/10 dark:bg-white/5
              backdrop-blur-xl p-6
            ">
              <div className="h-full rounded-2xl bg-linear-to-br from-white/10 to-transparent flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm tracking-wide">
                  AI-GENERATED UI PREVIEW
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-36 px-6 bg-neutral-100 dark:bg-neutral-950 min-h-screen">
        <ClientOnly>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span
            className="
              inline-block mb-6 px-4 py-1 rounded-full
              bg-black/5 text-gray-600
              dark:bg-white/5 dark:text-gray-300
              text-xs tracking-widest
            "
          >
            GET STARTED
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Design Faster with{" "}
            <span className="dark:text-rose-500 text-purple-700">
              NeuroStack
            </span>
          </h2>

          <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Turn ideas into beautiful, production-ready UI/UX in minutes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
  <div className="w-full sm:w-auto">
   
      <SignedIn>
       <Button
  onClick={() => router.push("/dashboard")}
  className="
    relative
    mx-auto
    w-[80%] sm:w-auto
    h-12
    px-6 sm:px-12
    py-3
    rounded-xl

    bg-black text-white
    dark:bg-white dark:text-black
    font-semibold tracking-wide

    transition-all duration-300 ease-out
    hover:scale-[1.03]
    active:scale-[0.96]

    shadow-[0_8px_24px_rgba(0,0,0,0.25)]
    dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)]
  "
>
Try NeuroStack
</Button>


      </SignedIn>

      <SignedOut>
        <SignUpButton mode="modal">
          <Button
            className="
              relative
    mx-auto
    w-[80%] sm:w-auto
    px-6 sm:px-12
    py-3
    rounded-xl
    h-12

    bg-black text-white
    dark:bg-white dark:text-black
    font-semibold tracking-wide

    transition-all duration-300 ease-out
    hover:scale-[1.03]
    active:scale-[0.96]

    shadow-[0_8px_24px_rgba(0,0,0,0.25)]
    dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)]
            "
          >
            Get Started
          </Button>
        </SignUpButton>
      </SignedOut>
    
  </div>
</div>


          <p className="mt-6 text-xs text-gray-500">
            No credit card required • Free to get started
          </p>
        </motion.div>
        </ClientOnly>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-black/10 dark:border-white/10 py-20 px-6">
        <div className="max-w-6xl mx-auto grid gap-14 md:grid-cols-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="text-black dark:text-white text-lg font-semibold">
              NeuroStack
            </h3>
            <p className="mt-4 leading-relaxed">
              NeuroStack is an AI-powered UI/UX generation platform that helps teams
              design modern, scalable interfaces.
            </p>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-semibold">Product</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/product/features">Features</Link></li>
              <li><Link href="/product/pricing">Pricing</Link></li>
              <li><Link href="/product/roadmap">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-semibold">Company</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/company/about">About Us</Link></li>
              <li><Link href="/company/contact">Contact</Link></li>
              <li><Link href="/company/careers">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-semibold">Legal</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <FooterDialog
                  title="Privacy Policy"
                  content={PrivacyPolicyContent}
                  storageKey="privacy-accepted"
                />
              </li>
              <li>
                <FooterDialog
                  title="Terms & Conditions"
                  content={TermsContent}
                  storageKey="terms-accepted"
                />
              </li>
            </ul>
          </div>
        </div>

        {/* 🚫 NO dynamic date */}
        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 text-center">
          <p className="text-xs text-gray-500">
            © 2026 NeuroStack. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Built with AI • Designed for modern product teams
          </p>
        </div>
      </footer>
    </main>
  );
}
