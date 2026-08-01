"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoadTransition } from "../components/LoadTransition";
import { HeroSection } from "../components/HeroSection";
import { InterstitialContent } from "../components/InterstitialContent";
import { ProductsScrollSection } from "../components/ProductsScrollSection";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadTransition loaded={loaded} />
      <main className="w-full bg-white text-black" style={{ fontFamily: "var(--font-dm-sans), DM Sans, sans-serif" }}>
        
        {/* ═══════════════════════════════════════════════════
            HERO — tall scroll container for frame scrub
        ══════════════════════════════════════════════════════ */}
        <HeroSection onLoaded={() => setLoaded(true)} />

        {/* ═══════════════════════════════════════════════════
            INTERSTITIAL — transparent breathing section
        ══════════════════════════════════════════════════════ */}
        <section className="relative w-full h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.03)_0%,_transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 overflow-hidden pointer-events-none">
            <motion.div
              className="flex gap-24 whitespace-nowrap"
              animate={{ x: [0, -1200] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="font-josefin text-[13vw] font-extralight tracking-[0.1em] text-black/[0.04] select-none"
                >
                  PARFUM
                </span>
              ))}
            </motion.div>
          </div>
          <InterstitialContent />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-black/10 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        </section>

        {/* ═══════════════════════════════════════════════════
            PRODUCTS SCROLL SECTION (Animation 2)
        ══════════════════════════════════════════════════════ */}
        <ProductsScrollSection />

      </main>
    </>
  );
}
