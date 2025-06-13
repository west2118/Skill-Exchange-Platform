import { publicApi } from "@/utils/axios";
import { useState } from "react";

const useAddressFromCoords = () => {
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await publicApi.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${
          import.meta.env.VITE_API_GEOCODER
        }`
      );

      const result = response.data.results[0];
      const formatted = result?.formatted;
      const postcode = result?.components?.postcode;

      if (formatted && postcode) {
        return { address: formatted, zip: postcode };
      } else {
        setError("Address or ZIP not found.");
      }
    } catch (error) {
      setError("Failed to fetch address.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchAddress,
  };
};

export default useAddressFromCoords;
