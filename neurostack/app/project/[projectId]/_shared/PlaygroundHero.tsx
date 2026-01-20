"use client";

interface PlaygroundHeroProps {
  zoom: number;
}

export default function PlaygroundHero({ zoom }: PlaygroundHeroProps) {
  return (
    <section
      className="
        relative min-h-screen w-full overflow-hidden
        bg-[#f5f5f4]
        dark:bg-[#1c1917]
      "
    >
      {/* ================= ORANGE DOTTED CANVAS ================= */}
      <div
        className="
          absolute inset-0 z-0 pointer-events-none

          /* Light mode */
          bg-[radial-gradient(circle,rgba(0,0,0,0.45)_0.8px,transparent_0.8px)]

          /* Dark mode */
          dark:bg-[radial-gradient(circle,rgba(255,255,255,0.35)_0.8px,transparent_0.8px)]
        "
        style={{
          /* Mobile-first spacing, desktop refined */
          backgroundSize: `
            ${22 * zoom}px ${22 * zoom}px
          `,
        }}
      />
    </section>
  );
}
