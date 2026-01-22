"use client";

import { useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import { ScreenConfig, ProjectType } from "@/type/types";
import { themeToCssVars } from "@/data/themes";
import { resolveTheme } from "@/data/resolveTheme";

/* ================= DEVICE PRESETS ================= */
const DEVICE_MAP = {
  mobile: { width: 375, height: 812, radius: "2rem" },
  tablet: { width: 768, height: 1024, radius: "1.5rem" },
  desktop: { width: 1280, height: 800, radius: "0.9rem" },
  web: { width: 1440, height: 900, radius: "0.9rem" },
};

interface ScreenFrameProps {
  screen: ScreenConfig;
  projectDetail?: ProjectType | null;
  defaultX?: number;
  defaultY?: number;
}

/* ================= IFRAME HTML ================= */
function buildHtmlDocument(
  html?: string,
  themeKey?: string,
  device: string = "mobile"
) {
  const theme = resolveTheme(themeKey);
  const isWeb = device === "website" || device === "desktop";

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  ${
    isWeb
      ? `<meta name="viewport" content="width=1440, initial-scale=1" />`
      : `<meta name="viewport" content="width=device-width, initial-scale=1" />`
  }

  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    :root { ${themeToCssVars(theme)} }

    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      background: var(--background);
      color: var(--foreground);
      font-family: Inter, system-ui, sans-serif;
    }

    .page-root {
      ${isWeb ? "width: 1440px; margin: 0 auto;" : "width: 100%;"}
      min-height: 100vh;
    }

    * { box-sizing: border-box; }
  </style>
</head>

<body>
  <div class="page-root">${html ?? ""}</div>
</body>
</html>
`;
}

export default function ScreenFrame({
  screen,
  projectDetail,
  defaultX = 200,
  defaultY = 200,
}: ScreenFrameProps) {
  const device = projectDetail?.device ?? "mobile";

  const preset = useMemo(
    () => DEVICE_MAP[device as keyof typeof DEVICE_MAP] ?? DEVICE_MAP.mobile,
    [device]
  );

  const [size, setSize] = useState({
    width: preset.width,
    height: preset.height,
  });

  const [position, setPosition] = useState({
    x: defaultX,
    y: defaultY,
  });

  const isWeb = device === "web" || device === "desktop";

  return (
    <Rnd
      bounds="parent"
      size={size}
      position={position}
      minWidth={preset.width * 0.6}
      minHeight={preset.height * 0.6}
      dragHandleClassName="drag-handle"
      resizeGrid={[8, 8]}
      dragGrid={[8, 8]}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, pos) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        setPosition(pos);
      }}
      className="absolute z-20"
    >
      {/* ================= WRAPPER ================= */}
      <div className="relative w-full h-full">

        {/* ================= DRAG BAR (TOP, OUTSIDE FRAME) ================= */}
        <div
          className="
            drag-handle
            absolute -top-12 left-1/2 -translate-x-1/2
            z-30
            flex items-center gap-4
            px-5 py-2
            rounded-full
            bg-black/80
            border border-white/15
            backdrop-blur-md
            shadow-[0_10px_30px_rgba(0,0,0,0.45)]
            cursor-grab active:cursor-grabbing
            select-none
          "
        >
          {/* grip */}
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-sm bg-neutral-400"
              />
            ))}
          </div>

          <span className="text-xl font-medium text-neutral-200 whitespace-nowrap">
            {screen.screenName}
          </span>

          {isWeb && (
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </div>
          )}
        </div>

        {/* ================= FRAME ================= */}
        <div
          className="
            h-full w-full
            flex flex-col
            bg-white
            border border-black/10
            shadow-[0_30px_90px_rgba(0,0,0,0.55)]
            overflow-hidden
          "
          style={{ borderRadius: preset.radius }}
        >
          {/* ================= SCROLLABLE CONTENT ================= */}
          <div className="relative flex-1 overflow-auto">
            <iframe
              title={screen.screenName}
              sandbox="allow-scripts allow-same-origin"
              className="w-full h-full border-none bg-white"
              srcDoc={buildHtmlDocument(
                screen.code,
                projectDetail?.theme,
                projectDetail?.device
              )}
            />
          </div>
        </div>
      </div>
    </Rnd>
  );
}
