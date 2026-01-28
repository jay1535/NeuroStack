"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  Palette,
  Sparkle,
  ChevronDown,
  Camera,
  Share2,
  Edit,
  PencilLine,
  MonitorCog,
} from "lucide-react";

import { ThemeToggleButton } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import toast from "react-hot-toast";

import { THEMES, THEME_NAME_LIST, ThemeKey } from "@/data/themes";
import { ProjectType } from "@/type/types";
import { SettingContext } from "@/app/context/SettingContext";
import { RefreshDataContext } from "@/app/context/RefreshDataContext";
import { useRouter } from "next/navigation";

type Props = {
  project: ProjectType;
  takeScreenshot: any;
};

export default function Settings({ project, takeScreenshot }: Props) {
  /* ================= ROUTER ================= */
  const router = useRouter();

  /* ================= CONTEXT ================= */
  const { setSettingInfo } = useContext(SettingContext);
  const {  refreshData,setRefreshData } = useContext(RefreshDataContext);

  /* ================= THEME ================= */
  const [themeOpen, setThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] =
    useState<ThemeKey>("AURORA_INK");

  const activeTheme = THEMES[selectedTheme];

  /* ================= PROJECT NAME ================= */
  const [projectName, setProjectName] = useState("");
  const [savedProjectName, setSavedProjectName] = useState("");
  const [saving, setSaving] = useState(false);

  /* ================= NEW SCREEN IDEA ================= */
  const [userNewScreenInput, setUserNewScreenInput] = useState("");
  const [generating, setGenerating] = useState(false);

  /* ================= INIT FROM PROJECT ================= */
  useEffect(() => {
    if (project?.projectName) {
      setProjectName(project.projectName);
      setSavedProjectName(project.projectName);
      setSelectedTheme(project.theme as ThemeKey);
    }
  }, [project]);

  /* ================= THEME SELECT ================= */
  const onSelectTheme = (theme: ThemeKey) => {
    setSelectedTheme(theme);
    setSettingInfo((prev: any) => ({
      ...prev,
      theme,
    }));
  };
  

  /* ================= SAVE PROJECT NAME ================= */
  const saveProjectName = async () => {
    if (!projectName.trim()) {
      toast.error("Project name cannot be empty");
      return;
    }

    if (projectName === savedProjectName) return;

    try {
      setSaving(true);

      await axios.put("/api/project", {
        projectId: project.projectId,
        projectName: projectName.trim(),
      });

      setSavedProjectName(projectName.trim());
      toast.success("Project name saved");
    } catch {
      toast.error("Failed to save project name");
      setProjectName(savedProjectName);
    } finally {
      setSaving(false);
    }
  };

  /* ================= ADD NEW SCREEN ================= */
  const generateNewScreen = async () => {
    if (!userNewScreenInput.trim()) {
      toast.error("Please describe the new screen");
      return;
    }

    try {
      setGenerating(true);
      toast.loading("Generating new screen...");

      await axios.post("/api/project/add-screen", {
        projectId: project.projectId,
        deviceType: "Website",
        userInput: userNewScreenInput,
      });

      toast.dismiss();
      toast.success("New screen added successfully ✨");
      setUserNewScreenInput("");

      setRefreshData((v: boolean) => !v);

    } catch {
      toast.dismiss();
      toast.error("Failed to generate new screen");
    } finally {
      setGenerating(false);
    }
  };

  const handleShare = async () => {
    const url = project?.screenshotUrl;
  
    if (!url) {
      toast.error("Please take a screenshot first");
      return;
    }
  
    // ✅ Native share (mobile / supported browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.projectName || "Project Preview",
          text: "Check out this project preview",
          url,
        });
        return;
      } catch {
        // fallback to clipboard
      }
    }
  
    // ✅ Clipboard fallback (desktop)
    await navigator.clipboard.writeText(url);
    toast.success("Share link copied to clipboard");
  };
  

  return (
    <div className="h-full w-full flex flex-col border-r border-black/10 dark:border-white/15 bg-[#f5f5f4] dark:bg-[#030303]">
      {/* ================= HEADER ================= */}
      <div className="px-6 pt-6 pb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/black-logo.png"
              alt="NeuroStack"
              width={34}
              height={34}
              className="block dark:hidden rounded-lg"
            />
            <Image
              src="/logo.png"
              alt="NeuroStack"
              width={34}
              height={34}
              className="hidden dark:block rounded-lg"
            />
            <span className="text-xl font-bold">
              Neuro
              <span className="text-purple-600 dark:text-purple-600">
                Stack
              </span>
            </span>
          </div>

          <ThemeToggleButton />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 px-4 py-4 overflow-y-auto text-sm">
        {/* ================= PROJECT NAME ================= */}
        <div className="mb-8">
          <h2 className="text-sm flex gap-2 font-semibold mb-3">
            <PencilLine size={16} /> Project Name
          </h2>

          <Input
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onBlur={saveProjectName}
            disabled={saving}
          />

          <Button
            size="sm"
            className="mt-2 w-full cursor-pointer"
            onClick={saveProjectName}
            disabled={saving || projectName === savedProjectName}
          >
            {saving ? "Saving…" : "Edit Project Name"}
          </Button>
        </div>

        {/* ================= ADD SCREEN ================= */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold flex gap-2 mb-3">
            <Edit size={16} /> Add a New Screen
          </h2>

          <Textarea
            rows={3}
            className="h-28 overflow-y-auto resize-none"
            placeholder="Describe the new screen you want to add"
            value={userNewScreenInput}
            onChange={(e) => setUserNewScreenInput(e.target.value)}
          />

          <Button
            size="sm"
            className="mt-2 w-full flex gap-2 cursor-pointer"
            onClick={generateNewScreen}
            disabled={generating}
          >
            <Sparkle size={16} />
            {generating ? "Generating…" : "Generate with AI"}
          </Button>
        </div>

        {/* ================= THEME DROPDOWN ================= */}
        <div className="mb-6 relative">
  <h2 className="text-sm font-semibold flex items-center mb-3 gap-2">
    <Palette size={16} />
    Themes
  </h2>

  {/* SELECT BUTTON */}
  <button
    onClick={() => setThemeOpen((v) => !v)}
    className="
      w-full flex items-center justify-between
      px-3 py-2 rounded-md
      bg-white/60 dark:bg-black/30
      border border-black/10 dark:border-white/10
      hover:bg-black/5 dark:hover:bg-white/10
      transition
    "
  >
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        {selectedTheme
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>

      {/* ACTIVE THEME COLORS */}
      <div className="flex gap-1">
        {[
          activeTheme.primary,
          activeTheme.secondary,
          activeTheme.destructive,
        ].map((color, i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-full border border-black/10 dark:border-white/20"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>

    <ChevronDown
      size={16}
      className={`transition ${themeOpen ? "rotate-180" : ""}`}
    />
  </button>

  {/* DROPDOWN */}
  {themeOpen && (
    <div
      className="
        absolute z-50 mt-2 w-full
        rounded-md
        bg-white dark:bg-[#0d0d12]
        border border-black/10 dark:border-white/15
        shadow-lg
        max-h-64 overflow-auto
      "
    >
      {THEME_NAME_LIST.map((themeKey) => {
        const theme = THEMES[themeKey];
        const isActive = selectedTheme === themeKey;

        return (
          <button
            key={themeKey}
            onClick={() => {
              onSelectTheme(themeKey);
              setThemeOpen(false);
            }}
            className={`
              w-full text-left px-3 py-2.5 transition
              ${
                isActive
                  ? "bg-purple-50 dark:bg-purple-600/10 border-l-2 border-purple-600"
                  : "hover:bg-black/5 dark:hover:bg-white/10"
              }
            `}
          >
            {/* TITLE */}
            <div className="flex items-center justify-between mb-1">
              <span
                className={`text-sm font-medium ${
                  isActive
                    ? "text-purple-700 dark:text-purple-400"
                    : ""
                }`}
              >
                {themeKey
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>

              {isActive && (
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                  Active
                </span>
              )}
            </div>

            {/* COLOR PALETTE */}
            <div className="flex gap-1.5">
              {[
                theme.primary,
                theme.secondary,
                theme.accent,
                theme.destructive,
              ].map((color, i) => (
                <span
                  key={i}
                  className="h-3.5 w-3.5 rounded-full border border-black/10 dark:border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  )}
</div>

        {/* ================= EXTRAS ================= */}
        <div className="mt-3">
          <h2 className="text-sm flex gap-2 font-semibold mb-3">
            <MonitorCog size={16} /> Options
          </h2>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => takeScreenshot()} // ✅ SCREENSHOT TRIGGER
            >
              <Camera size={16} /> Screenshot
            </Button>

            <Button size="sm" variant="outline" onClick={handleShare}>
  <Share2 size={16} /> Share
</Button>

          </div>
        </div>
      </div>
    </div>
  );
}
