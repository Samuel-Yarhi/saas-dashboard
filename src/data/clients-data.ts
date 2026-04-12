export type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  status: "Active" | "Trial" | "Churned";
  plan: "Starter" | "Pro" | "Enterprise";
  monthlyRevenue: number;
};

export const clientsData: Client[] = [
  {
    id: "1",
    name: "Olivia Martin",
    company: "Northstar Labs",
    email: "olivia@northstarlabs.com",
    status: "Active",
    plan: "Pro",
    monthlyRevenue: 2400,
  },
  {
    id: "2",
    name: "Jackson Lee",
    company: "BluePeak Systems",
    email: "jackson@bluepeaksystems.com",
    status: "Trial",
    plan: "Starter",
    monthlyRevenue: 400,
  },
  {
    id: "3",
    name: "Sofia Chen",
    company: "SummitIQ",
    email: "sofia@summitiq.com",
    status: "Active",
    plan: "Enterprise",
    monthlyRevenue: 6200,
  },
  {
    id: "4",
    name: "Ethan Walker",
    company: "Vertex Works",
    email: "ethan@vertexworks.com",
    status: "Churned",
    plan: "Pro",
    monthlyRevenue: 0,
  },
  {
    id: "5",
    name: "Mia Johnson",
    company: "LumenSoft",
    email: "mia@lumensoft.com",
    status: "Active",
    plan: "Pro",
    monthlyRevenue: 3100,
  },
];