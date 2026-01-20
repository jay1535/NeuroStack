"use client";

import { useState } from "react";
import Image from "next/image";
import { Palette, Sparkle, ChevronDown, Camera, Share2, Edit, PencilLine, Pickaxe } from "lucide-react";

import { ThemeToggleButton } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  THEMES,
  THEME_NAME_LIST,
  ThemeKey,
} from "@/data/themes";


export default function Settings() {
  const [themeOpen, setThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] =
    useState<ThemeKey>("AURORA_INK");

  const activeTheme = THEMES[selectedTheme];

  const [projectName, setProjectName] = useState('');
  const [userNewScreenInput, setUserNewScreenInput] = useState<string>('');

  return (
    <div
      className="
        h-full w-full flex flex-col
        border-r border-black/10 dark:border-white/15
        bg-[#f5f5f4] dark:bg-[#1c1917]
      "
    >
      {/* ================= HEADER ================= */}
      <div className="px-3 pt-3 pb-3">
        <div className="flex items-center justify-between gap-3 select-none">
          {/* BRAND */}
          <div className="flex items-center gap-2">
            <Image
              src="/black-logo.png"
              alt="NeuroStack"
              width={28}
              height={28}
              className="block dark:hidden rounded-lg"
              priority
            />
            <Image
              src="/logo.png"
              alt="NeuroStack"
              width={28}
              height={28}
              className="hidden dark:block rounded-lg"
              priority
            />

            <span className="text-lg sm:text-xl font-bold tracking-tight">
              Neuro
              <span className="text-purple-600 dark:text-rose-500">
                Stack
              </span>
            </span>
          </div>

          {/* THEME TOGGLE (light / dark) */}
          <ThemeToggleButton />
        </div>
      </div>

      {/* ================= DIVIDER ================= */}
      <div className="h-px w-full bg-black/10 dark:bg-white/10" />

      {/* ================= CONTENT ================= */}
      <div className="flex-1 px-4 py-4 overflow-y-auto text-sm text-gray-700 dark:text-gray-300">
        {/* Project Name */}
        <div className="mb-5">
          <h2 className="text-sm flex gap-2 font-semibold mb-3">
           Project Name
          </h2>
          <Input placeholder="Project Name"
          onChange={(event)=>{
            setProjectName(event?.target.value)
          }} />
        </div>

        {/* Edit Idea */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold flex gap-2 mb-3">
            Edit your Idea
          </h2>
          <Textarea
            placeholder="Enter prompt to edit your idea"
            className="min-h-20"
            onChange={(event)=>{
                setUserNewScreenInput(event.target.value)
            }}
          />
          <Button
            size="sm"
            className="mt-2 w-full flex items-center gap-2"
          >
            <Sparkle size={16} />
            Generate with AI
          </Button>
        </div>

        {/* ================= THEME DROPDOWN ================= */}
        <div className="mb-4 relative">
          <h2 className="text-sm font-semibold  flex items-center mb-3 gap-2">
            <Palette size={16} />
            Themes
          </h2>

          {/* Dropdown Trigger */}
          <button
            onClick={() => setThemeOpen((v) => !v)}
            className="
              w-full flex items-center justify-between
              px-3 py-2
              rounded-md
              bg-white/60 dark:bg-black/30
              border border-black/10 dark:border-white/10
              hover:bg-black/5 dark:hover:bg-white/10
              transition
            "
          >
            <span className="text-sm font-medium">
              {selectedTheme
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>

            <div className="flex items-center gap-2">
              {/* Active theme colors */}
              <div className="flex gap-1">
                {[
                  activeTheme.primary,
                  activeTheme.secondary,
                  activeTheme.accent,
                ].map((color, i) => (
                  <span
                    key={i}
                    className="h-3 w-3 rounded-full border border-black/10 dark:border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <ChevronDown
                size={16}
                className={`transition ${
                  themeOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {themeOpen && (
            <div
              className="
                absolute z-50 mt-2 w-full
                rounded-md
                bg-white dark:bg-[#0d0d12]
                border border-black/10 dark:border-white/15
                shadow-lg
                max-h-56 overflow-auto
              "
            >
              {THEME_NAME_LIST.map((themeKey) => {
                const theme = THEMES[themeKey];

                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      setSelectedTheme(themeKey);
                      setThemeOpen(false);
                      console.log("Selected theme:", themeKey);
                    }}
                    className="
                      w-full flex items-center justify-between
                      px-3 py-2
                      text-sm
                      hover:bg-black/5 dark:hover:bg-white/10
                      transition
                    "
                  >
                    <span>
                      {themeKey
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>

                    <div className="flex gap-1">
                      {[
                        theme.primary,
                        theme.secondary,
                        theme.accent,
                        theme.destructive,
                      ].map((color, i) => (
                        <span
                          key={i}
                          className="h-3 w-3 rounded-full border border-black/10 dark:border-white/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

{/* ================= Extras ================= */}
<div className="mb-6">
  <h2 className="text-sm flex gap-2 font-semibold mb-3">
    Extras
  </h2>

  <div
    className="
      flex flex-col sm:flex-row
      gap-2 sm:gap-3
    "
  >
    <Button
      size="sm"
      variant="outline"
      className="
        flex items-center justify-center gap-2
        w-full sm:w-auto
      "
    >
      <Camera size={16} />
      Screenshot
    </Button>

    <Button
      size="sm"
      variant="outline"
      className="
        flex items-center justify-center gap-2
        w-full sm:w-auto
      "
    >
      <Share2 size={16} />
      Share 
    </Button>
  </div>
</div>



        


      </div>
    </div>
  );
}
