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
import { MoreHorizontal, Eye, RotateCcw, Ban, Receipt } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type PaymentStatus = "completed" | "pending" | "failed" | "refunded"
type PaymentMethod = "credit_card" | "debit_card" | "pix" | "bank_transfer"

type Payment = {
  id: string
  transactionId: string
  amount: string
  paymentMethod: PaymentMethod
  status: PaymentStatus
  customerName: string
  raffleName: string
  date: string
}

const getStatusColor = (status: PaymentStatus): "destructive" | "secondary" | "default" | "outline" => {
  switch (status) {
    case "completed":
      return "default"
    case "pending":
      return "secondary"
    case "failed":
      return "destructive"
    case "refunded":
      return "outline"
  }
}

const getPaymentMethodLabel = (method: PaymentMethod) => {
  switch (method) {
    case "credit_card":
      return "Credit Card"
    case "debit_card":
      return "Debit Card"
    case "pix":
      return "PIX"
    case "bank_transfer":
      return "Bank Transfer"
  }
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "customerName",
    header: "Customer",
  },
  {
    accessorKey: "raffleName",
    header: "Raffle",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => {
      const method: PaymentMethod = row.getValue("paymentMethod")
      return getPaymentMethodLabel(method)
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: PaymentStatus = row.getValue("status")
      return (
        <Badge variant={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      const isPending = payment.status === "pending"
      const isCompleted = payment.status === "completed"

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
              onClick={() => console.log("View payment", payment.id)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Download receipt", payment.id)}
              className="cursor-pointer"
            >
              <Receipt className="mr-2 h-4 w-4" />
              Download Receipt
            </DropdownMenuItem>
            {isPending && (
              <>
                <DropdownMenuItem
                  onClick={() => console.log("Retry payment", payment.id)}
                  className="cursor-pointer"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retry Payment
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => console.log("Cancel payment", payment.id)}
                  className="cursor-pointer text-destructive"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Cancel Payment
                </DropdownMenuItem>
              </>
            )}
            {isCompleted && (
              <DropdownMenuItem
                onClick={() => console.log("Refund payment", payment.id)}
                className="cursor-pointer text-destructive"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Refund Payment
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const data: Payment[] = [
  {
    id: "1",
    transactionId: "TRX-2025-0001",
    amount: "$30.00",
    paymentMethod: "credit_card",
    status: "completed",
    customerName: "John Doe",
    raffleName: "Summer Gadget Giveaway",
    date: "2025-02-01",
  },
  {
    id: "2",
    transactionId: "TRX-2025-0002",
    amount: "$45.00",
    paymentMethod: "pix",
    status: "pending",
    customerName: "Jane Smith",
    raffleName: "Summer Gadget Giveaway",
    date: "2025-02-01",
  },
  {
    id: "3",
    transactionId: "TRX-2025-0003",
    amount: "$15.00",
    paymentMethod: "bank_transfer",
    status: "failed",
    customerName: "Alice Johnson",
    raffleName: "Holiday Special Draw",
    date: "2025-02-02",
  },
  {
    id: "4",
    transactionId: "TRX-2025-0004",
    amount: "$30.00",
    paymentMethod: "debit_card",
    status: "refunded",
    customerName: "Bob Wilson",
    raffleName: "Holiday Special Draw",
    date: "2025-02-02",
  },
]

export function PaymentsTable() {
  return <DataTable columns={columns} data={data} />
}
