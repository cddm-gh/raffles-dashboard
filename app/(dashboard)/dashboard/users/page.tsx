import { UsersTable } from "@/components/users/users-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <UsersTable />
    </div>
  )
}
