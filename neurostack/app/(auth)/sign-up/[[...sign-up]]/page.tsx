"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white text-black overflow-hidden">

      {/* ================= LEFT ================= */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >

          {/* ===== MOBILE REGISTER ONLY ===== */}
          <div className="md:hidden mb-10 mt-10 text-center">
            <Image
              src="/black-logo.png"
              alt="NeuroStack"
              width={56}
              height={56}
              className="mx-auto mb-6"
            />

            <h1 className="text-3xl font-semibold mb-3">
              Create your account
            </h1>

            <p className="text-sm text-black/60 leading-relaxed">
              “Every great product begins with a single step.  
              Let’s build yours.”
            </p>
          </div>

          {/* ===== Clerk ===== */}
          <div className="flex items-center justify-center mb-10 mt-10">
          <SignUp
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                card: "bg-transparent shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                footer: "hidden",

                formFieldLabel: "text-sm text-black/60",

                formFieldInput: `
                  w-full px-4 py-3
                  rounded-xl
                  border border-black/20
                  bg-transparent
                  focus:outline-none
                  focus:border-black
                `,

                formButtonPrimary: `
                  w-full h-12
                  rounded-xl
                  bg-black text-white
                  font-semibold
                  hover:opacity-90
                  transition
                `,

                formFieldAction: "text-sm underline text-black",
                formResendCodeLink: "text-black underline",
              },
            }}
          />
          </div>
        </motion.div>
      </div>

      {/* ================= RIGHT (DESKTOP ONLY) ================= */}
      <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center rounded-tl-[96px] rounded-bl-[96px]">
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-sm px-12"
        >
          <Image
            src="/logo.png"
            alt="NeuroStack"
            width={150}
            height={80}
            className="mx-auto mb-10"
          />

          <p className="text-lg leading-relaxed text-white/80">
          “Every great product begins with a single step.  
          Let’s build yours.”
          </p>

          <a
            href="/sign-in"
            className="inline-block mt-10 px-10 py-3 border border-white rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Sign In
          </a>
        </motion.div>
      </div>
    </div>
  );
}
