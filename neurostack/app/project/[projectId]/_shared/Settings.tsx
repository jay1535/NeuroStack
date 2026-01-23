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

type Props = {
  project: ProjectType;
};

export default function Settings({ project }: Props) {
  /* ================= THEME ================= */
  const [themeOpen, setThemeOpen] = useState(false);
  const { settingInfo, setSettingInfo } = useContext(SettingContext);

  const [selectedTheme, setSelectedTheme] =
    useState<ThemeKey>("AURORA_INK");

  const activeTheme = THEMES[selectedTheme];

  /* ================= PROJECT NAME ================= */
  const [projectName, setProjectName] = useState("");
  const [savedProjectName, setSavedProjectName] = useState("");
  const [saving, setSaving] = useState(false);

  /* ================= IDEA ================= */
  const [userNewScreenInput, setUserNewScreenInput] = useState("");

  /* ================= INIT FROM DB ================= */
  useEffect(() => {
    if (project?.projectName) {
      setProjectName(project.projectName);
      setSavedProjectName(project.projectName);
      setSelectedTheme(project.theme as ThemeKey);
    }
  }, [project]);

  const onSelectTheme = (theme: ThemeKey) => {
    setSelectedTheme(theme);
    setSettingInfo((prev: any) => ({
      ...prev,
      theme,
    }));
  };

  /* ================= SAVE / OVERWRITE ================= */
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

  return (
    <div className="h-full w-full flex flex-col border-r border-black/10 dark:border-white/15 bg-[#f5f5f4] dark:bg-[#1c1917]">
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
              <span className="text-purple-600 dark:text-orange-600">
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

        {/* ================= EDIT IDEA ================= */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold flex gap-2 mb-3">
            <Edit size={16} /> Edit your Idea
          </h2>

          <Textarea
            placeholder="Enter prompt to edit your idea"
            value={userNewScreenInput}
            onChange={(e) => setUserNewScreenInput(e.target.value)}
          />

          <Button size="sm" className="mt-2 w-full flex gap-2 cursor-pointer">
            <Sparkle size={16} />
            Generate with AI
          </Button>
        </div>

        {/* ================= THEME DROPDOWN ================= */}
        <div className="mb-6 relative">
          <h2 className="text-sm font-semibold flex items-center mb-3 gap-2">
            <Palette size={16} />
            Themes
          </h2>

          <button
            onClick={() => setThemeOpen((v) => !v)}
            className="
              w-full flex items-center justify-between
              px-3 py-2
              rounded-md
              bg-white/60 dark:bg-black/30
              border border-black/10 dark:border-white/10
              hover:bg-black/5 dark:hover:bg-white/10
              transition
              
            "
          >
            <span className="text-sm font-medium">
              {selectedTheme
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>

            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[
                  activeTheme.primary,
                  activeTheme.secondary,
                  activeTheme.accent,
                ].map((color, i) => (
                  <span
                    key={i}
                    className="h-3 w-3 rounded-full border border-black/10 dark:border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <ChevronDown
                size={16}
                className={`transition ${
                  themeOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {themeOpen && (
            <div className="
              absolute z-50 mt-2 w-full
              rounded-md
              bg-white dark:bg-[#0d0d12]
              border border-black/10 dark:border-white/15
              shadow-lg
              max-h-56 overflow-auto
            ">
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
                      w-full text-left
                      px-3 py-2.5
                      transition
                      ${
                        isActive
                          ? "bg-purple-50 dark:bg-orange-600/10 border-l-2 border-purple-600 dark:border-orange-600"
                          : "hover:bg-black/5 dark:hover:bg-white/10"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-purple-700 dark:text-orange-400"
                            : ""
                        }`}
                      >
                        {themeKey
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>

                      {isActive && (
                        <span className="text-xs font-semibold text-purple-600 dark:text-orange-400">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      {[
                        theme.primary,
                        theme.secondary,
                        theme.accent,
                        theme.destructive,
                      ].map((color, i) => (
                        <span
                          key={i}
                          className="h-3 w-3 rounded-full border border-black/10 dark:border-white/20"
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
            <Button size="sm" variant="outline">
              <Camera size={16} /> Screenshot
            </Button>
            <Button size="sm" variant="outline">
              <Share2 size={16} /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
