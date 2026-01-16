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
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || "Failed");
    }
    return res;
  });

  toast.promise(request, {
    loading: "Sending message...",
    success: "Message sent successfully 🚀",
    error: "Failed to send message ❌",
  });

  try {
    await request;
    formRef.current.reset();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/jayant-habbu",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/jay1535",
    label: "GitHub",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/jayant._.762",
    label: "Instagram",
  },
];


  return (
<div className="relative min-h-screen flex flex-col md:flex-row bg-white dark:bg-black text-black dark:text-white">

      {/* ================= LEFT PANEL ================= */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl p-10 bg-white dark:bg-black border border-black/10 dark:border-white/10 shadow-sm">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-xs tracking-widest">
              CONTACT
            </span>
            <h2 className="text-4xl font-semibold">Let’s Talk</h2>
            <p className="mt-3 text-sm text-black/60 dark:text-white/60">
              We’d love to hear your ideas, questions, or feedback.
            </p>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              required
              placeholder="Your Name"
              className="
                w-full px-4 py-3 rounded-xl
                bg-white dark:bg-black
                border border-black/20 dark:border-white/20
                outline-none transition
                focus:border-black dark:focus:border-white
              "
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Your Email"
              className="
                w-full px-4 py-3 rounded-xl
                bg-white dark:bg-black
                border border-black/20 dark:border-white/20
                outline-none transition
                focus:border-black dark:focus:border-white
              "
            />

            <textarea
              name="message"
              required
              rows={4}
              placeholder="Tell us what’s on your mind…"
              className="
                w-full px-4 py-3 rounded-xl
                bg-white dark:bg-black
                border border-black/20 dark:border-white/20
                outline-none resize-none transition
                focus:border-black dark:focus:border-white
              "
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="
                w-full py-3 rounded-xl
                bg-black dark:bg-white
                text-white dark:text-black
                font-semibold
                flex items-center justify-center gap-2
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

          <Link
  href="/"
  className="
    fixed top-6 left-0 z-50
    group
  "
>
  <div
    className="
      pl-6 pr-5 py-2
      rounded-r-full
      bg-purple-700 dark:bg-rose-500
      text-white text-sm font-semibold
      shadow-lg
      transition-all duration-300
      hover:pl-8
    "
  >
    ← Back 
  </div>
</Link>

        </div>
      </div>

      {/* ================= RIGHT PANEL (BLACK / WHITE) ================= */}
      <div
        className="
          hidden md:flex w-1/2
          items-center justify-center
          rounded-tl-[90px] rounded-bl-[90px]
          bg-black dark:bg-white
          text-white dark:text-black
        "
      >
        <div className="text-center max-w-sm px-10">
          <Image
            src="/ContactUs.png"
            alt="Contact"
            width={260}
            height={260}
            priority
            className="
              mx-auto mb-10
              drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]
              dark:drop-shadow-[0_0_30px_rgba(0,0,0,0.25)]
            "
          />

          <blockquote className="italic text-lg mb-6 opacity-80 leading-relaxed">
            “Great products are built on honest conversations.”
          </blockquote>

          <p className="text-sm opacity-70 mb-10">
            We usually reply within 24 hours.
          </p>

          <div className="flex justify-center gap-5">
  {socialLinks.map(({ icon: Icon, href, label }) => (
    <motion.a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="
        p-3 rounded-xl
        border border-white/40 dark:border-black/40
        transition
      "
    >
      <Icon size={20} />
    </motion.a>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
