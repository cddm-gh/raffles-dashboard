import { RafflesTable } from "@/components/raffles/raffles-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function RafflesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Raffles</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Raffle
        </Button>
      </div>
      <RafflesTable />
    </div>
  )
}
