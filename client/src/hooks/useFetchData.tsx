import { privateApi } from "@/utils/axios";
import { useEffect, useState } from "react";

const useFetchData = <T,>(
  url: string,
  deps: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    let isActive = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await privateApi.get(url, {
          headers: {
          },
          signal: controller.signal,
        });

        if (isActive) {
          setData(response?.data);
        }
      } catch (error: any) {
        if (isActive && error.name !== "AbortError" && error.name !== "CanceledError" && error.code !== "ERR_CANCELED") {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "An unexpected error occurred";
          setError(errorMessage);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [url, ...deps]);

  return { data, loading, error };
};

export default useFetchData;
