import { PaymentsTable } from "@/components/payments/payments-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PaymentsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>
      <PaymentsTable />
    </div>
  )
}
