"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Laptop, TabletSmartphone } from "lucide-react";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

interface Project {
  projectId: string;
  projectName?: string;
  userInput: string;
  device: string;
  createdAt?: string;
}

export default function ProjectList() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/project");
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="mt-28 px-10 md:px-24 lg:px-44 xl:px-54">
      {/* ================= Section Header ================= */}
      <div className="mb-24 max-w-full">
  {/* Eyebrow */}
  <div className="flex items-center gap-4 mb-6">
    <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
    <span className="text-xs uppercase tracking-[0.35em] text-black/50 dark:text-white/50">
      Workspace
    </span>
    <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
  </div>

  {/* Headline */}
  <h2 className="text-4xl md:text-5xl font-semibold leading-[1.15] text-black dark:text-white">
    Interfaces shaped by{" "}
    <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
      exploration
    </span>{" "}
    and intent.
  </h2>

  {/* Supporting text */}
  <p className="mt-6 text-base text-black/60 dark:text-white/60 max-w-2xl">
    A curated collection of experiments, ideas, and design systems — built,
    refined, and iterated over time.
  </p>
</div>


      {/* ================= Projects Grid ================= */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* ===== Skeletons ===== */}
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}

        {/* ===== Real Projects ===== */}
        {!loading &&
          projects.map((project) => (
            <div
              key={project.projectId}
              onClick={() => router.push(`/project/${project.projectId}`)}
              className="
                group relative cursor-pointer
                rounded-2xl
                p-6
                overflow-hidden

                bg-white/75 dark:bg-black/55
                backdrop-blur-xl

                border border-black/10 dark:border-white/10
                ring-1 ring-black/5 dark:ring-white/5
                shadow-sm shadow-black/5 dark:shadow-black/40

                transition-all duration-300 ease-out
                hover:-translate-y-[4px]
                hover:border-purple-500/50
                hover:ring-purple-500/30
                hover:shadow-2xl hover:shadow-purple-600/25
              "
            >
              {/* ===== Resting Surface Glow ===== */}
              <div
                className="
                  pointer-events-none absolute inset-0 rounded-2xl
                  bg-gradient-to-br
                  from-purple-500/[0.05] via-transparent to-transparent
                "
              />

              {/* ===== Top Accent Line ===== */}
              <div
                className="
                  absolute inset-x-0 top-0 h-[2px]
                  bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0
                  opacity-30 group-hover:opacity-100
                  transition-opacity
                "
              />

              {/* ===== Logo Watermark Background ===== */}
              <div className="pointer-events-none absolute inset-0">
                {/* Light mode */}
                <div
                  className="
                    absolute inset-0
                    bg-[url('/black-logo.png')]
                    bg-no-repeat bg-center
                    bg-[length:200px]
                    opacity-[0.14]
                    transition-transform duration-500
                    group-hover:scale-105
                    dark:hidden
                  "
                />

                {/* Dark mode */}
                <div
                  className="
                    absolute inset-0
                    bg-[url('/logo.png')]
                    bg-no-repeat bg-center
                    bg-[length:200px]
                    opacity-[0.18]
                    transition-transform duration-500
                    group-hover:scale-105
                    hidden dark:block
                  "
                />

                {/* Readability Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-white/80 dark:via-black/40 dark:to-black/80" />
              </div>

              {/* ===== Foreground Content ===== */}
              <div className="relative">
                {/* Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="
                      inline-flex items-center gap-2
                      rounded-full px-3 py-1
                      text-xs font-medium
                      bg-black/5 dark:bg-white/5
                      text-black/70 dark:text-white/70
                    "
                  >
                    {project.device === "mobile" ? (
                      <TabletSmartphone size={14} />
                    ) : (
                      <Laptop size={14} />
                    )}
                    {project.device}
                  </span>

                  {project.createdAt && (
                    <span className="text-xs text-black/40 dark:text-white/40">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-white line-clamp-1">
                  {project.projectName || "Untitled Project"}
                </h3>

                {/* Description */}
                <p className="text-sm text-black/60 dark:text-white/60 line-clamp-3">
                  {project.userInput}
                </p>

                {/* CTA */}
                <div
                  className="
                    mt-5 flex items-center gap-2
                    text-sm font-medium text-purple-600 dark:text-purple-400
                    opacity-80 group-hover:opacity-100
                    transition
                  "
                >
                  <span>Open project</span>
                  <span
                    className="
                      -translate-x-1
                      opacity-0
                      group-hover:opacity-100 group-hover:translate-x-0
                      transition-all
                    "
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ================= Empty State ================= */}
      {!loading && projects.length === 0 && (
        <div className="py-24 text-black/50 dark:text-white/50">
          No projects yet. Create your first playground to get started.
        </div>
      )}
    </section>
  );
}
