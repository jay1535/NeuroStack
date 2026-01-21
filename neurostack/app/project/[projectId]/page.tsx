"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import PlaygroundHero from "./_shared/PlaygroundHero";
import ZoomControls from "./_shared/ZoomControl";
import CanvasHeader from "./_shared/CanvasHeader";
import Settings from "./_shared/Settings";

import { ProjectType, ScreenConfig } from "@/type/types";

export default function PlaygroundPage() {
  const { projectId } = useParams<{ projectId: string }>();

  const [zoom, setZoom] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [projectDetail, setProjectDetail] =
    useState<ProjectType | null>(null);
  const [screenConfig, setScreenConfig] =
    useState<ScreenConfig[]>([]);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // 🔒 prevents multiple Gemini calls
  const hasGeneratedRef = useRef(false);

  /* ================= FETCH PROJECT (READ ONLY) ================= */
  const fetchProject = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `/api/project?projectId=${projectId}`
      );

      const project: ProjectType = res.data?.projectDetail;
      const screens: ScreenConfig[] =
        res.data?.screenConfig ?? [];

      setProjectDetail(project);
      setScreenConfig(screens);
    } catch {
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  /* ================= INIT ================= */
  useEffect(() => {
    if (!projectId) return;
    fetchProject();
  }, [projectId]);

  /* ================= GEMINI (ONCE ONLY) ================= */
  useEffect(() => {
    if (
      !projectDetail ||
      screenConfig.length > 0 ||
      generating ||
      hasGeneratedRef.current
    ) {
      return;
    }

    hasGeneratedRef.current = true;
    generateScreenConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectDetail, screenConfig]);

  /* ================= AI ================= */
  const generateScreenConfig = async () => {
    if (!projectDetail) return;

    try {
      setGenerating(true);

      await axios.post("/api/generate-config", {
        projectId,
        deviceType: projectDetail.device,
        userInput: projectDetail.userInput,
      });

      await fetchProject(); // fetch AFTER DB is updated
      toast.success("Layout generated");
    } catch {
      toast.error("Gemini generation failed");
      hasGeneratedRef.current = false; // allow retry
    } finally {
      setGenerating(false);
    }
  };

  /* ================= LOADING SCREEN ================= */
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-[#0d0d12]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-4 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Loading project…
          </p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <CanvasHeader
        onSave={() => toast.success("Saved")}
        onOpenSettings={() => setSettingsOpen((v) => !v)}
        settingsOpen={settingsOpen}
        generating={generating}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64
        bg-white dark:bg-[#0d0d12]
        transition-transform duration-300
        ${settingsOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {projectDetail && <Settings project={projectDetail} />}
      </aside>

      <PlaygroundHero zoom={zoom} />

      <ZoomControls
        zoom={zoom}
        setZoom={setZoom}
        settingsOpen={settingsOpen}
      />
    </>
  );
}
