import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://aherszeblsepaiqflinr.supabase.co";
const supabaseKey: string =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZXJzemVibHNlcGFpcWZsaW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMjI1NDAsImV4cCI6MjA0MDc5ODU0MH0.xyMY55uo6XP2l9YQ8WeUDm_gc4AQSIzKs0fup1UXH1M";

const supabaseClient = async (
  supabaseAccessToken: string
): Promise<SupabaseClient> => {
  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });

  return supabase;
};

export default supabaseClient;
