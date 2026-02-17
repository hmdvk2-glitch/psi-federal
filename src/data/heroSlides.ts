
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
        image: "/media/hero/family-going-adventure-together.jpg",
        eyebrow: "Financial Freedom",
        headline: "Your Journey Starts Here",
        subtext: "Experience banking that moves as fast as you do with PSI Federal's advanced digital solutions.",
        ctaPrimary: { text: "Get Started", link: "/register" },
        ctaSecondary: { text: "Learn More", link: "/about" },
        alignment: "center",
        overlayOpacity: 0.3
    },
    {
        id: 2,
        image: "/media/hero/family-with-child.jpg",
        eyebrow: "Family First",
        headline: "Building a Better Future",
        subtext: "Secure your family's financial well-being with our trusted wealth management services.",
        ctaPrimary: { text: "Open Account", link: "/register" },
        ctaSecondary: { text: "View Rates", link: "/rates" },
        alignment: "left",
        overlayOpacity: 0.4
    },
    {
        id: 3,
        image: "/media/hero/retirement-home-security.jpg",
        eyebrow: "Secure Retirement",
        headline: "Peace of Mind Guaranteed",
        subtext: "Retire with confidence knowing your assets are protected by our industry-leading security.",
        ctaPrimary: { text: "Plan Now", link: "/retirement" },
        ctaSecondary: { text: "Contact Us", link: "/contact" },
        alignment: "right",
        overlayOpacity: 0.3
    }
];
