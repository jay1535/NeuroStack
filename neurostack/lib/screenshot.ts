import html2canvas from "html2canvas";
import toast from "react-hot-toast";

const captureIframe = async (iframe: HTMLIFrameElement) => {
  const doc = iframe.contentDocument;
  if (!doc) throw new Error("iframe not ready");

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
    allowTaint: true,        // ✅ prevents failure
    imageTimeout: 0,         // ✅ prevents retries
    logging: false,          // ✅ suppresses html2canvas logs
  });
  
};

export const onTakeScreenshot = async (
  iframeRefs: React.RefObject<HTMLIFrameElement[]>,
  SCREEN_WIDTH: number,
  _SCREEN_HEIGHT: number,
  GAP: number
) => {
  try {
    const iframes = iframeRefs.current.filter(Boolean);
    if (!iframes.length) return;

    const shots: HTMLCanvasElement[] = [];

    // 1️⃣ Capture each iframe fully
    for (const iframe of iframes) {
      const doc = iframe.contentDocument;
      if (!doc) continue;

      await new Promise((r) => setTimeout(r, 200));

      const html = doc.documentElement;
      const body = doc.body;

      const width = Math.max(html.scrollWidth, body.scrollWidth);
      const height = Math.max(html.scrollHeight, body.scrollHeight);

      const canvas = await html2canvas(body, {
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

      shots.push(canvas);
    }

    if (!shots.length) return;

    // 2️⃣ Compute FINAL canvas size dynamically
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

    // 3️⃣ Draw all screens fully
    let offsetX = 0;
    shots.forEach((shot) => {
      ctx.drawImage(shot, offsetX, 0);
      offsetX += shot.width + GAP * scale;
    });

    // 4️⃣ Download
    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = "screens.png";
    a.click();
  } catch (err) {
    console.error(err);
  }
};
