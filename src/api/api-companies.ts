import { SupabaseClient } from "@supabase/supabase-js";
import supabaseClient from "../utils/supabase";

// Fetch Companies
export async function getCompanies(token: string) {
  const supabase: SupabaseClient = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error fetching Companies:", error);
    return [];
  }

  return data;
}
