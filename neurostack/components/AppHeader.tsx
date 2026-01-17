"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GithubIcon,
  Instagram,
  Menu,
  X,
  Home,
  LayoutDashboard,
  Tag,
  SunMoon,
  LogIn,
  Phone,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggleButton } from "./ThemeToggle";
import { useTheme } from "next-themes";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const GITHUB_URL = "https://github.com/jay1535";
const INSTAGRAM_URL = "https://www.instagram.com/jayant._.762/";

export default function AppHeader(): JSX.Element {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc =
    mounted && currentTheme === "light" ? "/black-logo.png" : "/logo.png";

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-black/10 dark:border-rose-500/15 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            {mounted && (
              <Image
                src={logoSrc}
                alt="NeuroStack"
                width={38}
                height={38}
                className="rounded-lg"
                priority
              />
            )}
            <span className="text-2xl font-bold tracking-tight">
              Neuro
              <span className="text-purple-600 dark:text-rose-500">
                Stack
              </span>
            </span>
          </div>

          {/* NAV (stable element, condition inside) */}
          <nav className="hidden md:flex justify-between items-center gap-5">
            {mounted && (
              <SignedIn>
                <>
                  <NavLink href="/" label="Home"  />
                  <NavLink href="/dashboard" label="Dashboard" />
                  <NavLink href="/product/pricing" label="Pricing" />
                  <NavLink href="/company/contact" label="Contact" />
                </>
              </SignedIn>
            )}
          </nav>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center justify-end gap-3">
            {mounted && (
              <>
                {!isDashboard && (
                  <>
                    <HoverIcon
                      label="GitHub"
                      onClick={() => window.open(GITHUB_URL)}
                    >
                      <GithubIcon size={18} />
                    </HoverIcon>

                    <HoverIcon
                      label="Instagram"
                      onClick={() => window.open(INSTAGRAM_URL)}
                    >
                      <Instagram size={18} />
                    </HoverIcon>
                  </>
                )}

                {/* Branded Theme Toggle */}
                <div className="rounded-full p-0.5 bg-purple-300 dark:bg-rose-900">
                  <div className="rounded-full bg-white dark:bg-black">
                    <ThemeToggleButton />
                  </div>
                </div>

                <SignedIn>
                  <UserButton />
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className=" border rounded-lg p-2 bg-purple-700 hover:bg-purple-00  text-white dark:bg-rose-500 hover:dark:bg-rose-700 transition">
                     <LogIn/> Try Now
                    </Button>
                  </SignInButton>
                </SignedOut>
              </>
            )}
          </div>

          {/* MOBILE */}
          <div className="md:hidden col-span-2 flex justify-end">
            {mounted && (
              <SignedIn>
                <IconButton onClick={() => setMenuOpen(true)}>
                  <Menu size={18} />
                </IconButton>
              </SignedIn>
            )}
          </div>
        </div>
      </header>

      {/* ================= SIDEBAR ================= */}
      {mounted && (
        <SignedIn>
          {menuOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setMenuOpen(false)}
              />

              <aside className="absolute right-0 top-0 h-full w-[80%] max-w-sm backdrop-blur-xl bg-white/90 dark:bg-black/90 border-l border-black/10 dark:border-rose-500/20 shadow-2xl flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                  <span className="text-lg font-semibold">
                    Neuro
                    <span className="text-purple-600 dark:text-rose-500">
                      Stack
                    </span>
                  </span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="h-8 w-8 rounded-full hover:bg-black/10"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-1 px-4 py-4">
                  <SidebarButton href="/" icon={<Home size={18} />} label="Home" onClick={() => setMenuOpen(false)} />
                  <SidebarButton href="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => setMenuOpen(false)} />
                  <SidebarButton href="/product/pricing" icon={<Tag size={18} />} label="Pricing" onClick={() => setMenuOpen(false)} />
                  <SidebarButton href="/company/contact" icon={<Phone size={18} />} label="Contact" onClick={() => setMenuOpen(false)} />
                </nav>

                {/* THEME CARD */}
        <div
  className="
    group mx-4 mb-4
    relative
    rounded-2xl
    border border-black/10 dark:border-white/10
    bg-white/70 dark:bg-black/60
    backdrop-blur-xl
    px-4 py-3
    flex items-center justify-between
    shadow-sm
    transition-all duration-300
    hover:shadow-md
  "
>
  {/* subtle ambient glow */}
  <div
    className="
      pointer-events-none absolute inset-0 rounded-2xl
      opacity-0 group-hover:opacity-100
      transition-opacity duration-500
      bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.15),transparent_50%)]
      dark:bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.15),transparent_50%)]
    "
  />

  {/* LEFT */}
  <div className="relative z-10 flex items-center gap-4">
    {/* Icon bubble */}
    <div
      className="
        relative h-10 w-10 rounded-full
        flex items-center justify-center
        bg-linear-to-br from-purple-500/20 to-rose-500/20
        ring-1 ring-purple-500/30 dark:ring-rose-500/30
      "
    >
      <SunMoon
        size={18}
        className="text-purple-600 dark:text-rose-400"
      />
    </div>

    {/* Text */}
    <div className="flex flex-col leading-tight">
      <span className="text-sm font-semibold tracking-wide">
        Appearance
      </span>
      <span className="text-xs text-black/60 dark:text-white/60">
        Theme preference
      </span>
    </div>
  </div>

  {/* RIGHT – Toggle */}
  <div className="relative z-10">
    <div
      className="
        rounded-full p-0.5
        bg-linear-to-r from-purple-500 to-rose-500
        shadow-lg
      "
    >
      <div className="rounded-full bg-white dark:bg-black">
        <ThemeToggleButton />
      </div>
    </div>
  </div>
</div>



                {/* USER */}
                <div className="mt-auto px-4 py-4 border-t flex gap-3 items-center">
                  <UserButton />
                  <span className="text-sm font-medium">Account</span>
                </div>
              </aside>
            </div>
          )}
        </SignedIn>
      )}
    </>
  );
}

/* ================= COMPONENTS ================= */

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} className="relative px-2 py-1 text-lg font-semibold">
      <span
        className={
          active
            ? "text-purple-700 dark:text-rose-400"
            : "text-black/70 dark:text-white/70 hover:text-purple-600 dark:hover:text-rose-400"
        }
      >
        {label}
      </span>

      {active && (
        <>
          <span className="absolute left-1/2 bottom-0 w-[45%] h-0.5 -translate-x-1/2 bg-purple-500 dark:bg-rose-500 rounded-full" />
          <span className="absolute left-1/2 bottom-1 w-[90%] h-4.5 -translate-x-1/2 bg-purple-500/30 dark:bg-rose-500/30 blur-[14px]" />
        </>
      )}
    </Link>
  );
}

function IconButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-9 w-9 rounded-full border flex items-center justify-center hover:scale-105 hover:bg-purple-600 hover:text-white dark:hover:bg-rose-500 transition"
    >
      {children}
    </button>
  );
}

function SidebarButton({ href, icon, label, onClick }: any) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-purple-600/15 text-purple-700 dark:bg-rose-500/20 dark:text-rose-400"
          : "hover:bg-purple-600/10 dark:hover:bg-rose-500/10"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function HoverIcon({ children, label, onClick }: any) {
  return (
    <div className="relative group">
      <IconButton onClick={onClick}>{children}</IconButton>
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded-md bg-black text-white dark:bg-white dark:text-black opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </div>
  );
}
