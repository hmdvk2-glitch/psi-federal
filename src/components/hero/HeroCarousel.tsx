
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { heroSlides } from '../../data/heroSlides';

interface HeroCarouselProps {
    onLoginClick?: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onLoginClick }) => {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = 6000;
        const step = 100;
        const stepTime = interval / step;

        const timer = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    setCurrent((prev) => (prev + 1) % heroSlides.length);
                    return 0;
                }
                return p + 1;
            });
        }, stepTime);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % heroSlides.length);
        setProgress(0);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
        setProgress(0);
    };

    return (
        <div className="relative h-[90vh] w-full overflow-hidden bg-[#001D4D] group select-none">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Premium Background Image with Parallax-like scale */}
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "linear" }}
                        src={heroSlides[current].image}
                        alt=""
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlays for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001D4D] via-[#001D4D]/60 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001D4D] via-transparent to-transparent z-10 opacity-60" />

                    {/* Content Container */}
                    <div className="absolute inset-0 z-20 flex items-center px-6 md:px-20 lg:px-32">
                        <div className={`max-w-5xl w-full ${heroSlides[current].alignment === 'center' ? 'mx-auto text-center' :
                            heroSlides[current].alignment === 'right' ? 'ml-auto text-right' : 'text-left'}`}>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className={`flex items-center gap-3 mb-6 ${heroSlides[current].alignment === 'center' ? 'justify-center' :
                                    heroSlides[current].alignment === 'right' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className="h-px w-8 bg-[#FFB81C]" />
                                <span className="text-[#FFB81C] text-sm font-black uppercase tracking-[0.3em]">
                                    {heroSlides[current].eyebrow}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8 italic uppercase"
                            >
                                {heroSlides[current].headline.split('.').map((part, i) => (
                                    <span key={i} className="block">{part}{i === 0 && '.'}</span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-lg md:text-xl text-blue-100 font-medium max-w-2xl mb-12 leading-relaxed opacity-80"
                            >
                                {heroSlides[current].subtext}
                            </motion.p>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className={`flex flex-col sm:flex-row gap-6 ${heroSlides[current].alignment === 'center' ? 'justify-center' :
                                    heroSlides[current].alignment === 'right' ? 'justify-end' : 'justify-start'}`}
                            >
                                <button
                                    onClick={onLoginClick}
                                    className="px-10 py-5 bg-white text-[#001D4D] font-black rounded-2xl hover:bg-[#FFB81C] transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                                >
                                    {heroSlides[current].ctaPrimary.text}
                                    <Zap size={18} fill="currentColor" />
                                </button>
                                <button className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black rounded-2xl hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
                                    {heroSlides[current].ctaSecondary.text}
                                </button>
                            </motion.div>

                            {/* Floating Stats / Trust Badges */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className={`mt-20 flex gap-8 ${heroSlides[current].alignment === 'center' ? 'justify-center' :
                                    heroSlides[current].alignment === 'right' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                    <div className="w-12 h-12 bg-[#FFB81C] rounded-xl flex items-center justify-center text-[#001D4D]">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-black text-white leading-none">{heroSlides[current].statValue}</p>
                                        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">{heroSlides[current].statLabel}</p>
                                    </div>
                                </div>

                                <div className="hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                                        <Globe size={28} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-2xl font-black text-white leading-none">Global</p>
                                        <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest">Access Protocol</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 right-12 z-30 flex items-center gap-6">
                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-white/40 font-mono text-sm">0{current + 1}</span>
                    <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#FFB81C]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="text-white/40 font-mono text-sm">0{heroSlides.length}</span>
                </div>
            </div>

            {/* Pagination Thumbnails (Decorative) */}
            <div className="absolute left-12 bottom-12 z-30 hidden lg:flex gap-4">
                {heroSlides.map((slide, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setCurrent(idx); setProgress(0); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx ? "bg-[#FFB81C] w-8" : "bg-white/20 hover:bg-white/40"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
