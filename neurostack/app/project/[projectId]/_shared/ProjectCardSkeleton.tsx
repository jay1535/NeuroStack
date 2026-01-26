"use client";

export default function ProjectCardSkeleton() {
  return (
    <div
      className="
        relative
        rounded-2xl
        border border-black/10 dark:border-white/10
        bg-white/70 dark:bg-black/60
        backdrop-blur-xl
        p-6
        overflow-hidden
        animate-pulse
      "
    >
      {/* Logo watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/logo-dark.svg')] bg-center bg-no-repeat bg-[length:150px] opacity-[0.03] dark:hidden" />
        <div className="absolute inset-0 bg-[url('/logo-light.svg')] bg-center bg-no-repeat bg-[length:150px] opacity-[0.05] hidden dark:block" />
      </div>

      <div className="relative">
        <div className="flex justify-between mb-4">
          <div className="h-3 w-20 rounded bg-black/10 dark:bg-white/10" />
          <div className="h-3 w-14 rounded bg-black/10 dark:bg-white/10" />
        </div>

        <div className="h-5 w-3/4 rounded bg-black/10 dark:bg-white/10 mb-3" />

        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-black/10 dark:bg-white/10" />
          <div className="h-3 w-11/12 rounded bg-black/10 dark:bg-white/10" />
          <div className="h-3 w-9/12 rounded bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}
