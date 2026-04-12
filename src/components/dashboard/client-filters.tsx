"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClientFilters } from "@/features/dashboard/store/use-client-filters";

export function ClientFilters() {
  const {
    search,
    status,
    plan,
    sortField,
    sortDirection,
    setSearch,
    setStatus,
    setPlan,
    setSortField,
    setSortDirection,
  } = useClientFilters();

  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <Input
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="lg:max-w-sm"
      />

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All statuses</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Trial">Trial</SelectItem>
          <SelectItem value="Churned">Churned</SelectItem>
        </SelectContent>
      </Select>

      <Select value={plan} onValueChange={setPlan}>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All plans</SelectItem>
          <SelectItem value="Starter">Starter</SelectItem>
          <SelectItem value="Pro">Pro</SelectItem>
          <SelectItem value="Enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortField} onValueChange={setSortField}>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Client name</SelectItem>
          <SelectItem value="company">Company</SelectItem>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="plan">Plan</SelectItem>
          <SelectItem value="monthlyRevenue">MRR</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortDirection} onValueChange={setSortDirection}>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Direction" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}