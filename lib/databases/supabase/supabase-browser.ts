import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const browserSupabase = createBrowserSupabaseClient();

export default browserSupabase;
