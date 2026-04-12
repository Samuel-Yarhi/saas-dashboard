export type DashboardMetric = {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: "revenue" | "clients" | "subscriptions" | "tickets";
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "revenue",
    title: "Monthly Revenue",
    value: "$24,500",
    description: "+12.4% from last month",
    icon: "revenue",
  },
  {
    id: "clients",
    title: "Active Clients",
    value: "128",
    description: "+8 new this week",
    icon: "clients",
  },
  {
    id: "subscriptions",
    title: "Paid Subscriptions",
    value: "93",
    description: "72.6% conversion rate",
    icon: "subscriptions",
  },
  {
    id: "tickets",
    title: "Open Tickets",
    value: "17",
    description: "5 high priority",
    icon: "tickets",
  },
];