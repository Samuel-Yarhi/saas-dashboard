"use client";

import { useQuery } from "@tanstack/react-query";
import { getRevenueData } from "../api/get-revenue-data";

export function useRevenueData() {
  return useQuery({
    queryKey: ["revenue-data"],
    queryFn: getRevenueData,
  });
}