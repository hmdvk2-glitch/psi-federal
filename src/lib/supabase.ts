import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase Config:", {
    url: supabaseUrl ? "Found" : "Missing",
    key: supabaseKey ? "Found" : "Missing"
});

export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Helper to check if backend is active
export const isBackendActive = (): boolean => !!supabase;
