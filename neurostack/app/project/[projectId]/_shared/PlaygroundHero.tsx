"use client";

import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ScreenConfig, ProjectType } from "@/type/types";
import ScreenFrame from "./ScreenFrame";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Minus, RefreshCcw } from "lucide-react";

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
  const isMobile = projectDetail?.device === "mobile";

  /* ================= SCREEN SIZE ================= */
  const SCREEN_WIDTH = isMobile ? 430 : 1100;
  const SCREEN_HEIGHT = isMobile ? 820 : 780;

  /* ================= GAP BETWEEN SCREENS ================= */
  const GAP_X = isMobile ? 40 : 80;

  const [panningEnabled, setPanningEnabled] = useState(true);

  const INITIAL_SCALE = isMobile ? 0.6 : 0.55;
  const INITIAL_X = 120;
  const INITIAL_Y = 80;

  return (
    <section
      className={`relative h-screen w-full overflow-hidden ${
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
              color-mix(in srgb, var(--foreground) 16%, transparent) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ================= ZOOM / PAN ================= */}
      <TransformWrapper
        initialScale={INITIAL_SCALE}
        initialPositionX={INITIAL_X}
        initialPositionY={INITIAL_Y}
        minScale={0.3}
        maxScale={2.2}
        limitToBounds={false}
        wheel={{ step: 0.08 }}
        panning={{ disabled: !panningEnabled }}
        alignmentAnimation={{ disabled: true }}
        velocityAnimation={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, setTransform }) => (
          <>
            {/* ================= CONTROLS ================= */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 rounded-xl border bg-background/80 backdrop-blur p-2 shadow-lg">
              <button
                onClick={() => zoomIn(0.2)}
                className="p-2 rounded-md hover:bg-muted transition"
              >
                <Plus size={18} />
              </button>

              <button
                onClick={() => zoomOut(0.2)}
                className="p-2 rounded-md hover:bg-muted transition"
              >
                <Minus size={18} />
              </button>

              <button
                onClick={() =>
                  setTransform(INITIAL_X, INITIAL_Y, INITIAL_SCALE, 0)
                }
                className="p-2 rounded-md hover:bg-muted transition"
              >
                <RefreshCcw size={18} />
              </button>
            </div>

            {/* ================= CANVAS ================= */}
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              <div className="relative">
                {screens.map((screen, index) => {
                  const x = index * (SCREEN_WIDTH + GAP_X);
                  const y = 0;

                  return screen.code ? (
                    <ScreenFrame
                    key={`${screen.screenId}-${index}`}   // ✅ FIX
                    x={x}
                    y={y}
                    width={SCREEN_WIDTH}
                    height={SCREEN_HEIGHT}
                    setPanningEnabled={setPanningEnabled}
                    htmlCode={screen.code}
                    screen={screen}
                    projectDetail={projectDetail}
                  />
                  
                  ) : (
                    <div
                    key={`${screen.screenId}+${index}`}
                      
                      style={{
                        width: SCREEN_WIDTH,
                        height: SCREEN_HEIGHT,
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <Skeleton className="h-full w-full rounded-xl" />
                    </div>
                  );
                })}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </section>
  );
}
