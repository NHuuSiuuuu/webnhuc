import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";
export default function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const res = await axios.get("/account/getMe");
      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, isError };
}
