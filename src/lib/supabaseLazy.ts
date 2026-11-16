// Loads the Supabase client only when a public section actually needs it,
// so the ~220 KB SDK is not part of the first page load.
export const getSupabase = () => import('./supabase').then((m) => m.supabase);
