'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersTable } from '@/components/users/users-table'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { AddUserDialog } from './add-user-dialog'

export default function UsersPage() {
  const [key, setKey] = useState(0)
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>
          <Button onClick={() => setShowAddDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <UsersTable key={key} />
        </CardContent>
      </Card>
      <AddUserDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onUserAdded={() => setKey(key + 1)}
      />
    </div>
  )
}
