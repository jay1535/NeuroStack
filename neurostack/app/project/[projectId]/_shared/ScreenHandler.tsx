"use client";

import { useContext } from "react";
import { Code, Grip, Copy, Download } from "lucide-react";
import { ScreenConfig } from "@/type/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";

import { resolveTheme } from "@/data/resolveTheme";
import { htmlWrapper } from "@/data/constant";
import { SettingContext } from "@/app/context/SettingContext";

type Props = {
  screen: ScreenConfig;
  iframeRef: React.RefObject<HTMLIFrameElement>;
};

export default function ScreenHandler({ screen, iframeRef }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { settingInfo } = useContext(SettingContext);
  const resolvedTheme = resolveTheme(settingInfo?.theme);

  const wrappedHtml = htmlWrapper({
    htmlCode: screen.code,
    resolvedTheme,
  });

  /* ================= COPY HTML ================= */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(wrappedHtml);
    toast.success("Full HTML copied");
  };

  /* ================= SCREENSHOT DOWNLOAD ================= */
  const handleDownload = async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const body = doc.body;

      // wait one frame to stabilize layout
      await new Promise((res) => requestAnimationFrame(res));

      const canvas = await html2canvas(body, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: false,
        scale: window.devicePixelRatio || 1,
        ignoreElements: (el) =>
          el.tagName === "IMG" &&
          (el as HTMLImageElement).src.includes("pravatar.cc"),
      });
      

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = `${screen.screenName || "screen"}.png`;
      link.click();

      toast.success("Screenshot downloaded");
    } catch (err) {
      console.error("Screenshot failed:", err);
      toast.error("Screenshot failed");
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Grip size={22} className="opacity-70 cursor-grab" />
        <h2 className="text-sm font-semibold tracking-wide">
          {screen.screenName || "Drag Here"}
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          <Copy size={16} />
        </Button>

        {/* DOWNLOAD = SCREENSHOT */}
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download size={16} />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Code size={16} />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[80vw] h-[92vh] max-w-none p-0 overflow-hidden rounded-2xl border bg-background shadow-2xl">
            <DialogHeader className="px-6 py-4 border-b bg-white dark:bg-black text-black dark:text-white">
              <DialogTitle className="flex flex-col gap-1">
                <span className="text-xl font-semibold">
                  {screen.screenName || "Screen Code"}
                </span>
                <span className="text-sm opacity-70">
                  HTML + Tailwind CSS Source Code
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-x-auto overflow-y-auto bg-white dark:bg-black relative">
              <div className="min-w-max">
                <SyntaxHighlighter
                  language="html"
                  style={isDark ? vscDarkPlus : vs}
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    background: "transparent",
                    padding: "2rem",
                    fontSize: "0.95rem",
                    lineHeight: "1.8",
                  }}
                >
                  {wrappedHtml}
                </SyntaxHighlighter>
              </div>

             
            </div>
             {/* FLOATING COPY */}
             <div className="absolute bottom-6 right-6 z-20">
                <Button
variant={'ghost'}
                  onClick={handleCopy}
                  className="bg-white  text-black dark:bg-black dark:text-white shadow-lg"
                >
                  <Copy size={16} />
                  Copy
                </Button>
              </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
