"use client";

import { useEffect, useMemo, useState } from "react";
import { ScreenConfig, ProjectType } from "@/type/types";
import ScreenFrame from "./ScreenFrame";

/* ================= FRAME SIZES ================= */
const FRAME_SIZE = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
  web: { width: 1440, height: 900 },
};

const GAP = 64;

interface Props {
  zoom: number;
  screens: ScreenConfig[];
  projectDetail: ProjectType | null;
  settingsOpen?: boolean;
}

export default function PlaygroundHero({
  zoom,
  screens,
  projectDetail,
  settingsOpen = false,
}: Props) {
  const device = projectDetail?.device ?? "mobile";
  const frame =
    FRAME_SIZE[device as keyof typeof FRAME_SIZE] ?? FRAME_SIZE.mobile;

  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  /* ================= VIEWPORT ================= */
  useEffect(() => {
    const update = () =>
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ================= GRID ================= */
  const grid = useMemo(() => {
    const usableWidth =
      (viewport.width - (settingsOpen ? 256 : 0)) / zoom;

    const columns = Math.max(
      1,
      Math.floor(usableWidth / (frame.width + GAP))
    );

    return { columns };
  }, [viewport, zoom, frame, settingsOpen]);

  /* ================= CENTERING LOGIC ================= */
  const totalRowWidth =
    grid.columns * frame.width + (grid.columns - 1) * GAP;

  const startX =
    Math.max(
      (viewport.width / zoom - totalRowWidth) / 2,
      GAP
    );

  const startY =
    Math.max(
      (viewport.height / zoom - frame.height) / 2,
      GAP
    );

  return (
    <section
      className={`relative h-screen w-full ${
        settingsOpen ? "pl-64" : ""
      }`}
      style={{ background: "var(--background)" }}
    >
      {/* ================= SCROLLABLE CANVAS ================= */}
      <div className="relative h-full w-full overflow-auto">
        <div
          className="relative"
          style={{
            width: Math.max(viewport.width / zoom, 5000),
            height: Math.max(viewport.height / zoom, 3000),
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          {screens.map((screen, i) => {
            const col = i % grid.columns;
            const row = Math.floor(i / grid.columns);

            const x = startX + col * (frame.width + GAP);
            const y = startY + row * (frame.height + GAP);

            return (
              <ScreenFrame
                key={screen.screenId}
                screen={screen}
                projectDetail={projectDetail}
                defaultX={x}
                defaultY={y}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
