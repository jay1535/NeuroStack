"use client";

import { useContext, useState } from "react";
import {
  Code,
  Grip,
  Copy,
  Download,
  MoreVertical,
  Trash,
  WandSparkles,
  Edit,
} from "lucide-react";
import { ScreenConfig } from "@/type/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import axios from "axios";

import { resolveTheme } from "@/data/resolveTheme";
import { htmlWrapper } from "@/data/constant";
import { SettingContext } from "@/app/context/SettingContext";
import { RefreshDataContext } from "@/app/context/RefreshDataContext";

type Props = {
  screen: ScreenConfig;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  projectId: string;
};

export default function ScreenHandler({
  screen,
  iframeRef,
  projectId,
}: Props) {
  /* ================= THEME ================= */
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { settingInfo } = useContext(SettingContext);
  const resolvedTheme = resolveTheme(settingInfo?.theme);

  /* ================= REFRESH ================= */
  const refreshCtx = useContext(RefreshDataContext)!;
  const { setRefreshData } = refreshCtx;

  /* ================= STATE ================= */
  const [editPrompt, setEditPrompt] = useState("");
  const [editing, setEditing] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  /* ================= HTML ================= */
  const wrappedHtml = htmlWrapper({
    htmlCode: screen.code,
    resolvedTheme,
  });

  /* ================= COPY ================= */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(wrappedHtml);
    toast.success("Full HTML copied");
  };

  /* ================= SCREENSHOT ================= */
  const handleDownload = async () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      await new Promise((r) => requestAnimationFrame(r));

      const canvas = await html2canvas(doc.body, {
        scale: window.devicePixelRatio || 1,
        backgroundColor: isDark ? "#000000" : "#ffffff",
        useCORS: true,
        allowTaint: false,

        ignoreElements: (el) =>
          el.tagName === "IMG" &&
          (el as HTMLImageElement).src.startsWith("http"),

        onclone: (clonedDoc) => {
          clonedDoc.querySelectorAll<HTMLElement>("*").forEach((el) => {
            const style = getComputedStyle(el);

            if (style.backgroundImage.includes("gradient")) {
              el.style.backgroundImage = "none";
            }

            if (style.backdropFilter !== "none") {
              el.style.backdropFilter = "none";

              // Safari / WebKit (TS-safe)
              (
                el.style as CSSStyleDeclaration & {
                  webkitBackdropFilter?: string;
                }
              ).webkitBackdropFilter = "none";
            }
          });
        },
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${screen.screenName || "screen"}.png`;
      link.click();

      toast.success("Screenshot downloaded");
    } catch (err) {
      console.error(err);
      toast.error("Screenshot failed");
    }
  };

  /* ================= AI EDIT ================= */
  const handleEditScreen = async () => {
    if (!editPrompt.trim()) {
      toast.error("Describe what you want to change");
      return;
    }

    const toastId = toast.loading("Regenerating screen…");

    try {
      setEditing(true);

      await axios.post("/api/edit-screen", {
        projectId,
        screenId: screen.screenId,
        userInput: editPrompt,
        oldCode: screen.code,
      });

      toast.success("Screen regenerated", { id: toastId });
      setEditPrompt("");
      setPopoverOpen(false);
      setRefreshData((v: boolean) => !v);
    } catch {
      toast.error("Failed to regenerate", { id: toastId });
    } finally {
      setEditing(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    await axios.delete("/api/generate-config", {
      data: { projectId, screenId: screen.screenId },
    });

    toast.success("Screen deleted");
    setRefreshData((v: boolean) => !v);
  };

  /* ================= RENDER ================= */
  return (
    <div className="flex items-center justify-between px-8 py-5 min-h-[96px] bg-white text-black dark:bg-black dark:text-white rounded-xl">
      {/* LEFT */}
      <div className="flex items-center gap-5">
        <Grip className="size-10 opacity-70 cursor-grab" />
        <h2 className="text-2xl font-bold">
          {screen.screenName || "Drag Here"}
        </h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* CODE */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon-lg">
              <Code className="size-8" />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[92vw] h-[96vh] p-0">
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle className="text-2xl font-bold">
                {screen.screenName || "Screen Code"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-auto">
              <SyntaxHighlighter
                language="html"
                style={isDark ? vscDarkPlus : vs}
                showLineNumbers
                customStyle={{
                  padding: "2rem",
                  fontSize: "1rem",
                  lineHeight: "1.8",
                }}
              >
                {wrappedHtml}
              </SyntaxHighlighter>
            </div>

            <div className="absolute bottom-6 right-6">
              <Button variant="ghost" onClick={handleCopy}>
                <Copy className="size-5" /> Copy
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* DOWNLOAD */}
        <Button variant="ghost" size="icon-lg" onClick={handleDownload}>
          <Download className="size-8" />
        </Button>

        {/* AI EDIT */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon-lg">
              <WandSparkles className="size-8" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-96 space-y-4">
            <Textarea
              placeholder="Regeneration Prompt…"
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              rows={4}
              className="resize-none max-h-[6.5rem]"
            />

            <Button
              onClick={handleEditScreen}
              disabled={editing}
              className="w-full"
            >
              <Edit />
              {editing ? "Regenerating…" : "Regenerate Screen"}
            </Button>
          </PopoverContent>
        </Popover>

        {/* MORE */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-lg">
              <MoreVertical className="size-8" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-600"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash className="size-5 mr-2" /> Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this screen?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
