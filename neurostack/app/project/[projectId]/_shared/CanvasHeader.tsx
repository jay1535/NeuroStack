"use client";

import Image from "next/image";
import { Pencil, PenOff, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CanvasHeaderProps {
  onSave?: () => void;
  onOpenSettings?: () => void;
  settingsOpen?: boolean;
}

export default function CanvasHeader({
  onSave,
  onOpenSettings,
  settingsOpen = false,
}: CanvasHeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        h-14 px-6
        flex items-center justify-between
        transition-transform duration-300 ease-out
        bg-transparent
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      {/* ================= LEFT BRAND ================= */}
      <div className="flex items-center gap-3 select-none">
        <Image
          src="/black-logo.png"
          alt="NeuroStack"
          width={32}
          height={32}
          className="block dark:hidden rounded-lg"
          priority
        />
        <Image
          src="/logo.png"
          alt="NeuroStack"
          width={36}
          height={36}
          className="hidden dark:block rounded-lg"
          priority
        />

        <span className="text-2xl font-bold tracking-tight">
          Neuro
          <span className="text-purple-600 dark:text-purple-600">
            Stack
          </span>
        </span>
      </div>

      {/* ================= RIGHT ACTIONS ================= */}
      <div className="flex items-center gap-2">
        {/* Edit / Close Settings */}
        <button
          onClick={onOpenSettings}
          className="
            h-9 w-9
            flex items-center justify-center
            rounded-full
            border border-black/10 dark:border-white/15
            bg-white/70 dark:bg-black/40
            hover:bg-black/5 dark:hover:bg-white/10
            active:scale-95
            transition
          "
          aria-label={settingsOpen ? "Close settings" : "Open settings"}
        >
          {settingsOpen ? <PenOff size={18} /> : <Pencil size={18} />}
        </button>

        {/* Save */}
        <button
          onClick={onSave}
          className="
            inline-flex items-center gap-2
            rounded-md px-3 py-1.5
            text-sm font-medium text-white
            bg-purple-700 hover:bg-purple-800
            dark:bg-purple-600 dark:hover:bg-purple-600
            active:scale-95
            transition
          "
        >
          <Save size={16} />
          <span className="hidden sm:inline cursor-pointer">Save</span>
        </button>
      </div>
    </header>
  );
}
