"use client";
import React, { useState } from "react";
import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Laptop, LoaderCircle, Send, TabletSmartphone } from "lucide-react";
import { suggestions } from "@/data/constant";
import { useRouter } from "next/navigation";
import axios from "axios";
import { randomUUID } from "crypto";
import toast from "react-hot-toast";


const Hero = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState<string>("");
  const [device, setDevice] = useState<string>("website");
const [loading, setLoading] = useState(false);

const onCreateProject = async () => {
  if (!userInput) return;

  setLoading(true);

  // Show loading toast
  const toastId = toast.loading("Generating Playground... 🚀");

  try {
    const projectId = crypto.randomUUID();

    await axios.post("/api/project", {
      userInput: userInput,
      device: device,
      projectId: projectId,
    });
    router.push("/project/" + projectId);
    toast.success("Playground created successfully ✨", {
      id: toastId,
    });
  } catch (error) {
    console.error(error);

    toast.error("Failed to generate screen ❌", {
      id: toastId,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_55%)]
         
          
        "
      />

      <div className="relative z-10 w-full max-w-8xl px-6 text-center">
        {/* Eyebrow */}
        <span className="inline-block mb-6 mt-8 rounded-full px-4 py-1 text-xs font-semibold tracking-wide bg-black/5 text-black/60 dark:bg-white/5 dark:text-white/60">
          AI-POWERED UI / UX GENERATION
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1]">
          Building UI is hard
          <br />
          <span className="text-black/80 dark:text-white/80">
            but explaining it{" "}
          </span>
          <span className="bg-linear-to-r from-purple-600 to-purple-500 dark:from-orange-500 dark:to-orange-600 bg-clip-text text-transparent">
            isn’t
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-base sm:text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
          Describe your product in plain language. NeuroStack converts it into
          clean, modern, production-ready UI & UX.
        </p>

        {/* ===== Prompt Box ===== */}
        <div className="mt-12 w-full max-w-3xl mx-auto">
          <div
            className="
      relative
      rounded-3xl
      border border-black/10 dark:border-white/10
      bg-white/70 dark:bg-black/60
      backdrop-blur-xl
      shadow-lg
      overflow-hidden
    "
          >
            {/* Textarea wrapper */}
            <div className="px-6 pt-6 ">
              <InputGroupTextarea
                placeholder="Explain your app idea or desired screens..."
                className="
    w-full
    h-24 min-h-24 max-h-24
    resize-none
    overflow-y-auto
    bg-transparent
    px-0 py-0
    text-base sm:text-lg
    leading-relaxed
    text-black dark:text-white
    placeholder:text-black/40 dark:placeholder:text-white/40
    outline-none
  "
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />


            </div>

            {/* Footer bar */}
            <div className="flex items-center justify-between px-6 py-4">
              {/* Platform Select — Left */}
              <Select defaultValue="website" onValueChange={(value) => setDevice(value)}>
                <SelectTrigger
                  className="
        w-35
        rounded-xl
        bg-transparent
        border-3 border-black/10 dark:border-white/10
        text-sm
        font-medium
        text-black dark:text-white
        focus:ring-0
        focus:outline-none
      "
                >
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>

                <SelectContent
                  className="
        rounded-xl
        bg-white/90 dark:bg-black/90
        backdrop-blur-xl
        border border-black/10 dark:border-white/10
      "
                >
                  <SelectItem value="website">
                    <Laptop /> Website
                  </SelectItem>
                  <SelectItem value="mobile">
                    <TabletSmartphone /> Mobile
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Generate Button — Right */}
              <InputGroupButton
                size="sm"
                variant="default"
                className="
    flex items-center gap-2
    /* mobile: circular look only */
    rounded-lg sm:rounded-xl
    bg-black/90 text-white
    dark:bg-white/90 dark:text-black
    font-semibold
    shadow-md
    transition-all duration-300
    hover:opacity-90
    active:scale-[0.97]
  "

  onClick={()=>onCreateProject()}
      disabled={loading}        >
                {loading ? <LoaderCircle className="animate-spin"/>:
                <Send size={16} />
}
                {/* hide text only on mobile */}
                <span className="hidden sm:inline">Generate</span>
              </InputGroupButton>
            </div>
          </div>

          {/* Helper text */}
          <p className="mt-4 text-sm text-black/50 dark:text-white/50">
            Tip: Select platform (web / mobile), key screens, and user flow
          </p>
        </div>
        <div className="w-full max-w-7xl mx-auto mb-4">
          <div
            className="
      mt-3
      flex gap-2
      overflow-x-auto
      px-1

      sm:flex-wrap sm:justify-center sm:overflow-visible

      no-scrollbar
    "
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="
        group relative
        flex items-center gap-2
        h-8 px-4
        rounded-full
        shrink-0
        overflow-hidden
        cursor-pointer
    
        border border-black/15 dark:border-white/15
        bg-white/90 dark:bg-black/70
        backdrop-blur-lg
    
        text-xs font-medium
        text-black dark:text-white
    
        transition-all duration-300 ease-out
    
        active:scale-95
    
        sm:hover:-translate-y-1
        sm:hover:shadow-lg sm:hover:shadow-purple-500/25
        dark:sm:hover:shadow-orange-500/25
    
        sm:hover:border-purple-500/40
        dark:sm:hover:border-orange-500/40
      "

                onClick={() => setUserInput(suggestion?.description)}
              >
                {/* Bloom glow (purple → orange) */}
                <span
                  className="
          pointer-events-none absolute inset-0
          opacity-0 sm:group-hover:opacity-100
          transition-opacity duration-300
          bg-linear-to-br
          from-purple-500/20 via-transparent to-orange-500/20
        "
                />

                {/* Light sweep / sheen */}
                <span
                  className="
          pointer-events-none absolute -inset-y-full -left-full w-1/2
          bg-linear-to-r
          from-transparent via-purple-300/40 to-transparent
          dark:via-orange-300/30
          rotate-12
          opacity-0 sm:group-hover:opacity-100
          sm:group-hover:translate-x-[260%]
          transition-all duration-700 ease-out
        "
                />

                {/* Content */}
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className="
            text-sm leading-none
            transition-transform duration-300
            sm:group-hover:scale-110
            sm:group-hover:text-purple-600
            dark:sm:group-hover:text-orange-400
            
          "
                  >
                    {suggestion.icon}
                  </span>

                  <span className="whitespace-nowrap">
                    {suggestion.title}
                  </span>
                </span>
              </button>


            ))}
          </div>
        </div>




      </div>


    </section>
  );
};

export default Hero;
