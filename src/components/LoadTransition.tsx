"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const NUM_CURTAINS = 5;

export function LoadTransition({ loaded }: { loaded: boolean }) {
  const controls = useAnimation();
  const hasRevealed = useRef(false);

  useEffect(() => {
    if (loaded && !hasRevealed.current) {
      hasRevealed.current = true;
      // Brief pause so the first frame renders before revealing
      setTimeout(() => {
        controls.start("reveal");
      }, 120);
    }
  }, [loaded, controls]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {Array.from({ length: NUM_CURTAINS }).map((_, i) => (
        <motion.div
          key={i}
          animate={controls}
          initial="cover"
          variants={{
            cover: {
              scaleY: 1,
              transformOrigin: "top",
            },
            reveal: {
              scaleY: 0,
              transformOrigin: "top",
              transition: {
                duration: 0.65,
                delay: i * 0.08,
                ease: [0.77, 0, 0.175, 1],
              },
            },
          }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${(i / NUM_CURTAINS) * 100}%`,
            width: `${100 / NUM_CURTAINS + 0.3}%`,
            background:
              i % 2 === 0
                ? "linear-gradient(180deg, #ea580c 0%, #f97316 100%)"
                : "linear-gradient(180deg, #f97316 0%, #c2410c 100%)",
          }}
        />
      ))}
    </div>
  );
}
