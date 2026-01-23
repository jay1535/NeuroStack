"use client";

import { themeToCssVars } from "@/data/themes";
import { resolveTheme } from "@/data/resolveTheme";
import { ProjectType } from "@/type/types";
import { Grip } from "lucide-react";
import React from "react";
import { Rnd } from "react-rnd";

type Props = {
  x: number;
  y: number;
  setPanningEnabled: (enabled: boolean) => void;
  width: number;
  height: number;
  htmlCode: string | undefined;
  projectDetail: ProjectType | null;
};

function ScreenFrame({
  x,
  y,
  setPanningEnabled,
  width,
  height,
  htmlCode,
  projectDetail,
}: Props) {
  // ✅ RESOLVE THEME KEY → THEME OBJECT
  const resolvedTheme = resolveTheme(projectDetail?.theme);

  const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Google Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Tailwind -->
  <link
    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
    rel="stylesheet"
  />

  <!-- Icons -->
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    rel="stylesheet"
  />
  <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>

  <style>
    /* ✅ THIS IS THE FIX */
    :root {
      ${themeToCssVars(resolvedTheme)}
    }

    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      background: var(--background);
      color: var(--foreground);
      font-family: Inter, system-ui, sans-serif;
    }
  </style>
</head>

<body class="bg-[var(--background)] text-[var(--foreground)] w-full h-full">
  ${htmlCode ?? ""}
</body>
</html>
`;

  return (
    <Rnd
      default={{ x, y, width, height }}
      dragHandleClassName="drag-handler"
      enableResizing={{ bottomRight: true, bottomLeft: true }}
      onDragStart={() => setPanningEnabled(false)}
      onDragStop={() => setPanningEnabled(true)}
      onResizeStart={() => setPanningEnabled(false)}
      onResizeStop={() => setPanningEnabled(true)}
      className="absolute"
    >
      
        {/* DRAG BAR — UNCHANGED */}
        <div className="drag-handler cursor-grab w-10 h-10 dark:bg-white bg-gray-900 rounded-lg text-white dark:text-black  ">
          <h2 className="flex gap-2 text-xl p-2">
            <Grip /> 
          </h2>
        </div>

        {/* IFRAME — UNCHANGED */}
        <iframe
          className="w-full h-[calc(100%-40px)] border-none rounded-2xl mt-5"
          sandbox="allow-same-origin allow-scripts"
          srcDoc={html}
        />
     
    </Rnd>
  );
}

export default ScreenFrame;
