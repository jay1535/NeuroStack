import React from "react";
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

import { Laptop, Send, TabletSmartphone, Upload } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none
          absolute -top-36 left-1/2 -translate-x-1/2
          h-130 w-130
          rounded-full
          bg-purple-500/20
          blur-[160px]
          dark:bg-rose-500/20
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
   but explaining it {" "}
  </span>
  <span className="bg-linear-to-r from-purple-600 to-purple-500 dark:from-rose-500 dark:to-rose-600 bg-clip-text text-transparent">
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
    <div className="px-6 pt-6">
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
      />
    </div>

 

    {/* Footer bar */}
   <div className="flex items-center justify-between px-6 py-4">
  {/* Platform Select — Left */}
  <Select defaultValue="web">
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
      <SelectItem value="web"><Laptop/> Website</SelectItem>
      <SelectItem value="mobile"><TabletSmartphone/> Mobile</SelectItem>
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
>
  <Send size={16} />

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


      </div>
    </section>
  );
};

export default Hero;
