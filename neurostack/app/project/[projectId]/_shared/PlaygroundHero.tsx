"use client";

import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ScreenConfig, ProjectType } from "@/type/types";
import ScreenFrame from "./ScreenFrame";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Minus, RefreshCcw } from "lucide-react";

import { onTakeScreenshot } from "@/lib/screenshot";

interface Props {
  zoom: number;
  screens: ScreenConfig[];
  projectDetail: ProjectType | null;
  settingsOpen?: boolean;
  takeScreenshot: number;
}

export default function PlaygroundHero({
  zoom,
  screens,
  projectDetail,
  settingsOpen = false,
  takeScreenshot,
}: Props) {
  const isMobile = projectDetail?.device === "mobile";

  const SCREEN_WIDTH = isMobile ? 430 : 1100;
  const SCREEN_HEIGHT = isMobile ? 820 : 780;
  const GAP_X = isMobile ? 40 : 80;

  const [panningEnabled, setPanningEnabled] = useState(true);

  // 🔹 SCREENSHOT – iframe storage
  const iframeRefs = useRef<HTMLIFrameElement[]>([]);

  const INITIAL_SCALE = isMobile ? 0.6 : 0.55;
  const INITIAL_X = 120;
  const INITIAL_Y = 80;
  const projectId = projectDetail?.projectId ?? null;

  useEffect(() => {
    if (!takeScreenshot || !projectId) return;
  
    onTakeScreenshot(
      iframeRefs,
      SCREEN_WIDTH,
      SCREEN_HEIGHT,
      GAP_X,
      projectId
    ).then(() => {
      // 🔹 FORCE PROJECT REFRESH
      window.dispatchEvent(new Event("project-screenshot-updated"));
    });
    
  }, [takeScreenshot, projectId]);
  
  

  return (
    <section
      className={`relative h-screen w-full overflow-hidden ${
        settingsOpen ? "pl-64" : ""
      }`}
    >
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


      <TransformWrapper
        initialScale={INITIAL_SCALE}
        initialPositionX={INITIAL_X}
        initialPositionY={INITIAL_Y}
        minScale={0.3}
        maxScale={2.2}
        limitToBounds={false}
        panning={{ disabled: !panningEnabled }}
      >
        {({ zoomIn, zoomOut, setTransform }) => (
          <>
            {/* ZOOM CONTROLS */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 rounded-xl border bg-background/80 p-2 shadow-lg">
              <button onClick={() => zoomIn(0.2)}>
                <Plus size={18} />
              </button>
              <button onClick={() => zoomOut(0.2)}>
                <Minus size={18} />
              </button>
              <button
                onClick={() =>
                  setTransform(INITIAL_X, INITIAL_Y, INITIAL_SCALE)
                }
              >
                <RefreshCcw size={18} />
              </button>
            </div>

            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              <div className="relative">
                {screens.map((screen, index) => {
                  const x = index * (SCREEN_WIDTH + GAP_X);

                  return screen.code ? (
                    <ScreenFrame
                      key={`${screen.screenId}-${index}`}
                      x={x}
                      y={0}
                      width={SCREEN_WIDTH}
                      height={SCREEN_HEIGHT}
                      setPanningEnabled={setPanningEnabled}
                      htmlCode={screen.code}
                      screen={screen}
                      projectDetail={projectDetail}
                      iframeRef={(iframe) => {
                        if (!iframe) return;
                        iframeRefs.current[index] = iframe;
                      }}
                    />
                  ) : (
                    <div
                      key={screen.screenId}
                      className="absolute"
                      style={{
                        width: SCREEN_WIDTH,
                        height: SCREEN_HEIGHT,
                        transform: `translate(${x}px, 0)`,
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
