"use client";

import { useState } from "react";
import PlaygroundHero from "@/app/project/[projectId]/_shared/PlaygroundHero";
import ZoomControls from "@/app/project/[projectId]/_shared/ZoomControl";
import CanvasHeader from "./_shared/CanvasHeader";
import Settings from "./_shared/Settings";

export default function PlaygroundPage() {
  const [zoom, setZoom] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      {/* ================= HEADER ================= */}
      <CanvasHeader
  onSave={() => console.log("Saved")}
  onOpenSettings={() => setSettingsOpen((v) => !v)}
  settingsOpen={settingsOpen}
/>


      {/* ================= SETTINGS SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen

          /* Mobile-first width */
          w-64 sm:w-72

          bg-white dark:bg-[#0d0d12]
          border-r border-black/10 dark:border-white/15

          transition-transform duration-300 ease-out
          ${settingsOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Settings />
      </aside>

      {/* ================= CANVAS ================= */}
      <PlaygroundHero zoom={zoom} />

      {/* ================= ZOOM CONTROLS ================= */}
      <ZoomControls
  zoom={zoom}
  setZoom={setZoom}
  settingsOpen={settingsOpen}
/>

    </>
  );
}
