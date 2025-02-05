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
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type RaffleStatus = "active" | "completed" | "draft"

type Raffle = {
  id: string
  name: string
  status: RaffleStatus
  ticketsSold: number
  prizePool: string
  endDate: string
}

const getStatusColor = (status: RaffleStatus) => {
  switch (status) {
    case "active":
      return "success"
    case "completed":
      return "secondary"
    case "draft":
      return "default"
  }
}

const columns: ColumnDef<Raffle>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: RaffleStatus = row.getValue("status")
      return (
        <Badge variant={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "ticketsSold",
    header: "Tickets Sold",
  },
  {
    accessorKey: "prizePool",
    header: "Prize Pool",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const raffle = row.original

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
              onClick={() => console.log("View raffle", raffle.id)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Edit raffle", raffle.id)}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete raffle", raffle.id)}
              className="cursor-pointer text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const data: Raffle[] = [
  {
    id: "1",
    name: "Summer Gadget Giveaway",
    status: "active",
    ticketsSold: 1234,
    prizePool: "$5,000",
    endDate: "2025-03-01",
  },
  {
    id: "2",
    name: "Holiday Special Draw",
    status: "completed",
    ticketsSold: 2500,
    prizePool: "$10,000",
    endDate: "2025-01-15",
  },
  {
    id: "3",
    name: "Spring Raffle Event",
    status: "draft",
    ticketsSold: 0,
    prizePool: "$2,500",
    endDate: "2025-04-15",
  },
]

export function RafflesTable() {
  return <DataTable columns={columns} data={data} />
}
