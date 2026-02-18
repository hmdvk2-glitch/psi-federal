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
    const demos: Omit<Offer, 'id' | 'createdAt' | 'updatedAt'>[] = [
        {
            type: 'WELCOME_BONUS',
            title: '$50,000 Welcome Bonus',
            description: 'Open a premium account today and get a cash bonus after your first deposit.',
            value: '$50,000',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            eligibility: 'New customers only. Min deposit $500k.',
            ctaText: 'Open Account Now',
            ctaDestination: 'ACCOUNT_FORM',
            status: 'ACTIVE',
            pageChannels: ['HOME', 'PERSONAL', 'MEMBERSHIP'],
            icon: 'Gift'
        },
        {
            type: 'INTEREST_BOOST',
            title: 'Fixed Deposit Boost: 18% APY',
            description: 'Grow your wealth faster with our limited-time interest rates on 12-month deposits.',
            value: '18%',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            eligibility: 'All customers. Min amount $1m.',
            ctaText: 'Secure This Rate',
            ctaDestination: 'PROMO_FORM',
            status: 'ACTIVE',
            pageChannels: ['HOME', 'SAVINGS'],
            icon: 'TrendingUp'
        },
        {
            type: 'LOAN_DISCOUNT',
            title: 'Business Expansion Loans @ 12%',
            description: 'Special low-interest rates for SMEs and growing businesses this quarter.',
            value: '12%',
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            eligibility: 'Verified business accounts only.',
            ctaText: 'Check Eligibility',
            ctaDestination: 'LOAN_FORM',
            status: 'ACTIVE',
            pageChannels: ['BUSINESS', 'LOANS'],
            icon: 'Briefcase'
        }
    ];

    for (const promo of demos) {
        await createOffer(promo);
    }
}
