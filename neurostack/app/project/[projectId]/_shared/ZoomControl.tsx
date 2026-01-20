"use client";

import { ZoomIn, ZoomOut } from "lucide-react";

interface ZoomControlsProps {
  zoom: number;
  setZoom: (z: number) => void;
  settingsOpen?: boolean;
}

export default function ZoomControls({
  zoom,
  setZoom,
  settingsOpen = false,
}: ZoomControlsProps) {
  return (
    <div
      className={`
        fixed bottom-5 left-1/2 -translate-x-1/2 z-40
        flex items-center gap-1 sm:gap-2
        px-2 sm:px-3 py-1.5 sm:py-2
        rounded-full
        bg-white/80 dark:bg-black/70
        border border-black/10 dark:border-white/15
        backdrop-blur-md
        shadow-sm

        transition-opacity duration-200

        ${
          settingsOpen
            ? "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto"
            : "opacity-100"
        }
      `}
    >
      {/* Zoom Out */}
      <button
        onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
        className="
          h-8 w-8 sm:h-9 sm:w-9
          flex items-center justify-center
          rounded-full
          hover:bg-black/5 dark:hover:bg-white/10
          active:scale-95
          transition
        "
        aria-label="Zoom out"
      >
        <ZoomOut size={16} />
      </button>

      {/* Zoom Percentage */}
      <span
        className="
          min-w-[44px]
          text-center
          text-xs sm:text-sm
          font-medium
          text-gray-700 dark:text-gray-300
        "
      >
        {Math.round(zoom * 100)}%
      </span>

      {/* Zoom In */}
      <button
        onClick={() => setZoom(Math.min(3, zoom + 0.1))}
        className="
          h-8 w-8 sm:h-9 sm:w-9
          flex items-center justify-center
          rounded-full
          hover:bg-black/5 dark:hover:bg-white/10
          active:scale-95
          transition
        "
        aria-label="Zoom in"
      >
        <ZoomIn size={16} />
      </button>
    </div>
  );
}
