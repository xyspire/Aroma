"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function InterstitialContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      className="relative z-10 flex flex-col items-center gap-8 px-8 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-4">
        <div className="h-px w-12 bg-black/20" />
        <span className="font-josefin text-[9px] tracking-[0.5em] uppercase text-black/40">The Art of Scent</span>
        <div className="h-px w-12 bg-black/20" />
      </div>

      <h2 className="font-josefin text-4xl md:text-6xl font-extralight tracking-[0.1em] uppercase leading-none text-black">
        Where Emotion<br />
        <span className="text-black/30">Becomes Fragrance</span>
      </h2>

      <p className="max-w-md text-sm font-light leading-loose text-black/50 tracking-wide">
        Each bottle is a vessel of memory — distilled from rare botanicals,
        refined through decades of mastery, and crafted to linger in the mind
        long after it fades from the skin.
      </p>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-black/30" />
      </motion.div>
    </motion.div>
  );
}
