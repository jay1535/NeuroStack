import React from "react";
import AppHeader from "@/components/AppHeader";
import Hero from "@/components/Hero";
import ProjectList from "../project/[projectId]/_shared/ProjectList";

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <AppHeader />

      {/* Main content */}
      <section className="pt-17">
        <Hero />
      </section>

      <ProjectList/>
    </main>
  );
}
