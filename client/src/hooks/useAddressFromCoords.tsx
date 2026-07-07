import axios from "axios";
import { useState } from "react";

const useAddressFromCoords = () => {
  const [loading, setLoading] = useState<boolean | null>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (lat: number, lng: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      const result = response.data;
      const formatted = result?.display_name;
      const postcode = result?.address?.postcode;

      if (formatted) {
        return { address: formatted, zip: postcode || "" };
      } else {
        const msg = "Address not found.";
        setError(msg);
        return { error: msg };
      }
    } catch (error) {
      const msg = "Failed to fetch address.";
      setError(msg);
      return { error: msg };
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
