import html2canvas from "html2canvas";
import axios from "axios";
import toast from "react-hot-toast";

/* ================= HELPER ================= */

const captureIframeFully = async (iframe: HTMLIFrameElement) => {
  const doc = iframe.contentDocument;
  if (!doc) throw new Error("iframe not ready");

  // allow layout to settle
  await new Promise((r) => setTimeout(r, 200));

  const html = doc.documentElement;
  const body = doc.body;

  const width = Math.max(html.scrollWidth, body.scrollWidth);
  const height = Math.max(html.scrollHeight, body.scrollHeight);

  return html2canvas(body, {
    backgroundColor: null,
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scale: window.devicePixelRatio || 1,

    useCORS: true,
    allowTaint: true,
    imageTimeout: 0,
    logging: false,
  });
};

/* ================= MAIN ================= */

export const onTakeScreenshot = async (
  iframeRefs: React.RefObject<HTMLIFrameElement[]>,
  _SCREEN_WIDTH: number, // kept for API compatibility
  _SCREEN_HEIGHT: number,
  GAP: number,
  projectId?: string
) => {
  try {
    const iframes = iframeRefs.current.filter(Boolean);
    if (!iframes.length) return;

    toast.loading("Capturing screens…", { id: "screenshot" });

    /* 1️⃣ CAPTURE EACH IFRAME FULLY */
    const shots: HTMLCanvasElement[] = [];

    for (const iframe of iframes) {
      const canvas = await captureIframeFully(iframe);
      shots.push(canvas);
    }

    if (!shots.length) return;

    /* 2️⃣ CREATE FINAL CANVAS */
    const scale = window.devicePixelRatio || 1;
    const maxHeight = Math.max(...shots.map((s) => s.height));
    const totalWidth =
      shots.reduce((acc, s) => acc + s.width, 0) +
      GAP * scale * (shots.length - 1);

    const out = document.createElement("canvas");
    out.width = totalWidth;
    out.height = maxHeight;

    const ctx = out.getContext("2d")!;
    ctx.clearRect(0, 0, out.width, out.height);

    /* 3️⃣ DRAW ALL SCREENS */
    let offsetX = 0;
    shots.forEach((shot) => {
      ctx.drawImage(shot, offsetX, 0);
      offsetX += shot.width + GAP * scale;
    });

    /* 4️⃣ DOWNLOAD LOCALLY */
    const imageBase64 = out.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageBase64;
    link.download = "project-screenshot.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    /* 5️⃣ UPLOAD IMAGE */
    const uploadRes = await axios.post("/api/upload", {
      imageBase64,
    });

    const screenshotUrl = uploadRes.data.url;

    /* 6️⃣ SAVE URL IN DB */
    if (projectId) {
      await axios.post("/api/project/screenshot", {
        projectId,
        screenshotUrl,
      });
    }

    toast.success("Screenshot saved & downloaded", {
      id: "screenshot",
    });

    return screenshotUrl;
  } catch (err) {
    console.error(err);
    toast.error("Screenshot failed", { id: "screenshot" });
  }
};
