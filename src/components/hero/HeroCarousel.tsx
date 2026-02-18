
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../../data/heroSlides';

interface HeroCarouselProps {
    onLoginClick?: () => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onLoginClick }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length);
        }, 5500);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-slate-900 group">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <img
                        src={heroSlides[current].image}
                        alt={heroSlides[current].headline}
                        className="w-full h-full object-cover"
                        loading={current === 0 ? "eager" : "lazy"}
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10"
                        style={{ opacity: heroSlides[current].overlayOpacity + 0.3 }}
                    />

                    <div className={`absolute inset-0 flex items-center p-6 md:p-20 ${heroSlides[current].alignment === 'left' ? 'justify-start' :
                        heroSlides[current].alignment === 'right' ? 'justify-end' : 'justify-center'
                        }`}>
                        <div className={`max-w-4xl text-white space-y-8 ${heroSlides[current].alignment === 'center' ? 'text-center' : 'text-left'
                            }`}>
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-block px-4 py-1.5 bg-blue-600/20 backdrop-blur-md rounded-full text-blue-300 text-sm font-bold tracking-widest uppercase border border-blue-500/30"
                            >
                                {heroSlides[current].eyebrow}
                            </motion.span>
                            <motion.h1
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-5xl md:text-8xl font-black leading-tight tracking-tight"
                            >
                                {heroSlides[current].headline}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl leading-relaxed"
                            >
                                {heroSlides[current].subtext}
                            </motion.p>
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.9 }}
                                className={`flex flex-col sm:flex-row gap-6 pt-4 ${heroSlides[current].alignment === 'center' ? 'justify-center' : 'justify-start'
                                    }`}
                            >
                                <button
                                    onClick={onLoginClick}
                                    className="px-10 py-5 bg-[#002D72] text-white font-bold rounded-2xl hover:bg-[#003da1] transition-all hover:scale-105 shadow-xl shadow-blue-900/20"
                                >
                                    {heroSlides[current].ctaPrimary.text}
                                </button>
                                <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all hover:scale-105">
                                    {heroSlides[current].ctaSecondary.text}
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 hidden md:block"
            >
                <ChevronRight size={32} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                {heroSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`transition-all duration-500 rounded-full ${current === idx ? "w-12 h-3 bg-[#002D72]" : "w-3 h-3 bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
