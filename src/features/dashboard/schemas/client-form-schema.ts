import { z } from "zod";

export const clientFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  status: z.enum(["Active", "Trial", "Churned"]),
  plan: z.enum(["Starter", "Pro", "Enterprise"]),
  monthlyRevenue: z.number().min(0, "Revenue cannot be negative"),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;