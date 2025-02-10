"use client"

import { useEffect, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { format } from "date-fns"
import { Database } from "@/lib/supabase/types"
import { UsersTableSkeleton } from "./users-table-skeleton"

type User = Database['public']['Tables']['users']['Row']

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "permission",
    header: "Role",
    cell: ({ row }) => {
      const permission = row.getValue("permission") as string | null
      return permission || "User"
    }
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string | null
      if (!date) return "-"
      return format(new Date(date), "PP")
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

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
              onClick={() => console.log("Edit user", user.id)}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete user", user.id)}
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

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })
        
        setUsers(data || [])
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <UsersTableSkeleton />
  }

  return <DataTable columns={columns} data={users} />
}
