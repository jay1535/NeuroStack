"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, Instagram, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    setLoading(false);
    setStatus(res.ok ? "success" : "error");
    e.currentTarget.reset();
  }

  return (
    <main className="bg-black text-white min-h-screen px-6 py-32">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-rose-500 text-center"
        >
          Contact NeuroStack
        </motion.h1>

        <p className="mt-6 text-gray-400 text-center max-w-2xl mx-auto">
          Have a question, feedback, or partnership idea?  
          Send us a message or connect via social platforms.
        </p>

        {/* ================= CONTACT GRID ================= */}
        <div className="mt-16 grid md:grid-cols-2 gap-14">

          {/* ================= SEND MESSAGE FORM ================= */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              bg-white/5 border border-white/10
              rounded-2xl p-8
            "
          >
            <h2 className="text-xl font-semibold text-white mb-6">
              Send us a message
            </h2>

            <div className="space-y-4">
              <input
                name="name"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white focus:border-rose-500 outline-none"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white focus:border-rose-500 outline-none"
              />

              <textarea
                name="message"
                required
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white focus:border-rose-500 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                mt-6 w-full flex items-center justify-center gap-2
                px-6 py-3 rounded-xl
                bg-rose-600 text-white font-semibold
                transition-all duration-300
                hover:bg-rose-700
                disabled:opacity-60
              "
            >
              <Send size={18} />
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-sm text-green-400">
                Message sent successfully ✔
              </p>
            )}

            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Try again.
              </p>
            )}
          </motion.form>

          {/* ================= SOCIAL ICONS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-xl font-semibold text-white mb-8">
              Connect with us
            </h2>

            <div className="flex gap-4">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                { icon: Github, label: "GitHub", href: "https://github.com" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Mail, label: "Email", href: "mailto:support@neurostack.ai" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  className="
                    group relative flex items-center
                    h-12 w-12
                    rounded-xl
                    bg-white/5 border border-white/10
                    overflow-hidden
                    transition-all duration-300
                    hover:border-rose-600/40
                    hover:w-36
                  "
                >
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Icon className="text-rose-500" size={20} />
                  </div>

                  <span className="
                    absolute left-12
                    text-sm text-gray-300
                    opacity-0 translate-x-4
                    transition-all duration-300
                    group-hover:opacity-100
                    group-hover:translate-x-0
                  ">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
