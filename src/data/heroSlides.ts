
export interface HeroSlide {
    id: number;
    image: string;
    eyebrow: string;
    headline: string;
    subtext: string;
    ctaPrimary: { text: string; link: string };
    ctaSecondary: { text: string; link: string };
    alignment: 'left' | 'center' | 'right';
    overlayOpacity: number;
}

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1549421263-52495adc454c?q=80&w=1974&auto=format&fit=crop",
        eyebrow: "Elite Financial Power",
        headline: "PSI Federal CU: The Future of Banking",
        subtext: "Experience institution-grade banking that moves as fast as you do with PSI Federal CU's advanced digital ecosystem.",
        ctaPrimary: { text: "Secure Your Future", link: "/register" },
        ctaSecondary: { text: "Explore Benefits", link: "/about" },
        alignment: "center",
        overlayOpacity: 0.3
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=2070&auto=format&fit=crop",
        eyebrow: "Institutional Wealth",
        headline: "Building Generational Security",
        subtext: "Secure your legacy with our trusted wealth management and federal-grade asset protection.",
        ctaPrimary: { text: "Open High-Yield Account", link: "/register" },
        ctaSecondary: { text: "View Performance", link: "/rates" },
        alignment: "left",
        overlayOpacity: 0.4
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
        eyebrow: "Total Asset Protection",
        headline: "Peace of Mind, Guaranteed",
        subtext: "Retire with absolute confidence knowing your assets are shielded by our industry-leading security protocols.",
        ctaPrimary: { text: "Start Planning", link: "/retirement" },
        ctaSecondary: { text: "Security Audit", link: "/contact" },
        alignment: "right",
        overlayOpacity: 0.3
    }
];
