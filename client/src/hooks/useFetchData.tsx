import { privateApi } from "@/utils/axios";
import { useEffect, useState } from "react";

const useFetchData = <T,>(url: string, token: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url || !token) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await privateApi.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        setData(response?.data);
        setError(null);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "An unexpected error occurred";
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, token]);

  return { data, loading, error };
};

export default useFetchData;
