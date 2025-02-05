"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { MoreHorizontal, Eye, Ban, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type TicketStatus = "valid" | "used" | "cancelled"

type Ticket = {
  id: string
  ticketNumber: string
  raffleName: string
  purchasedBy: string
  purchaseDate: string
  status: TicketStatus
  price: string
}

const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case "valid":
      return "success"
    case "used":
      return "secondary"
    case "cancelled":
      return "destructive"
  }
}

const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticketNumber",
    header: "Ticket #",
  },
  {
    accessorKey: "raffleName",
    header: "Raffle",
  },
  {
    accessorKey: "purchasedBy",
    header: "Purchased By",
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: TicketStatus = row.getValue("status")
      return (
        <Badge variant={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original
      const isValid = ticket.status === "valid"

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => console.log("View ticket", ticket.id)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {isValid && (
              <>
                <DropdownMenuItem
                  onClick={() => console.log("Mark as used", ticket.id)}
                  className="cursor-pointer"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Used
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Cancel ticket", ticket.id)}
                  className="cursor-pointer text-destructive"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Cancel Ticket
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const data: Ticket[] = [
  {
    id: "1",
    ticketNumber: "T-2025-0001",
    raffleName: "Summer Gadget Giveaway",
    purchasedBy: "John Doe",
    purchaseDate: "2025-02-01",
    status: "valid",
    price: "$10.00",
  },
  {
    id: "2",
    ticketNumber: "T-2025-0002",
    raffleName: "Summer Gadget Giveaway",
    purchasedBy: "Jane Smith",
    purchaseDate: "2025-02-01",
    status: "used",
    price: "$10.00",
  },
  {
    id: "3",
    ticketNumber: "T-2025-0003",
    raffleName: "Holiday Special Draw",
    purchasedBy: "Alice Johnson",
    purchaseDate: "2025-02-02",
    status: "cancelled",
    price: "$15.00",
  },
]

export function TicketsTable() {
  return <DataTable columns={columns} data={data} />
}
