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
import { MoreHorizontal, Eye, Pencil, Trash, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type PrizeStatus = "available" | "awarded" | "pending"

type Prize = {
  id: string
  name: string
  raffleName: string
  value: string
  status: PrizeStatus
  winnerName?: string
  tier: string
}

const getStatusColor = (status: PrizeStatus): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "available":
      return "default"
    case "awarded":
      return "secondary"
    case "pending":
      return "outline"
  }
}

const columns: ColumnDef<Prize>[] = [
  {
    accessorKey: "name",
    header: "Prize Name",
  },
  {
    accessorKey: "raffleName",
    header: "Raffle",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => {
      const tier = row.getValue("tier") as string
      return (
        <Badge variant="outline">
          {tier}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: PrizeStatus = row.getValue("status")
      return (
        <Badge variant={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "winnerName",
    header: "Winner",
    cell: ({ row }) => {
      const winnerName = row.getValue("winnerName")
      return winnerName || "-"
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const prize = row.original
      const isAvailable = prize.status === "available"

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
              onClick={() => console.log("View prize", prize.id)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            {isAvailable && (
              <>
                <DropdownMenuItem
                  onClick={() => console.log("Edit prize", prize.id)}
                  className="cursor-pointer"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Assign winner", prize.id)}
                  className="cursor-pointer"
                >
                  <Award className="mr-2 h-4 w-4" />
                  Assign Winner
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Delete prize", prize.id)}
                  className="cursor-pointer text-destructive"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const data: Prize[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    raffleName: "Summer Gadget Giveaway",
    value: "$999",
    status: "available",
    tier: "1st Prize",
  },
  {
    id: "2",
    name: "PlayStation 5",
    raffleName: "Summer Gadget Giveaway",
    value: "$499",
    status: "awarded",
    winnerName: "John Doe",
    tier: "2nd Prize",
  },
  {
    id: "3",
    name: "AirPods Pro",
    raffleName: "Holiday Special Draw",
    value: "$249",
    status: "pending",
    winnerName: "Jane Smith",
    tier: "3rd Prize",
  },
]

export function PrizesTable() {
  return <DataTable columns={columns} data={data} />
}
