"use client";

import { useContext, useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

import { resolveTheme } from "@/data/resolveTheme";
import { ProjectType, ScreenConfig } from "@/type/types";
import { SettingContext } from "@/app/context/SettingContext";
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
};

export default function ScreenFrame({
  x,
  y,
  setPanningEnabled,
  width,
  height,
  htmlCode,
  screen,
}: Props) {
  /* ================= LIVE THEME ================= */
  const { settingInfo } = useContext(SettingContext);
  const resolvedTheme = resolveTheme(settingInfo?.theme);

  /* ================= REFS ================= */
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  /* ================= FORCE IFRAME RELOAD ================= */
  const [themeVersion, setThemeVersion] = useState(0);

  useEffect(() => {
    setThemeVersion((v) => v + 1);
  }, [settingInfo?.theme]);

  /* ================= SIZE STATE ================= */
  const [size, setSize] = useState({ width, height });

  useEffect(() => {
    setSize({ width, height });
  }, [width, height]);

  /* ================= HTML (USING WRAPPER) ================= */
  const html = htmlWrapper({
    htmlCode,
    resolvedTheme,
  });

  /* ================= AUTO HEIGHT ================= */
  const measureIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const headerH = 40;
      const htmlEl = doc.documentElement;
      const body = doc.body;

      const contentH = Math.max(
        htmlEl?.scrollHeight ?? 0,
        body?.scrollHeight ?? 0,
        htmlEl?.offsetHeight ?? 0,
        body?.offsetHeight ?? 0
      );

      const next = Math.min(Math.max(contentH + headerH, 160), 2000);

      setSize((s) =>
        Math.abs(s.height - next) > 2 ? { ...s, height: next } : s
      );
    } catch {}
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
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
        characterData: true,
      });
    };

    iframe.addEventListener("load", onLoad);
    window.addEventListener("resize", measureIframeHeight);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", measureIframeHeight);
    };
  }, [measureIframeHeight, htmlCode, themeVersion]);

  /* ================= RENDER ================= */
  return (
    <Rnd
      default={{ x, y, width, height }}
      size={size}
      dragHandleClassName="drag-handler"
      enableResizing={{ bottomRight: true, bottomLeft: true }}
      onDragStart={() => setPanningEnabled(false)}
      onDragStop={() => setPanningEnabled(true)}
      onResizeStart={() => setPanningEnabled(false)}
      onResizeStop={(_e, _dir, ref) => {
        setPanningEnabled(true);
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
      className="absolute"
    >
      <div className="drag-handler">
        <ScreenHandler screen={screen} iframeRef={iframeRef}/>
      </div>

      <iframe
        key={themeVersion}
        ref={iframeRef}
        className="w-full h-[calc(100%-40px)] border-none rounded-2xl mt-2"
        sandbox="allow-same-origin allow-scripts"
        srcDoc={html}
      />
    </Rnd>
  );
}
