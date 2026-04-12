"use client";

import { AppShell } from "@/components/layout/app-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { KpiCardSkeleton } from "@/components/dashboard/kpi-card-skeleton";
import { useDashboardMetrics } from "@/features/dashboard/hooks/use-dashboard-metrics";
import { AlertCircle, CreditCard, DollarSign, Users } from "lucide-react";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ClientsTable } from "@/components/dashboard/clients-table";

const iconMap = {
  revenue: DollarSign,
  clients: Users,
  subscriptions: CreditCard,
  tickets: AlertCircle,
};

export default function HomePage() {
  const { data, isLoading } = useDashboardMetrics();

  return (
    <AppShell>
      <div className="space-y-6">
        <div id="overview">
          <h2 className="text-xl font-bold md:text-2xl">Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Key metrics for the current period.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <KpiCardSkeleton key={index} />
              ))
            : data?.map((metric) => (
                <KpiCard
                  key={metric.id}
                  title={metric.title}
                  value={metric.value}
                  description={metric.description}
                  icon={iconMap[metric.icon]}
                />
              ))}
        </section>

        <section>
          <RevenueChart />
        </section>

        <section id="clients">
          <ClientsTable />
        </section>
      </div>
    </AppShell>
  );
}