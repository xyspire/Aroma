"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export function ProductCard({ title, price, rating, seed, index }: { title: string; price: string; rating: number; seed: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-4 group cursor-pointer"
    >
      <div className="bg-transparent rounded-2xl p-6 aspect-square flex items-center justify-center relative overflow-hidden border border-black/10 transition-all duration-700 group-hover:border-black/30">
        {/* glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-radial-gradient" />
        <Image
          src={`https://picsum.photos/seed/${seed}/400/400`}
          alt={title}
          fill
          className="object-contain p-8 opacity-40 filter grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start">
          <h4 className="font-josefin font-light text-sm tracking-widest uppercase text-black/60 group-hover:text-black transition-colors duration-500">{title}</h4>
          <span className="font-light text-sm text-black/50 group-hover:text-black transition-colors duration-500">{price}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-black/30">
          <Star className="w-3 h-3 fill-black/30 group-hover:fill-black/60 transition-colors duration-500" />
          <span className="font-light group-hover:text-black/60 transition-colors duration-500">{rating}</span>
        </div>
      </div>
    </motion.div>
  );
}
