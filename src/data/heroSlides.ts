
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
    statValue?: string;
    statLabel?: string;
}

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070&auto=format&fit=crop",
        eyebrow: "Elite Federal Credit Union",
        headline: "Institutional Grade Banking Power.",
        subtext: "Experience the precision of PSI Federal CU. Our advanced core manages over $14B in assets with millisecond latency and federal-grade security.",
        ctaPrimary: { text: "Open Elite Account", link: "/register" },
        ctaSecondary: { text: "Institutional Rates", link: "/about" },
        alignment: "left",
        overlayOpacity: 0.4,
        statValue: "$14.2B",
        statLabel: "Assets Managed"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop",
        eyebrow: "Wealth Management",
        headline: "Preserving Legacy Across Generations.",
        subtext: "Sophisticated asset protection and growth strategies designed for the high-net-worth member. Insured by NCUA up to $250,000.",
        ctaPrimary: { text: "Private Banking", link: "/register" },
        ctaSecondary: { text: "View Portfolio Services", link: "/rates" },
        alignment: "center",
        overlayOpacity: 0.5,
        statValue: "18.5%",
        statLabel: "APY Yield Boost"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        eyebrow: "Global Operations",
        headline: "Banking Without Boundaries.",
        subtext: "Access your capital globally with zero transaction fees and real-time fraud monitoring. The definitive digital core for modern members.",
        ctaPrimary: { text: "Get Mobile App", link: "/retirement" },
        ctaSecondary: { text: "Security Protocols", link: "/contact" },
        alignment: "right",
        overlayOpacity: 0.4,
        statValue: "24/7",
        statLabel: "Fraud Shield"
    }
];
