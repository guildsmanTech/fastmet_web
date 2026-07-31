import {useQuery} from "@tanstack/react-query";
import {fetchAllowedDomains} from "@/api/settings";
import {ALLOWED_EMAIL_DOMAINS} from "@/helper/emailDomain";

export const useAllowedDomains = (): string[] => {
  const {data} = useQuery({
    queryKey: ["allowedDomains"],
    queryFn: fetchAllowedDomains,
    staleTime: Infinity,
  });
  return data ?? ALLOWED_EMAIL_DOMAINS;
};
