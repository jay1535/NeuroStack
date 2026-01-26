"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Laptop, TabletSmartphone } from "lucide-react";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { getProjects } from "@/app/actions/project.actions";

/* ================= TYPES ================= */

interface Project {
  projectId: string;
  projectName: string | null;
  userInput: string | null;
  device: string | null;
  createdOn: string | null; // ✅ DB column
}

/* ================= COMPONENT ================= */

export default function ProjectList() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <section className="relative mt-40 px-6 md:px-16 lg:px-32 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="relative z-10 mb-32 mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center justify-center mb-6 rounded-full px-5 py-1.5 text-xs font-semibold tracking-widest bg-black/5 text-black/60 dark:bg-white/5 dark:text-white/60">
          WORKSPACE
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.08] text-black dark:text-white">
          Interfaces shaped by{" "}
          <span className="bg-linear-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
            exploration
          </span>{" "}
          and intent
        </h2>

        <p className="mt-6 text-base sm:text-lg text-black/60 dark:text-white/60">
          A living collection of ideas, experiments, and UI systems — generated,
          refined, and evolved over time.
        </p>

        <div className="mt-10 h-px w-24 mx-auto bg-black/10 dark:bg-white/10" />
      </div>

      {/* ================= GRID ================= */}
      <div className="relative z-10 mx-auto max-w-7xl grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Skeletons */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}

        {/* Cards */}
        {!loading &&
          projects.map((project) => (
            <div
              key={project.projectId}
              onClick={() => router.push(`/project/${project.projectId}`)}
              className="
                group relative cursor-pointer
                rounded-3xl p-7 overflow-hidden
                bg-white/85 dark:bg-black/60
                backdrop-blur-xl
                border border-black/10 dark:border-white/10
                ring-1 ring-black/5 dark:ring-white/5
                shadow-sm shadow-black/5 dark:shadow-black/40
                transition-all duration-300 ease-out
                hover:-translate-y-2 hover:scale-[1.015]
                hover:shadow-2xl hover:shadow-purple-600/30
                hover:border-purple-500/40 hover:ring-purple-500/30
              "
            >
              {/* ================= AMBIENT GLOW ================= */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-purple-600/[0.06] via-transparent to-transparent group-hover:from-purple-600/[0.12] transition" />

              {/* ================= LOGO WATERMARK ================= */}
              <div className="pointer-events-none absolute inset-0">
                {/* Light mode logo */}
                <div className="absolute inset-0 bg-[url('/black-logo.png')] bg-center bg-no-repeat bg-[length:200px] opacity-[0.12] transition-transform duration-500 group-hover:scale-110 dark:hidden" />

                {/* Dark mode logo */}
                <div className="absolute inset-0 bg-[url('/logo.png')] bg-center bg-no-repeat bg-[length:200px] opacity-[0.18] transition-transform duration-500 group-hover:scale-110 hidden dark:block" />

                {/* Soft overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-white/80 dark:via-black/40 dark:to-black/80" />
              </div>

              {/* ================= CONTENT ================= */}
              <div className="relative">
                {/* Meta */}
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70">
                    {project.device === "mobile" ? (
                      <TabletSmartphone size={14} />
                    ) : (
                      <Laptop size={14} />
                    )}
                    {project.device ?? "desktop"}
                  </span>

                  {project.createdOn && (
                    <span className="text-xs text-black/40 dark:text-white/40">
                      {new Date(project.createdOn).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-3 text-black dark:text-white line-clamp-1">
                  {project.projectName || "Untitled Project"}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-black/60 dark:text-white/60 line-clamp-3">
                  {project.userInput || "No description provided."}
                </p>

                {/* CTA */}
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400 opacity-80 group-hover:opacity-100 transition">
                  <span className="relative">
                    Open project
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ================= EMPTY STATE ================= */}
      {!loading && projects.length === 0 && (
        <div className="relative z-10 py-28 text-center text-black/50 dark:text-white/50">
          No projects yet. Create your first playground to get started.
        </div>
      )}
    </section>
  );
}
