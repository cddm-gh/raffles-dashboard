'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UsersTable } from '@/components/users/users-table'

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  )
}
