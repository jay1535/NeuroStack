import html2canvas from "html2canvas";
import axios from "axios";
import toast from "react-hot-toast";
import type { RefObject } from "react";

/* ================= HELPER ================= */

const captureIframeFully = async (
  iframe: HTMLIFrameElement
): Promise<HTMLCanvasElement | null> => {
  // 🔒 HARD SAFETY CHECKS
  if (!iframe.isConnected) return null;

  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;

  if (!doc || !win) return null;
  if (!doc.body || !doc.documentElement) return null;
  if (!doc.defaultView) return null;

  // Allow layout & fonts to settle
  await new Promise((r) => requestAnimationFrame(r));
  await new Promise((r) => requestAnimationFrame(r));

  const html = doc.documentElement;
  const body = doc.body;

  // ✅ SAFE DIMENSIONS (CRITICAL FIX)
  const width = Math.max(
    1,
    Math.floor(
      Math.max(
        html.scrollWidth,
        body.scrollWidth,
        html.offsetWidth,
        body.offsetWidth
      )
    )
  );

  const height = Math.max(
    1,
    Math.floor(
      Math.max(
        html.scrollHeight,
        body.scrollHeight,
        html.offsetHeight,
        body.offsetHeight
      )
    )
  );

  // 🚫 Prevent non-finite values (THIS FIXES addColorStop crash)
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    return null;
  }

  return html2canvas(body, {
    backgroundColor: null,
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scale: window.devicePixelRatio || 1,

    useCORS: true,
    allowTaint: false, // ❗ MUST be false for gradients
    imageTimeout: 0,
    logging: false,

    // 🔥 STRIP PROBLEMATIC STYLES
    onclone: (clonedDoc) => {
      clonedDoc.querySelectorAll<HTMLElement>("*").forEach((el) => {
        const style = getComputedStyle(el);

        if (style.backgroundImage.includes("gradient")) {
          el.style.backgroundImage = "none";
        }

        if (style.backdropFilter !== "none") {
          el.style.backdropFilter = "none";
          (el.style as any).webkitBackdropFilter = "none";
        }
      });
    },
  });
};

/* ================= MAIN ================= */

export const onTakeScreenshot = async (
  iframeRefs: RefObject<(HTMLIFrameElement | null)[]>,
  _SCREEN_WIDTH: number,
  _SCREEN_HEIGHT: number,
  GAP: number,
  projectId?: string
): Promise<string | undefined> => {
  try {
    const iframes = iframeRefs.current?.filter(
      (iframe): iframe is HTMLIFrameElement =>
        iframe !== null && iframe.isConnected
    );

    if (!iframes || !iframes.length) return;

    toast.loading("Capturing screens…", { id: "screenshot" });

    /* 1️⃣ CAPTURE EACH IFRAME */
    const shots: HTMLCanvasElement[] = [];

    for (const iframe of iframes) {
      const canvas = await captureIframeFully(iframe);
      if (canvas) shots.push(canvas);
    }

    if (!shots.length) return;

    /* 2️⃣ CREATE FINAL CANVAS */
    const scale = window.devicePixelRatio || 1;
    const maxHeight = Math.max(...shots.map((s) => s.height));
    const totalWidth =
      shots.reduce((acc, s) => acc + s.width, 0) +
      GAP * scale * (shots.length - 1);

    if (!Number.isFinite(totalWidth) || !Number.isFinite(maxHeight)) return;

    const out = document.createElement("canvas");
    out.width = totalWidth;
    out.height = maxHeight;

    const ctx = out.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, out.width, out.height);

    /* 3️⃣ DRAW */
    let offsetX = 0;
    for (const shot of shots) {
      ctx.drawImage(shot, offsetX, 0);
      offsetX += shot.width + GAP * scale;
    }

    /* 4️⃣ EXPORT */
    const imageBase64 = out.toDataURL("image/png", 0.92);


    /* 5️⃣ UPLOAD */
    const uploadRes = await axios.post("/api/upload", { imageBase64 });
    const screenshotUrl: string = uploadRes.data.url;

    /* 6️⃣ SAVE */
    if (projectId) {
      await axios.post("/api/project/screenshot", {
        projectId,
        screenshotUrl,
      });
    }

    toast.success("Screenshot saved", { id: "screenshot" });
    return screenshotUrl;
  } catch (err) {
    console.error(err);
    toast.error("Screenshot failed", { id: "screenshot" });
  }
};
