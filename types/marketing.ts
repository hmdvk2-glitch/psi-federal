import { BaseRecord } from "../src/lib/storageEngine";

export type OfferType =
    | 'WELCOME_BONUS'
    | 'LOAN_DISCOUNT'
    | 'CASHBACK'
    | 'INTEREST_BOOST'
    | 'FEE_WAIVER'
    | 'MORTGAGE_REDUCTION'
    | 'REFERRAL'
    | 'SEASONAL';

export type PageChannel =
    | 'HOME'
    | 'PERSONAL'
    | 'BUSINESS'
    | 'LOANS'
    | 'CARDS'
    | 'SAVINGS'
    | 'MEMBERSHIP'
    | 'MOBILE'
    | 'SUPPORT';

export interface Offer extends BaseRecord {
    type: OfferType;
    title: string;
    description: string;
    value: string; // e.g. "8%", "₦50,000", "0.5% Off"
    startDate: string;
    endDate: string;
    eligibility: string;
    ctaText: string;
    ctaDestination: string; // e.g. "LOAN_FORM", "URL", "ACCOUNT_FORM"
    status: 'ACTIVE' | 'SCHEDULED' | 'EXPIRED';
    pageChannels: PageChannel[]; // Which pages this offer appears on
    bannerImage?: string; // Base64 or URL
    icon?: string; // Lucide icon name
}

export interface Lead extends BaseRecord {
    offerId?: string;
    type: 'LOAN' | 'ACCOUNT' | 'CARD' | 'PROMO' | 'GENERIC';
    data: Record<string, any>; // Flexible fields for different forms
    status: 'NEW' | 'CONTACTED' | 'APPROVED' | 'REJECTED';
    metadata: {
        pageSource: string;
        userAgent: string;
        ip?: string;
    };
}
