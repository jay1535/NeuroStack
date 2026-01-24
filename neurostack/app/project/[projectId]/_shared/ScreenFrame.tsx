"use client";

import { useContext, useCallback, useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { Grip } from "lucide-react";

import { themeToCssVars } from "@/data/themes";
import { resolveTheme } from "@/data/resolveTheme";
import { ProjectType, ScreenConfig } from "@/type/types";
import { SettingContext } from "@/app/context/SettingContext";
import ScreenHandler from "./ScreenHandler";

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

  /* ================= HTML TEMPLATE ================= */
  const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <link
    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
    rel="stylesheet"
  />

  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    rel="stylesheet"
  />

  <style>
    :root {
      ${themeToCssVars(resolvedTheme)}
    }

    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      background: var(--background);
      color: var(--foreground);
      font-family: Inter, system-ui, sans-serif;
    }

    body, body * {
      color: var(--foreground) !important;
    }
  </style>
</head>

<body class="w-full">
  ${htmlCode ?? ""}
</body>
</html>
`;

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
  <ScreenHandler screen={screen} />
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
