type ClientStatus = "Active" | "Trial" | "Churned";

export function getStatusBadgeVariant(status: ClientStatus) {
  switch (status) {
    case "Active":
      return "default";
    case "Trial":
      return "secondary";
    case "Churned":
      return "destructive";
    default:
      return "secondary";
  }
}