import { dashboardMetrics } from "@/data/dashboard-metrics";

export async function getDashboardMetrics() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return dashboardMetrics;
}