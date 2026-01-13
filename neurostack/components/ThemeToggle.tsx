"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [rotate, setRotate] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔄 Rotate whenever theme changes
  useEffect(() => {
    if (!mounted) return;

    setRotate(true);
    const timer = setTimeout(() => setRotate(false), 700);

    return () => clearTimeout(timer);
  }, [theme, mounted]);

  if (!mounted) {
    return <div className="w-6 h-6" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="
        p-1.5
        w-8 h-8
        flex items-center justify-center
        rounded-full
        border
        transition-colors duration-200
        hover:bg-accent
        cursor-pointer
      "
    >
      {/* Icon wrapper */}
      <div
        className={`
          transition-transform duration-700 ease-in-out
          ${rotate ? "rotate-360" : ""}
        `}
      >
        {theme === "light" ? (
          <Sun className="w-4 h-4  text-purple-900" />
        ) : (
          <Moon className="w-4 h-4 text-rose-500 " />
        )}
      </div>
    </button>
  );
}
