declare module "@/utils/supabase" {
  const supabaseClient: (token: string) => Promise<any>;
  export default supabaseClient;
}
