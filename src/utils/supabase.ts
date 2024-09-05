import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://aherszeblsepaiqflinr.supabase.co";
const supabaseKey: string =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZXJzemVibHNlcGFpcWZsaW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMjI1NDAsImV4cCI6MjA0MDc5ODU0MH0.xyMY55uo6XP2l9YQ8WeUDm_gc4AQSIzKs0fup1UXH1M";

// Singleton für SupabaseClient
let supabase: SupabaseClient | null = null;

const getSupabaseClient = async (
  supabaseAccessToken: string
): Promise<SupabaseClient> => {
  if (!supabase) {
    // Erstelle die Supabase-Instanz nur einmal
    supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    });
  } else {
    // Setze die Session neu mit dem Access Token
    await supabase.auth.setSession({
      access_token: supabaseAccessToken,
      refresh_token: "",
    });
  }

  return supabase;
};

export default getSupabaseClient;
