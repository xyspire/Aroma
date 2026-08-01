import Image from 'next/image';
import { Menu, Twitter, Youtube, Disc, Mouse, Play, Star, ChevronLeft, ChevronDown, Check } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full bg-black text-white font-sans">
      {/* HERO SECTION */}
      <section className="min-h-screen relative overflow-hidden flex flex-col justify-between p-8">
        {/* HEADER */}
        <header className="flex justify-between items-start z-10 w-full relative">
          {/* Top Left */}
          <div className="flex items-center gap-2">
            <div className="border border-white/50 p-1 w-8 h-8 flex items-center justify-center">
              <span className="text-xs font-medium leading-none">M</span>
            </div>
            <span className="font-medium tracking-widest text-sm uppercase">Mundfish</span>
          </div>

          {/* Top Center */}
          <div className="flex flex-col items-center">
            <h1 className="font-normal text-2xl tracking-tighter uppercase text-center leading-tight mt-2">Atomic<br />Heart</h1>
          </div>

          {/* Top Right */}
          <div className="flex items-center gap-6">
            <Twitter className="w-4 h-4" />
            <Youtube className="w-4 h-4" />
            <Disc className="w-4 h-4" />
          </div>
        </header>

        {/* LEFT NAVIGATION */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-16 z-10 h-[60vh] justify-between">
          <span className="text-xs font-normal">001</span>
          <div className="flex items-center justify-center w-12 h-12 border border-white/20">
            <Menu className="w-6 h-6" />
          </div>
          <span className="text-xs font-normal">006</span>
        </div>

        <div className="absolute left-8 bottom-8 flex items-center gap-3 z-10 text-xs font-medium tracking-widest">
          <Mouse className="w-4 h-4" />
          <span className="uppercase">Scroll Down</span>
          <div className="flex gap-1 ml-4">
            <div className="w-1.5 h-1.5 bg-white"></div>
            <div className="w-1.5 h-1.5 bg-white/30"></div>
            <div className="w-1.5 h-1.5 bg-white/30"></div>
          </div>
        </div>

        {/* RIGHT INNER NAVIGATION */}
        <div className="absolute right-32 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 z-10">
          {['The World', 'Story'].map((item) => (
            <span key={item} className="text-[10px] font-medium uppercase tracking-widest text-white/40 hover:text-white cursor-pointer">{item}</span>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium uppercase tracking-widest">Polymer</span>
            <ChevronLeft className="w-4 h-4" />
          </div>
          {['Characters', 'Location', 'Weapons', 'Robots'].map((item) => (
            <span key={item} className="text-[10px] font-medium uppercase tracking-widest text-white/40 hover:text-white cursor-pointer">{item}</span>
          ))}
        </div>

        {/* FAR RIGHT NAVIGATION (LANGUAGES) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-10">
          {['PL', 'UK'].map((lang) => (
            <span key={lang} className="text-[10px] font-normal text-white/40 cursor-pointer">{lang}</span>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-white"></div>
            <span className="text-xs font-medium cursor-pointer">EN</span>
          </div>
          {['RU', 'FR'].map((lang) => (
            <span key={lang} className="text-[10px] font-normal text-white/40 cursor-pointer">{lang}</span>
          ))}
        </div>

        {/* CENTER HUGE TEXT */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
          <h2 className="absolute top-[35%] left-[10%] text-[18vw] font-light tracking-[0.05em] leading-none select-none text-white whitespace-nowrap -translate-y-1/2">
            PERF
          </h2>
          <h2 className="absolute bottom-[35%] right-[10%] text-[18vw] font-light tracking-[0.05em] leading-none select-none text-white whitespace-nowrap translate-y-1/2">
            UME
          </h2>
        </div>

        {/* BOTTOM LEFT PROFILE */}
        <div className="absolute left-32 bottom-24 w-[280px] z-10 flex flex-col gap-6">
          <div className="bg-black/60 backdrop-blur-sm p-5 border border-white/10 flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="relative w-16 h-16 shrink-0 border border-white/20 p-1">
                 <Image
                  src="https://picsum.photos/seed/sechenov/100/100"
                  alt="D. Sechenov"
                  fill
                  className="object-cover filter grayscale p-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="bg-white text-black px-2 py-0.5 text-[10px] font-medium uppercase inline-block mb-1 w-fit">
                  D. Sechenov
                </div>
                <div className="text-[10px] text-white/50 font-medium uppercase tracking-widest mt-1">
                  Inventor
                </div>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-white/70">
              Sechenov assembled a team of brilliant scientists and laid the foundation for an unprecedented scientific and technical breakthrough. He is the one who invented polymers, neural network, and many methods for using
            </p>
          </div>
          <div className="flex items-center gap-1 opacity-50 px-5">
            <div className="w-1 h-1 bg-white"></div>
            <div className="w-1 h-1 bg-white/30"></div>
            <div className="w-1 h-1 bg-white/30"></div>
          </div>
        </div>

        {/* BOTTOM RIGHT VIDEO */}
        <div className="absolute right-32 bottom-8 z-10 flex items-stretch border border-white/20 h-24 bg-black/60 backdrop-blur-sm">
          <div className="flex items-center justify-center border-r border-white/20 px-3 rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span className="text-[10px] font-medium uppercase tracking-widest whitespace-nowrap">Watch</span>
          </div>
          <div className="relative w-40 h-full">
             <Image
              src="https://picsum.photos/seed/video/200/150"
              alt="Video thumbnail"
              fill
              className="object-cover filter grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <Play className="w-8 h-8 fill-white/20 stroke-white/50" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="min-h-screen bg-black text-white p-12 lg:p-24 flex flex-col gap-16 relative z-20">
        
        {/* HORIZONTAL CATEGORIES */}
        <div className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-16 border-b border-white/10 pb-8" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
          {[
            { name: 'All Perfumes', active: true },
            { name: 'Floral', active: false },
            { name: 'Woody', active: false },
            { name: 'Citrus', active: false },
            { name: 'Oriental', active: false },
            { name: 'Fresh', active: false },
          ].map((cat) => (
            <button key={cat.name} className={`text-lg md:text-2xl font-light uppercase tracking-widest transition-colors ${cat.active ? 'text-white border-b border-white pb-1' : 'text-white/40 hover:text-white/80'}`}>
              {cat.name}
            </button>
          ))}
        </div>

        {/* PRODUCTS LAYOUT */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          
          {/* LEFT SIDE CARDS */}
          <div className="flex flex-col gap-12 w-full md:w-[30%] lg:w-[25%] xl:w-1/5">
            {[
              { title: 'Velvet Rose', price: '$89.90', rating: 4.8 },
              { title: 'Midnight Oud', price: '$120.00', rating: 4.9 },
            ].map((product, i) => (
              <div key={i} className="flex flex-col gap-4 group opacity-30 hover:opacity-80 transition-all duration-500 cursor-pointer">
                {/* Image Container */}
                <div className="bg-transparent rounded-2xl p-6 aspect-square flex items-center justify-center relative overflow-hidden border border-white/10">
                  <Image
                    src={`https://picsum.photos/seed/perfume${i}/400/400`}
                    alt={product.title}
                    fill
                    className="object-contain p-8 opacity-50 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Details */}
                <div className="flex flex-col gap-1 px-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-light text-base tracking-wide uppercase" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>{product.title}</h4>
                    <span className="font-light text-base">{product.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Star className="w-3 h-3 fill-white/40" />
                    <span className="font-light">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MIDDLE CLEAR SPACE */}
          <div className="hidden md:block flex-1 min-h-[400px]"></div>

          {/* RIGHT SIDE CARDS */}
          <div className="flex flex-col gap-12 w-full md:w-[30%] lg:w-[25%] xl:w-1/5">
            {[
              { title: 'Citrus Bloom', price: '$65.50', rating: 4.5 },
              { title: 'Amber Wood', price: '$95.00', rating: 4.7 },
            ].map((product, i) => (
              <div key={i + 2} className="flex flex-col gap-4 group opacity-30 hover:opacity-80 transition-all duration-500 cursor-pointer">
                {/* Image Container */}
                <div className="bg-transparent rounded-2xl p-6 aspect-square flex items-center justify-center relative overflow-hidden border border-white/10">
                  <Image
                    src={`https://picsum.photos/seed/perfume${i + 2}/400/400`}
                    alt={product.title}
                    fill
                    className="object-contain p-8 opacity-50 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Details */}
                <div className="flex flex-col gap-1 px-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-light text-base tracking-wide uppercase" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>{product.title}</h4>
                    <span className="font-light text-base">{product.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Star className="w-3 h-3 fill-white/40" />
                    <span className="font-light">{product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
