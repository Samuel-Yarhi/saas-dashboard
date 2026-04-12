"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ClientRowActionsProps = {
  clientName: string;
  onView: () => void;
  onEdit: () => void;
  onArchive: () => void;
};

export function ClientRowActions({
  clientName,
  onView,
  onEdit,
  onArchive,
}: ClientRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Open actions for ${clientName}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>View client</DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>Edit client</DropdownMenuItem>
        <DropdownMenuItem onClick={onArchive}>Archive client</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}