"use client";

import { Client } from "@/data/clients-data";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeVariant } from "@/features/dashboard/utils/get-status-badge-variant";

type ClientDetailsSheetProps = {
  client: Client | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ClientDetailsSheet({
  client,
  open,
  onOpenChange,
}: ClientDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{client ? client.name : "Client details"}</SheetTitle>
          <SheetDescription>
            View client information and account details.
          </SheetDescription>
        </SheetHeader>

        {client ? (
          <div className="mt-6 space-y-4 ml-6">
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium">{client.company}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <div className="mt-1">
                <Badge variant={getStatusBadgeVariant(client.status)}>
                  {client.status}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="font-medium">{client.plan}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="font-medium tabular-nums">
                ${client.monthlyRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}