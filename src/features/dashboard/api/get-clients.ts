import { clientsData } from "@/data/clients-data";

export async function getClients() {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return clientsData;
}