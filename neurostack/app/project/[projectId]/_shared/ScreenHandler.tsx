"use client";

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


import { resolveTheme } from "@/data/resolveTheme";
import { htmlWrapper } from "@/data/constant";
import { SettingContext } from "@/app/context/SettingContext";
import { useContext } from "react";

type Props = {
  screen: ScreenConfig;
};

export default function ScreenHandler({ screen }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { settingInfo } = useContext(SettingContext);
  const resolvedTheme = resolveTheme(settingInfo?.theme);

  const wrappedHtml = htmlWrapper({
    htmlCode: screen.code,
    resolvedTheme,
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(wrappedHtml);
    toast.success("Full HTML copied");
  };

  const handleDownload = () => {
    const blob = new Blob([wrappedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${screen.screenName || "screen"}.html`;
    a.click();

    URL.revokeObjectURL(url);
    toast.success("HTML downloaded");
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Grip size={22} className="opacity-70 cursor-grab" />
        <h2 className="text-sm font-semibold tracking-wide">
          {screen.screenName || "Drag Here"}
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          <Copy size={16} />
        </Button>

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
                  Full HTML (Theme + Tailwind)
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-x-auto overflow-y-auto bg-white dark:bg-black">
              <div className="min-w-max">
                <SyntaxHighlighter
                  language="html"
                  style={isDark ? vscDarkPlus : vs}
                  showLineNumbers
                  wrapLongLines={false}
                  customStyle={{
                    margin: 0,
                    background: "transparent",
                    padding: "2rem",
                    fontSize: "0.95rem",
                    lineHeight: "1.8",
                    whiteSpace: "pre",
                  }}
                >
                  {wrappedHtml}
                </SyntaxHighlighter>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
