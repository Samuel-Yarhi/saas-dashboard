import { revenueData } from "@/data/revenue-data";

export async function getRevenueData() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return revenueData;
}