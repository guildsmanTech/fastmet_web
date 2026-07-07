import { API_URL } from "@/helper/constant";
import type { IRafflePrize, IRewardTier } from "@/types/reward";

export const fetchRafflePrizes = async (): Promise<IRafflePrize[]> => {
  const res = await fetch(
    `${API_URL}/api/rewards/raffle?phase=pre_registration`,
  );
  if (!res.ok) throw new Error("Failed to fetch raffle prizes");
  const data = await res.json();
  return data.data;
};

export const fetchRewardTiers = async (
  type: "driver" | "user",
): Promise<IRewardTier[]> => {
  const res = await fetch(`${API_URL}/api/rewards/tiers?type=${type}`);
  if (!res.ok) throw new Error("Failed to fetch reward tiers");
  const data = await res.json();
  return data.data;
};
