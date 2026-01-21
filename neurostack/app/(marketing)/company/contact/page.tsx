"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, Linkedin, Github, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    const formData = new FormData(formRef.current);

    const request = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    }).then(async (res) => {
      if (!res.ok) throw new Error("Failed");
      return res;
    });

    toast.promise(request, {
      loading: "Sending message...",
      success: "Thank You for contacting us💓",
      error: "Failed to send message ❌",
    });

    try {
      await request;
      formRef.current.reset();
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/jayant-habbu", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/jay1535", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/jayant._.762", label: "Instagram" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-white dark:bg-black text-black dark:text-white">
      {/* Back */}
      <Link href="/" className="fixed top-8 left-0 z-50">
        <div className="pl-6 pr-5 py-2 rounded-r-full bg-purple-700 dark:bg-orange-500 text-white text-sm font-semibold shadow-lg hover:pl-8 transition-all">
          ← Back
        </div>
      </Link>

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6"
      >
        <div className="w-full max-w-md rounded-3xl p-8 bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-sm">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-xs tracking-widest">
              CONTACT
            </span>
            <h2 className="text-4xl font-semibold">Let’s Talk</h2>
            <p className="mt-3 text-sm text-black/60 dark:text-white/60">
              We’d love to hear your ideas or questions.
            </p>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-black/20 dark:border-white/20 bg-transparent outline-none"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl border border-black/20 dark:border-white/20 bg-transparent outline-none"
            />
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl border border-black/20 dark:border-white/20 bg-transparent resize-none outline-none"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-purple-700  text-white dark:bg-orange-500 dark:text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

          {/* ===== MOBILE ORGANIZED SECTION ===== */}
          <div className="md:hidden mt-12 space-y-6">
            {/* Quote */}
            <div className="rounded-2xl p-5 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] text-center">
              <p className="italic text-sm text-black/70 dark:text-white/70 leading-relaxed">
                “Great conversations build great products.
                <br />Let’s start one today.”
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <span className="flex-1 h-px bg-black/20 dark:bg-white/20" />
              <span className="text-xs tracking-widest opacity-60">CONTACT US VIA</span>
              <span className="flex-1 h-px bg-black/20 dark:bg-white/20" />
            </div>

            {/* Social */}
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5">
              <div className="flex justify-center gap-6">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-xl bg-black/5 dark:bg-white/5"
                  >
                    <Icon size={22} />
                  </motion.a>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-black/50 dark:text-white/50">
                Replies within 24 hours
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT (DESKTOP) */}
      <div className="hidden md:flex w-1/2 items-center justify-center rounded-tl-[90px] rounded-bl-[90px] bg-black dark:bg-white text-white dark:text-black">
        <div className="text-center max-w-sm px-10">
          <Image
            src="/ContactUs.png"
            alt="Contact"
            width={260}
            height={260}
            priority
            className="mx-auto mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] dark:drop-shadow-[0_0_30px_rgba(0,0,0,0.25)]"
          />
          <blockquote className="italic text-lg mb-6 opacity-80">
            “Great products are built on honest conversations.”
          </blockquote>
          <p className="text-sm opacity-70 mb-10">We usually reply within 24 hours.</p>
          <div className="flex justify-center gap-5">
           {socialLinks.map(({ icon: Icon, label }) => (
  <div
    key={label}
    className="p-3 rounded-xl border border-white/40 dark:border-black/40"
  >
    <Icon size={20} />
  </div>
))}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
