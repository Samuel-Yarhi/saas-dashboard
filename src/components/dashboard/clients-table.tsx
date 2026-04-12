"use client";

import { useMemo, useState } from "react";
import { Client } from "@/data/clients-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClients } from "@/features/dashboard/hooks/use-clients";
import { getStatusBadgeVariant } from "@/features/dashboard/utils/get-status-badge-variant";
import { ClientFilters } from "@/components/dashboard/client-filters";
import { useClientFilters } from "@/features/dashboard/store/use-client-filters";
import { ClientRowActions } from "@/components/dashboard/client-row-actions";
import { ClientDetailsSheet } from "@/components/dashboard/client-details-sheet";
import { EditClientSheet } from "@/components/dashboard/edit-client-sheet";
import { toast } from "sonner";

export function ClientsTable() {
  const { data, isLoading } = useClients();
  const { search, status, plan, sortField, sortDirection } = useClientFilters();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [archivedClientIds, setArchivedClientIds] = useState<string[]>([]);
  const [editedClients, setEditedClients] = useState<Record<string, Client>>({});

  const mergedClients = useMemo(() => {
    return (data ?? []).map((client) => editedClients[client.id] ?? client);
  }, [data, editedClients]);

  const visibleClients = useMemo(() => {
    return mergedClients.filter(
      (client) => !archivedClientIds.includes(client.id)
    );
  }, [mergedClients, archivedClientIds]);

  const filteredClients = useMemo(() => {
    return visibleClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.company.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || client.status === status;
      const matchesPlan = plan === "All" || client.plan === plan;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [visibleClients, search, status, plan]);

  const sortedClients = useMemo(() => {
    return filteredClients.slice().sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1;

      if (sortField === "monthlyRevenue") {
        return (a.monthlyRevenue - b.monthlyRevenue) * direction;
      }

      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();

      if (aValue < bValue) return -1 * direction;
      if (aValue > bValue) return 1 * direction;
      return 0;
    });
  }, [filteredClients, sortField, sortDirection]);

  function handleViewClient(client: Client) {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  }

  function handleEditClient(client: Client) {
    setSelectedClient(client);
    setIsEditOpen(true);
  }

  function handleSaveClient(updatedClient: Client) {
    setEditedClients((prev) => ({
      ...prev,
      [updatedClient.id]: updatedClient,
    }));

    setSelectedClient(updatedClient);

    toast.success("Client updated", {
      description: (
        <span className="text-foreground">
          {updatedClient.name} was updated successfully.
        </span>
      ),
    });
  }

  function handleArchiveClient(clientId: string) {
    const clientToArchive = (data ?? []).find((client) => client.id === clientId);

    setArchivedClientIds((prev) => [...prev, clientId]);

    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
      setIsDetailsOpen(false);
      setIsEditOpen(false);
    }

    toast.success("Client archived", {
      description: (
        <span className="text-foreground">
          {clientToArchive
            ? `${clientToArchive.name} was archived successfully.`
            : "The client was archived successfully."}
        </span>
      ),
    });
  }

  return (
    <>
      <Card>
        <CardHeader className="space-y-4">
          <CardTitle>Clients</CardTitle>
          <ClientFilters />
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Loading clients...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="text-right">MRR</TableHead>
                    <TableHead className="w-[60px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedClients.length ? (
                    sortedClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {client.email}
                          </div>
                        </TableCell>

                        <TableCell>{client.company}</TableCell>

                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(client.status)}>
                            {client.status}
                          </Badge>
                        </TableCell>

                        <TableCell>{client.plan}</TableCell>

                        <TableCell className="text-right tabular-nums">
                          ${client.monthlyRevenue.toLocaleString()}
                        </TableCell>

                        <TableCell className="text-right">
                          <ClientRowActions
                            clientName={client.name}
                            onView={() => handleViewClient(client)}
                            onEdit={() => handleEditClient(client)}
                            onArchive={() => handleArchiveClient(client.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-sm text-muted-foreground"
                      >
                        No clients match the current filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <ClientDetailsSheet
        client={selectedClient}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />

      <EditClientSheet
        client={selectedClient}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={handleSaveClient}
      />
    </>
  );
}