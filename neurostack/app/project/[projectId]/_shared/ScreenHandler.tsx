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
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

type Props = {
  screen: ScreenConfig;
};

export default function ScreenHandler({ screen }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(screen.code || "");
    toast.success("Code copied");
  };

  const handleDownload = () => {
    const blob = new Blob([screen.code || ""], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${screen.screenName || "screen"}.html`;
    a.click();

    URL.revokeObjectURL(url);
    toast.success("Code downloaded");
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
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
        >
          <Copy size={16} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleDownload}
        >
          <Download size={16} />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Code size={16} />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[94vw] h-[92vh] max-w-none p-0 overflow-hidden rounded-2xl border bg-background shadow-2xl">
            {/* THEME RESPONSIVE HEADER */}
            <DialogHeader
              className="
                px-6 py-4 border-b
                bg-white text-black
                dark:bg-black dark:text-white
              "
            >
              <DialogTitle className="flex flex-col gap-1">
                <span className="text-xl font-semibold">
                  {screen.screenName || "Screen Code"}
                </span>
                <span className="text-sm opacity-70">
                  HTML Source Code Preview
                </span>
              </DialogTitle>
            </DialogHeader>

            {/* CODE AREA */}
            <div className="flex-1 overflow-x-auto overflow-y-auto bg-white ">
              <div className="min-w-max">
                <SyntaxHighlighter
                  language="html"
                  style={vs}
                  showLineNumbers
                  wrapLongLines={false}
                  customStyle={{
                    margin: 0,
                    background: "transparent",
                    padding: "2rem",
                    fontSize: "1rem",
                    lineHeight: "1.8",
                    whiteSpace: "pre",
                  }}
                  lineNumberStyle={{
                    color: isDark ? "#888" : "#444",
                    paddingRight: "1.25rem",
                    minWidth: "3.5rem",
                  }}
                >
                  {screen.code || "<!-- No code available -->"}
                </SyntaxHighlighter>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
