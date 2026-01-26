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

export default function AppHeader() {
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
      <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-black/10 dark:border-purple-600/15 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
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
              <span className="text-purple-600">Stack</span>
            </span>
          </div>

          {/* NAV */}
          <nav className="hidden md:flex justify-center gap-5">
            {mounted && (
              <SignedIn>
                <>
                  <NavLink href="/" label="Home" />
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

                <div className="rounded-full p-0.5 bg-purple-300 dark:bg-purple-900">
                  <div className="rounded-full bg-white dark:bg-black">
                    <ThemeToggleButton />
                  </div>
                </div>

                <SignedIn>
                  <UserButton />
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="bg-purple-700 text-white hover:bg-purple-800">
                      <LogIn className="mr-2" /> Try Now
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

              <aside className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-black shadow-2xl flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b">
                  <span className="text-lg font-semibold">
                    Neuro<span className="text-purple-600">Stack</span>
                  </span>
                  <button onClick={() => setMenuOpen(false)}>
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1 px-4 py-4">
                  <SidebarButton
                    href="/"
                    icon={<Home size={18} />}
                    label="Home"
                    onClick={() => setMenuOpen(false)}
                  />
                  <SidebarButton
                    href="/dashboard"
                    icon={<LayoutDashboard size={18} />}
                    label="Dashboard"
                    onClick={() => setMenuOpen(false)}
                  />
                  <SidebarButton
                    href="/product/pricing"
                    icon={<Tag size={18} />}
                    label="Pricing"
                    onClick={() => setMenuOpen(false)}
                  />
                  <SidebarButton
                    href="/company/contact"
                    icon={<Phone size={18} />}
                    label="Contact"
                    onClick={() => setMenuOpen(false)}
                  />
                </nav>

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

/* ================= SUB COMPONENTS ================= */

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} className="text-lg font-semibold">
      <span
        className={
          active
            ? "text-purple-700"
            : "text-black/70 hover:text-purple-600 dark:text-white/70"
        }
      >
        {label}
      </span>
    </Link>
  );
}

function IconButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-purple-600 hover:text-white transition"
    >
      {children}
    </button>
  );
}

function SidebarButton({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-purple-600/15 text-purple-700"
          : "hover:bg-purple-600/10"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function HoverIcon({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="relative group">
      <IconButton onClick={onClick}>{children}</IconButton>
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded-md bg-black text-white opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </div>
  );
}
