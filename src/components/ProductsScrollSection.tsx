"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion, useInView } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { drawFrame } from "../lib/utils";
import { FRAME_COUNT_2, SCROLL_MULTIPLIER, CATEGORIES, LEFT_PRODUCTS, RIGHT_PRODUCTS } from "../lib/constants";

// ─── Products section header (animated) ───────────────────────────────────
function ProductsSectionHeader() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center gap-4">
        <div className="h-px w-8 bg-black/30" />
        <span className="font-josefin text-[9px] tracking-[0.5em] uppercase text-black/40">Collection</span>
      </div>
      <h2 className="font-josefin text-5xl md:text-7xl font-extralight uppercase tracking-[0.08em] leading-none text-black">
        Curated
        <br />
        <span className="text-black/25">Fragrances</span>
      </h2>
    </motion.div>
  );
}

// ─── Products Section with Background Canvas Animation ──────────────────────
export function ProductsScrollSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload frames for images2 (PNG preferred → JPG fallback)
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    const onComplete = () => {
      count++;
      if (count === FRAME_COUNT_2) setLoaded(true);
    };
    for (let i = 1; i <= FRAME_COUNT_2; i++) {
      const img = new window.Image();
      const n = i.toString().padStart(3, "0");
      // Try PNG first (transparent bg), fall back to JPG
      img.src = `/images2/ezgif-frame-${n}.png`;
      img.onload = onComplete;
      img.onerror = () => {
        img.onerror = onComplete;
        img.src = `/images2/ezgif-frame-${n}.jpg`;
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT_2 - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;
    const img = imagesRef.current[Math.round(Math.min(Math.max(latest, 0), FRAME_COUNT_2 - 1))];
    if (img) drawFrame(canvas, img);
  });

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = imagesRef.current[Math.round(Math.min(Math.max(frameIndex.get(), 0), FRAME_COUNT_2 - 1))];
      if (img) drawFrame(canvas, img);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full bg-white text-black" style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden px-12 py-12 lg:px-24 lg:py-24 flex flex-col gap-10">
        
        {/* Canvas background for section 3 */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          style={{ display: "block" }}
        />
        <div className="absolute inset-0 bg-white/40 z-0 pointer-events-none" />

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <p className="font-josefin text-xs tracking-[0.4em] uppercase text-black/40">Loading Collection...</p>
          </div>
        )}

        {/* UI Overlay */}
        <div className="relative z-10 flex flex-col h-full w-full">
          <ProductsSectionHeader />

          <div className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-14 border-b border-black/10 pb-6 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className={`font-josefin text-sm md:text-lg font-light uppercase tracking-widest transition-all duration-300 ${
                  cat.active
                    ? "text-black border-b border-black pb-1"
                    : "text-black/30 hover:text-black/70"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between gap-8 md:gap-4 flex-1 items-center">
            {/* Left cards */}
            <div className="flex flex-col gap-12 w-full md:w-[28%] xl:w-1/5">
              {LEFT_PRODUCTS.map((p, i) => (
                <ProductCard key={p.seed} {...p} index={i} />
              ))}
            </div>

            {/* Middle part removed to show animation canvas behind */}
            <div className="hidden md:block flex-1 h-full" />

            {/* Right cards */}
            <div className="flex flex-col gap-12 w-full md:w-[28%] xl:w-1/5">
              {RIGHT_PRODUCTS.map((p, i) => (
                <ProductCard key={p.seed} {...p} index={i + 2} />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center mt-auto pb-4">
            <button className="font-josefin text-[10px] tracking-[0.4em] uppercase border border-black/20 px-10 py-4 hover:border-black/60 hover:bg-black/5 transition-all duration-500 bg-white/50 backdrop-blur-sm text-black">
              View All Fragrances
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
