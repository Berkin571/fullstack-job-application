import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

type UseFetchOptions = Record<string, any>;

type FetchCallback<T> = (
  supabaseAccessToken: string,
  options: UseFetchOptions,
  ...args: any[]
) => Promise<T>;

type UseFetchReturn<T> = {
  fn: (...args: any[]) => Promise<void>;
  data: T | undefined;
  loading: boolean | null;
  error: Error | null;
};

const useFetch = <T>(
  callback: FetchCallback<T>,
  options: UseFetchOptions = {}
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { session } = useSession();

  const fn = async (...args: any[]) => {
    setLoading(true);
    try {
      const supabaseAccessToken = await session?.getToken({
        template: "supabase",
      });

      if (!supabaseAccessToken) {
        throw new Error("Supabase access token is missing");
      }

      const response = await callback(supabaseAccessToken, options, ...args);
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error };
};

export default useFetch;
