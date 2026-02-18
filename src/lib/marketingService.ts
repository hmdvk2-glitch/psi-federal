import { createRecordAsync, queryCollectionAsync, updateRecordAsync, deleteRecordAsync } from './storageEngine';
import { Offer, Lead } from '../../types/marketing';

const OFFERS_COLLECTION = 'offers' as any;
const LEADS_COLLECTION = 'leads' as any;

export async function getOffers(channel?: string): Promise<Offer[]> {
    const all = await queryCollectionAsync<Offer>(OFFERS_COLLECTION);
    if (all.length === 0) {
        // Initialize dummy offers if empty
        await initDemoOffers();
        return queryCollectionAsync<Offer>(OFFERS_COLLECTION, channel ? (o => o.pageChannels.includes(channel as any)) : undefined);
    }
    if (channel) {
        return all.filter(o => o.pageChannels.includes(channel as any));
    }
    return all;
}

export async function createOffer(payload: Omit<Offer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Offer> {
    return createRecordAsync<Offer>(OFFERS_COLLECTION, payload);
}

export async function updateOffer(id: string, updates: Partial<Offer>): Promise<Offer | null> {
    return updateRecordAsync<Offer>(OFFERS_COLLECTION, id, updates);
}

export async function deleteOffer(id: string): Promise<boolean> {
    return deleteRecordAsync(OFFERS_COLLECTION, id);
}

// Leads
export async function submitLead(payload: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    return createRecordAsync<Lead>(LEADS_COLLECTION, payload);
}

export async function getLeads(): Promise<Lead[]> {
    return queryCollectionAsync<Lead>(LEADS_COLLECTION);
}

async function initDemoOffers() {
    const existing = await queryCollectionAsync<Offer>(OFFERS_COLLECTION);

    const demos: Omit<Offer, 'id' | 'createdAt' | 'updatedAt'>[] = [
        {
            type: 'WELCOME_BONUS',
            title: 'PSI Federal CU: $50,000 Welcome Bonus',
            description: 'Open a premium account today and get a cash bonus after your first deposit.',
            value: '$50,000',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            eligibility: 'New customers only. Min deposit $500k.',
            ctaText: 'Open Account Now',
            ctaDestination: 'ACCOUNT_FORM',
            status: 'ACTIVE',
            pageChannels: ['HOME', 'PERSONAL', 'MEMBERSHIP'],
            icon: 'Gift',
            bannerImage: 'https://images.unsplash.com/photo-1559526324-593bc853d999?q=80&w=2070&auto=format&fit=crop'
        },
        {
            type: 'INTEREST_BOOST',
            title: 'PSI Federal CU: 18.5% APY Boost',
            description: 'Grow your wealth faster with our limited-time interest rates on 12-month deposits.',
            value: '18.5%',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            eligibility: 'All customers. Min amount $1m.',
            ctaText: 'Secure This Rate',
            ctaDestination: 'PROMO_FORM',
            status: 'ACTIVE',
            pageChannels: ['HOME', 'SAVINGS'],
            icon: 'TrendingUp',
            bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
        }
    ];

    for (const promo of demos) {
        // Check if a similar offer already exists to avoid duplicates, but update if images are missing
        const match = existing.find(o => o.type === promo.type);
        if (!match) {
            await createOffer(promo);
        } else if (!match.bannerImage) {
            await updateOffer(match.id, { bannerImage: promo.bannerImage, title: promo.title });
        }
    }
}
