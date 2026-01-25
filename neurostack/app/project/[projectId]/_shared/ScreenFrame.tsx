"use client";

import { useContext, useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

import { resolveTheme } from "@/data/resolveTheme";
import { ProjectType, ScreenConfig } from "@/type/types";
import { SettingContext } from "@/app/context/SettingContext";
import { RefreshDataContext } from "@/app/context/RefreshDataContext";
import ScreenHandler from "./ScreenHandler";
import { htmlWrapper } from "@/data/constant";

type Props = {
  x: number;
  y: number;
  setPanningEnabled: (enabled: boolean) => void;
  width: number;
  height: number;
  htmlCode: string | undefined;
  screen: ScreenConfig;
  projectDetail: ProjectType | null;
  iframeRef: any; // ✅ KEEP AS-IS (parent passes ref collector)
};

export default function ScreenFrame({
  x,
  y,
  setPanningEnabled,
  width,
  height,
  htmlCode,
  screen,
  projectDetail,
  iframeRef, // ✅ PROP
}: Props) {
  const { settingInfo } = useContext(SettingContext);
  const resolvedTheme = resolveTheme(settingInfo?.theme);

  const refreshCtx = useContext(RefreshDataContext);
  const refreshKey = refreshCtx?.refreshData ?? false;

  // 🔹 ONLY CHANGE: rename local ref to avoid collision
  const localIframeRef = useRef<HTMLIFrameElement | null>(null);

  const [themeVersion, setThemeVersion] = useState(0);
  const [size, setSize] = useState({ width, height });

  useEffect(() => {
    setThemeVersion((v) => v + 1);
  }, [settingInfo?.theme]);

  useEffect(() => {
    setSize({ width, height });
  }, [width, height]);

  const html = htmlWrapper({
    htmlCode,
    resolvedTheme,
  });

  const measureIframeHeight = useCallback(() => {
    const iframe = localIframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const headerH = 56;
      const htmlEl = doc.documentElement;
      const body = doc.body;

      const contentH = Math.max(
        htmlEl.scrollHeight,
        body.scrollHeight,
        htmlEl.offsetHeight,
        body.offsetHeight
      );

      const next = Math.min(Math.max(contentH + headerH, 200), 2200);

      setSize((s) =>
        Math.abs(s.height - next) > 2 ? { ...s, height: next } : s
      );
    } catch {}
  }, []);

  useEffect(() => {
    const iframe = localIframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      measureIframeHeight();

      const doc = iframe.contentDocument;
      if (!doc) return;

      const observer = new MutationObserver(measureIframeHeight);
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    };

    iframe.addEventListener("load", onLoad);
    window.addEventListener("resize", measureIframeHeight);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", measureIframeHeight);
    };
  }, [measureIframeHeight, htmlCode, themeVersion]);

  useEffect(() => {
    setSize((s) => ({ ...s }));
  }, [refreshKey]);

  return (
    <Rnd
      key={`${screen.screenId}-${refreshKey}`}
      default={{ x, y, width, height }}
      size={size}
      dragHandleClassName="drag-handler"
      enableResizing={{ bottomRight: true, bottomLeft: true }}
      onDragStart={() => setPanningEnabled(false)}
      onDragStop={() => setPanningEnabled(true)}
      onResizeStart={() => setPanningEnabled(false)}
      onResizeStop={(_, __, ref) => {
        setPanningEnabled(true);
        setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
      }}
      className="absolute"
    >
      <div className="drag-handler">
        {projectDetail && (
          <ScreenHandler
            screen={screen}
            iframeRef={localIframeRef} // ✅ SAME BEHAVIOR
            projectId={projectDetail.projectId}
          />
        )}
      </div>

      <iframe
        key={themeVersion}
        ref={(el) => {
          if (!el) return;
          localIframeRef.current = el;
          iframeRef(el); // 🔹 ONLY ADDITION: expose iframe for screenshot
        }}
        className="w-full h-[calc(100%-56px)] rounded-2xl mt-2 border-none"
        sandbox="allow-same-origin allow-scripts"
        srcDoc={html}
      />
    </Rnd>
  );
}
