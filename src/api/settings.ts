import {API_URL} from "@/helper/constant";

export const fetchAllowedDomains = async (): Promise<string[]> => {
  const res = await fetch(`${API_URL}/api/register/allowed-domains`);
  if (!res.ok) throw new Error("Failed to fetch allowed domains");
  const data = await res.json();
  return data.allowedEmailDomains as string[];
};
