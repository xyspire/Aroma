"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import {
  Menu,
  Hash,
  Tv,
  Disc3,
  Mouse,
  Play,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { drawFrame } from "../lib/utils";
import { FRAME_COUNT, SCROLL_MULTIPLIER } from "../lib/constants";

export function HeroSection({ onLoaded }: { onLoaded?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ── Preload all frames (PNG preferred → JPG fallback)
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    const START_INDEX = 1; // frames are numbered 1–62
    const onComplete = () => {
      count++;
      setLoadProgress(Math.round((count / FRAME_COUNT) * 100));
      if (count === FRAME_COUNT) {
        setLoaded(true);
        onLoaded?.();
      }
    };
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      const frameNum = START_INDEX + i;
      img.src = `/image1/${frameNum}.png`;
      img.onload = onComplete;
      img.onerror = () => {
        // PNG not found — try JPG fallback
        img.onerror = onComplete;
        img.src = `/image1/${frameNum}.jpg`;
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, [onLoaded]);

  // ── Scroll-driven frame scrub (tracks the hero scroll container)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // ── Draw frame on scroll change
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;
    const img = imagesRef.current[Math.round(Math.min(Math.max(latest, 0), FRAME_COUNT - 1))];
    if (img) drawFrame(canvas, img);
  });

  // ── Set canvas size & draw initial frame on load / resize
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = imagesRef.current[Math.round(Math.min(Math.max(frameIndex.get(), 0), FRAME_COUNT - 1))];
      if (img) drawFrame(canvas, img);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded, frameIndex]);

  return (
    <div
      ref={heroRef}
      className="relative w-full"
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
    >
      {/* Sticky viewport — canvas + all hero UI lives here */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white">
        {/* White background layer — lowest z-index */}
        <div className="absolute inset-0 bg-white z-0" />

        {/* Canvas — topmost layer, overlaps the PERFUME text */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-20"
          style={{ display: "block" }}
        />

        {/* Loading screen */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="flex flex-col items-center gap-6">
              <p className="font-josefin text-xs tracking-[0.4em] uppercase text-black/40">
                Loading Experience
              </p>
              <div className="w-48 h-px bg-black/10 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="font-josefin text-[10px] tracking-widest text-black/30">{loadProgress}%</p>
            </div>
          </div>
        )}

        {/* ── HEADER ──────────────────────────────────────── */}
        <header className="absolute top-0 left-0 right-0 z-30 flex justify-between items-start p-8">
          <div className="flex items-center gap-2">
            <div className="border border-black/40 p-1 w-8 h-8 flex items-center justify-center">
              <span className="text-xs font-medium leading-none font-josefin text-black">P</span>
            </div>
            <span className="font-josefin font-medium tracking-[0.25em] text-xs uppercase text-black">
              Perfume
            </span>
          </div>

          <div className="flex flex-col items-center">
            <h1
              className="font-josefin font-light text-xl tracking-[0.2em] uppercase text-center leading-tight mt-1 text-black"
            >
              Maison
              <br />
              Lumière
            </h1>
          </div>

          <div className="flex items-center gap-6 mt-1">
            <Hash className="w-4 h-4 text-black/50 hover:text-black cursor-pointer transition-colors" />
            <Tv className="w-4 h-4 text-black/50 hover:text-black cursor-pointer transition-colors" />
            <Disc3 className="w-4 h-4 text-black/50 hover:text-black cursor-pointer transition-colors" />
          </div>
        </header>

        {/* ── LEFT SIDE NAV ───────────────────────────────── */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-14 z-30 h-[55vh] justify-between pointer-events-none">
          <span className="font-josefin text-[10px] text-black/40 tracking-widest">001</span>
          <div className="flex items-center justify-center w-10 h-10 border border-black/20 pointer-events-auto hover:border-black/50 transition-colors cursor-pointer">
            <Menu className="w-4 h-4 text-black" />
          </div>
          <span className="font-josefin text-[10px] text-black/40 tracking-widest">006</span>
        </div>

        {/* ── SCROLL DOWN hint ────────────────────────────── */}
        <div className="absolute left-8 bottom-8 flex items-center gap-3 z-30 text-[10px] font-josefin tracking-[0.25em] text-black/60">
          <Mouse className="w-4 h-4" />
          <span className="uppercase">Scroll Down</span>
          <div className="flex gap-1 ml-3">
            <div className="w-1.5 h-1.5 bg-black" />
            <div className="w-1.5 h-1.5 bg-black/30" />
            <div className="w-1.5 h-1.5 bg-black/30" />
          </div>
        </div>

        {/* ── RIGHT INNER NAV ─────────────────────────────── */}
        <div className="absolute right-32 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 z-30">
          {["The World", "Story"].map((item) => (
            <span
              key={item}
              className="font-josefin text-[9px] uppercase tracking-[0.2em] text-black/30 hover:text-black cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
          <div className="flex items-center gap-2 my-1">
            <span className="font-josefin text-sm font-medium uppercase tracking-widest text-black">
              Polymer
            </span>
            <ChevronLeft className="w-3 h-3 text-black" />
          </div>
          {["Characters", "Location", "Weapons", "Robots"].map((item) => (
            <span
              key={item}
              className="font-josefin text-[9px] uppercase tracking-[0.2em] text-black/30 hover:text-black cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
        </div>

        {/* ── LANGUAGE SELECTOR (far right) ───────────────── */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-30">
          {["PL", "UK"].map((lang) => (
            <span key={lang} className="font-josefin text-[9px] text-black/30 cursor-pointer hover:text-black/60 transition-colors">
              {lang}
            </span>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-px h-3 bg-black" />
            <span className="font-josefin text-[10px] font-medium cursor-pointer text-black">EN</span>
          </div>
          {["RU", "FR"].map((lang) => (
            <span key={lang} className="font-josefin text-[9px] text-black/30 cursor-pointer hover:text-black/60 transition-colors">
              {lang}
            </span>
          ))}
        </div>

        {/* ── GIANT BACKGROUND TEXT (PERFUME) ─────────────── */}
        {/* z-10: sits above the white bg (z-0) but below the canvas (z-20) */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden>
          <span
            className="font-josefin absolute top-[30%] left-[5%] text-[20vw] font-bold tracking-[0.04em] leading-none select-none text-orange-500 whitespace-nowrap -translate-y-1/2"
            style={{
              textShadow: [
                "0 2px 4px rgba(251,146,60,0.5)",
                "0 4px 12px rgba(249,115,22,0.45)",
                "0 8px 32px rgba(234,88,12,0.35)",
                "0 16px 64px rgba(194,65,12,0.25)",
                "2px -2px 0px rgba(255,200,100,0.3)",
                "-2px 2px 0px rgba(180,50,0,0.2)",
              ].join(", "),
            }}
          >
            ARO
          </span>
          <span
            className="font-josefin absolute bottom-[28%] right-[5%] text-[20vw] font-bold tracking-[0.04em] leading-none select-none text-orange-500 whitespace-nowrap translate-y-1/2"
            style={{
              textShadow: [
                "0 2px 4px rgba(251,146,60,0.5)",
                "0 4px 12px rgba(249,115,22,0.45)",
                "0 8px 32px rgba(234,88,12,0.35)",
                "0 16px 64px rgba(194,65,12,0.25)",
                "2px -2px 0px rgba(255,200,100,0.3)",
                "-2px 2px 0px rgba(180,50,0,0.2)",
              ].join(", "),
            }}
          >
            MA
          </span>
        </div>

        {/* ── BOTTOM LEFT — Profile card ───────────────────── */}
        <div className="absolute left-32 bottom-10 w-[260px] z-30 flex flex-col gap-4">
          <div className="bg-white/80 backdrop-blur-md p-5 border border-black/10 flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="relative w-14 h-14 shrink-0 border border-black/20 p-0.5">
                <Image
                  src="https://picsum.photos/seed/perfumer/100/100"
                  alt="Master Perfumer"
                  fill
                  className="object-cover filter grayscale p-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="bg-black text-white px-2 py-0.5 text-[9px] font-josefin font-medium uppercase inline-block mb-1 w-fit tracking-widest">
                  J. Beaumont
                </div>
                <div className="text-[9px] text-black/50 font-josefin uppercase tracking-widest mt-1">
                  Master Perfumer
                </div>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-black/50">
              Crafting olfactory masterpieces since 1988. Each fragrance tells
              a story of time, place, and memory — a signature of the soul.
            </p>
          </div>
          <div className="flex items-center gap-1 px-5 opacity-40">
            <div className="w-1 h-1 bg-black" />
            <div className="w-1 h-1 bg-black/30" />
            <div className="w-1 h-1 bg-black/30" />
          </div>
        </div>

        {/* ── BOTTOM RIGHT — Video preview ─────────────────── */}
        <div className="absolute right-32 bottom-8 z-30 flex items-stretch border border-black/15 h-20 bg-white/80 backdrop-blur-md hover:border-black/30 transition-colors cursor-pointer group">
          <div
            className="flex items-center justify-center border-r border-black/10 px-2.5 rotate-180"
            style={{ writingMode: "vertical-rl" }}
          >
            <span className="font-josefin text-[9px] uppercase tracking-[0.25em] text-black/50 group-hover:text-black/80 transition-colors whitespace-nowrap">
              Watch
            </span>
          </div>
          <div className="relative w-36 h-full">
            <Image
              src="https://picsum.photos/seed/fragrancevideo/300/200"
              alt="Film"
              fill
              className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border border-black/30 rounded-full flex items-center justify-center group-hover:border-black/70 group-hover:scale-110 transition-all duration-500">
                <Play className="w-3 h-3 fill-black/50 stroke-none ml-0.5 group-hover:fill-black transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Progress bar at bottom ───────────────────────── */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-black/20 z-30"
          style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        />
      </div>
    </div>
  );
}
