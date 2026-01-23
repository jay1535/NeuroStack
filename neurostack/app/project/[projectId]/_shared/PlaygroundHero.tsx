"use client";

import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ScreenConfig, ProjectType } from "@/type/types";
import ScreenFrame from "./ScreenFrame";
import { Skeleton } from "@/components/ui/skeleton";


interface Props {
  zoom: number;
  screens: ScreenConfig[];
  projectDetail: ProjectType | null;
  settingsOpen?: boolean;
}

/* ================= SHADCN SKELETON FRAME ================= */
function SkeletonFrame({
  width,
  height,
  x,
  y,
}: {
  width: number;
  height: number;
  x: number;
  y: number;
}) {
  return (
    <div
      className="absolute"
      style={{
        width,
        height,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <div
        className="
          h-full w-full overflow-hidden rounded-xl
          border border-border
          bg-card
          shadow-sm
        "
      >
        {/* Top bar */}
        <Skeleton
          className="
            h-12 w-full rounded-none
            bg-gray-200
            dark:bg-muted/40
          "
        />

        {/* Content */}
        <div className="p-6 space-y-4">
          <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-muted/40" />
          <Skeleton className="h-10 w-1/2 bg-gray-200 dark:bg-muted/40" />
          <Skeleton className="h-40 w-2/3 bg-gray-200 dark:bg-muted/40" />
          <Skeleton className="h-20 w-full bg-gray-200 dark:bg-muted/30" />
          <Skeleton className="h-32 w-1/2 bg-gray-200 dark:bg-muted/30" />
          <Skeleton className="h-50 w-full bg-gray-200 dark:bg-muted/30" />
        </div>
      </div>
    </div>
  );
}


export default function PlaygroundHero({
  zoom,
  screens,
  projectDetail,
  settingsOpen = false,
}: Props) {
  const isMobile = projectDetail?.device === "mobile";

  const SCREEN_WIDTH = isMobile ? 400 : 1200;
  const SCREEN_HEIGHT = isMobile ? 800 : 800;
  const GAP = isMobile ? 10 : 30;

  const [panningEnabled, setPanningEnabled] = useState(true);

  return (
    <section
      className={`relative h-screen w-full ${
        settingsOpen ? "pl-64" : ""
      }`}
      style={{ background: "var(--background)" }}
    >
      {/* ================= DOTTED BACKGROUND ================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(
              circle,
              color-mix(in srgb, var(--foreground) 18%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ================= ZOOM / PAN ================= */}
      <TransformWrapper
        initialScale={zoom}
        initialPositionX={50}
        initialPositionY={100}
        minScale={0.5}
        maxScale={3}
        limitToBounds={false}
        wheel={{ step: 0.08 }}
        panning={{ disabled: !panningEnabled }}
      >
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <div className="relative">
            {screens.map((screen, index) => {
              const x = index * (SCREEN_WIDTH + GAP);
              const y = 0;

              return screen.code ? (
                <ScreenFrame
                  key={screen.screenId}
                  x={x}
                  y={y}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  setPanningEnabled={setPanningEnabled}
                  htmlCode={screen.code}
                  projectDetail={projectDetail}
                />
              ) : (
                <SkeletonFrame
                  key={screen.screenId}
                  x={x}
                  y={y}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                />
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </section>
  );
}
