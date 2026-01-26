"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import PlaygroundHero from "./_shared/PlaygroundHero";
import CanvasHeader from "./_shared/CanvasHeader";
import Settings from "./_shared/Settings";
import TopLoader from "./_shared/TopLoader";

import { ProjectType, ScreenConfig } from "@/type/types";
import { SettingContext } from "@/app/context/SettingContext";
import { RefreshDataContext } from "@/app/context/RefreshDataContext";

export default function PlaygroundPage() {
  const { projectId } = useParams<{ projectId: string }>();

  /* ================= UI STATE ================= */
  const [zoom, setZoom] = useState(0.7);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [takeScreenshot, setTakeScreenshot] = useState<any>();

  /* ================= DATA STATE ================= */
  const [projectDetail, setProjectDetail] =
    useState<ProjectType | null>(null);
  const [screenConfig, setScreenConfig] = useState<ScreenConfig[]>([]);

  /* ================= LOADING ================= */
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] =
    useState("Loading project…");

  const { settingInfo, setSettingInfo } =
    useContext(SettingContext);

  /* ================= REFRESH CONTEXT ================= */
  const [refreshData, setRefreshData] = useState(false);

  /* ================= PIPELINE GUARDS ================= */
  const configGenerated = useRef(false);
  const uiGenerated = useRef(false);
  const fetchingRef = useRef(false);

  /* ================= FETCH PROJECT ================= */
  const fetchProject = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      setLoading(true);
      setLoadingMessage("Loading project…");

      const res = await axios.get(
        `/api/project?projectId=${projectId}`
      );

      setProjectDetail(res.data.projectDetail);
      setScreenConfig(res.data.screenConfig ?? []);
      setSettingInfo(res.data.projectDetail);
    } catch {
      toast.error("Failed to load project");
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  };

  /* ================= REFRESH LISTENER ================= */
  useEffect(() => {
    const handler = () =>
      setRefreshData((v: boolean) => !v);

    window.addEventListener(
      "project-screenshot-updated",
      handler
    );

    return () =>
      window.removeEventListener(
        "project-screenshot-updated",
        handler
      );
  }, []);

  /* ================= INITIAL + REFRESH FETCH ================= */
  useEffect(() => {
    if (!projectId) return;
    fetchProject();
  }, [projectId, refreshData]);

  /* ================= GENERATION PIPELINE ================= */
  useEffect(() => {
    if (!projectDetail || loading) return;

    if (
      screenConfig.length === 0 &&
      !configGenerated.current
    ) {
      configGenerated.current = true;
      generateConfig();
      return;
    }

    if (
      screenConfig.length > 0 &&
      screenConfig.some((s) => !s.code) &&
      !uiGenerated.current
    ) {
      uiGenerated.current = true;
      generateUI();
    }
  }, [projectDetail?.projectId, screenConfig.length]);

  /* ================= GENERATE CONFIG ================= */
  const generateConfig = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Generating screen structure…");

      await axios.post("/api/generate-config", {
        projectId,
        deviceType: projectDetail?.device,
        userInput: projectDetail?.userInput,
      });

      await fetchProject();
    } catch {
      configGenerated.current = false;
    } finally {
      setLoading(false);
    }
  };

  /* ================= GENERATE UI ================= */
  const generateUI = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Generating screen UI…");

      for (const screen of screenConfig) {
        if (screen.code) continue;

        await axios.post("/api/generate-screen", {
          projectId,
          deviceType: projectDetail?.device,
          screenId: screen.screenId,
          screenName: screen.screenName,
          purpose: screen.purpose,
          screenDescription: screen.screenDescription,
        });
      }

      await fetchProject();
      toast.success("All screens generated");
    } catch {
      uiGenerated.current = false;
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE ================= */
  const saveAllChanges = async () => {
    if (!projectDetail) return;

    try {
      await axios.put("/api/project", {
        projectId: projectDetail.projectId,
        projectName: projectDetail.projectName,
        theme: settingInfo?.theme,
      });

      toast.success("Project saved");
    } catch {
      toast.error("Failed to save project");
    }
  };

  /* ================= RENDER ================= */
  return (
    <RefreshDataContext.Provider
      value={{ refreshData, setRefreshData }}
    >
      <CanvasHeader
        onSave={saveAllChanges}
        onOpenSettings={() =>
          setSettingsOpen((v) => !v)
        }
        settingsOpen={settingsOpen}
      />

      <TopLoader
        visible={loading}
        message={loadingMessage}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-[#0d0d12]
        transition-transform duration-300 ${
          settingsOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {projectDetail && (
          <Settings
            project={projectDetail}
            takeScreenshot={() =>
              setTakeScreenshot(Date.now())
            }
          />
        )}
      </aside>

      <PlaygroundHero
        zoom={zoom}
        screens={screenConfig}
        projectDetail={projectDetail}
        settingsOpen={settingsOpen}
        takeScreenshot={takeScreenshot}
      />
    </RefreshDataContext.Provider>
  );
}