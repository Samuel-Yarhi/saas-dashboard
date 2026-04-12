import { create } from "zustand";

type ClientStatus = "All" | "Active" | "Trial" | "Churned";
type ClientPlan = "All" | "Starter" | "Pro" | "Enterprise";
type SortField = "name" | "company" | "status" | "plan" | "monthlyRevenue";
type SortDirection = "asc" | "desc";

type ClientFiltersState = {
  search: string;
  status: ClientStatus;
  plan: ClientPlan;
  sortField: SortField;
  sortDirection: SortDirection;
  setSearch: (search: string) => void;
  setStatus: (status: ClientStatus) => void;
  setPlan: (plan: ClientPlan) => void;
  setSortField: (sortField: SortField) => void;
  setSortDirection: (sortDirection: SortDirection) => void;
  resetFilters: () => void;
};

export const useClientFilters = create<ClientFiltersState>((set) => ({
  search: "",
  status: "All",
  plan: "All",
  sortField: "monthlyRevenue",
  sortDirection: "desc",
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setPlan: (plan) => set({ plan }),
  setSortField: (sortField) => set({ sortField }),
  setSortDirection: (sortDirection) => set({ sortDirection }),
  resetFilters: () =>
    set({
      search: "",
      status: "All",
      plan: "All",
      sortField: "monthlyRevenue",
      sortDirection: "desc",
    }),
}));