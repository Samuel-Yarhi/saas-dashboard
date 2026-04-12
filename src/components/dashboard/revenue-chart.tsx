"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRevenueData } from "@/features/dashboard/hooks/use-revenue-data";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function RevenueChart() {
  const { data, isLoading } = useRevenueData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full min-w-0 md:h-[320px]">
  {isLoading ? (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      Loading chart...
    </div>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip
          formatter={(value) => {
            if (typeof value !== "number") return [String(value), "Revenue"];
            return [`$${value.toLocaleString()}`, "Revenue"];
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="currentColor"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )}
</div>
      </CardContent>
    </Card>
  );
}