"use client";

import * as React from "react";
import Image from "next/image";
import { GithubIcon, Instagram, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggleButton } from "./ThemeToggle";
import { useTheme } from "next-themes";

const GITHUB_URL = "https://github.com/jay1535";
const INSTAGRAM_URL = "https://www.instagram.com/jayant._.762/";

export default function AppHeader(): JSX.Element {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc =
    mounted && currentTheme === "light"
      ? "/black-logo.png"
      : "/logo.png";

  const openGithub = () =>
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");

  const openInstagram = () =>
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");

  return (
    <header
      className="
        fixed top-0 z-50 w-full
        border-b backdrop-blur-xl
        bg-pink-50/90 dark:bg-background/95
        border-pink-200 dark:border-border
      "
    >
      {/* subtle rose glow */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-b from-rose-200/40 to-transparent
          dark:from-transparent
        "
      />

      <div
        className="
          relative flex items-center justify-between
          px-4 sm:px-5 py-2.5 sm:py-3
          max-w-7xl mx-auto
        "
      >
        {/* LEFT — BRAND */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {mounted && (
            <Image
              src={logoSrc}
              alt="NeuroStack Logo"
              width={28}
              height={28}
              priority
              className="sm:w-8 sm:h-8 rounded-md transition-transform hover:scale-110"
            />
          )}

          <h1
            className="
              font-extrabold tracking-tight
              text-lg sm:text-xl md:text-2xl
              whitespace-nowrap
            "
          >
            Neuro<span className="text-rose-500">Stack</span>
          </h1>
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* GitHub */}
          {isHome && (
            <button
              onClick={openGithub}
              aria-label="NeuroStack GitHub"
              className="
                group relative
                h-9 w-9 sm:h-10 sm:w-10
                sm:hover:w-28
                rounded-full border
                bg-white/70 dark:bg-background/80
                backdrop-blur overflow-hidden
                transition-all duration-500
                hover:bg-rose-200/60 dark:hover:bg-primary/10
                hover:border-rose-400 dark:hover:border-primary
              "
            >
              <GithubIcon
                className="
                  absolute left-1/2 top-1/2
                  -translate-x-1/2 -translate-y-1/2
                  h-4.5 w-4.5 sm:h-5 sm:w-5
                  transition-all duration-300
                  sm:group-hover:left-4 sm:group-hover:translate-x-0
                  text-rose-600 dark:text-primary
                "
              />

              {/* hidden on mobile */}
              <span
                className="
                  hidden sm:block
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-sm font-medium
                  text-rose-600 dark:text-primary
                  opacity-0 translate-x-4
                  transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-x-0
                "
              >
                Follow
              </span>
            </button>
          )}

          {/* Instagram */}
          {isHome && (
            <button
              onClick={openInstagram}
              aria-label="NeuroStack Instagram"
              className="
                group relative
                h-9 w-9 sm:h-10 sm:w-10
                sm:hover:w-28
                rounded-full border
                bg-white/70 dark:bg-background/80
                backdrop-blur overflow-hidden
                transition-all duration-500
                hover:bg-pink-200/60 hover:border-pink-400
              "
            >
              <Instagram
                className="
                  absolute left-1/2 top-1/2
                  -translate-x-1/2 -translate-y-1/2
                  h-4.5 w-4.5 sm:h-5 sm:w-5
                  transition-all duration-300
                  sm:group-hover:left-4 sm:group-hover:translate-x-0
                  text-pink-600
                "
              />

              {/* hidden on mobile */}
              <span
                className="
                  hidden sm:block
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-sm font-medium
                  bg-gradient-to-r from-pink-500 to-purple-500
                  bg-clip-text text-transparent
                  opacity-0 translate-x-4
                  transition-all duration-300
                  group-hover:opacity-100 group-hover:translate-x-0
                "
              >
                Follow
              </span>
            </button>
          )}

          {/* Theme Toggle */}
          <ThemeToggleButton />

          {/* User Placeholder */}
          <div
            className="
              h-9 w-9 sm:h-9 sm:w-9
              flex items-center justify-center
              rounded-full border
              bg-white/70 dark:bg-background/80
              hover:bg-rose-200/60 dark:hover:bg-accent
              transition
            "
            title="User"
          >
            <User className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
