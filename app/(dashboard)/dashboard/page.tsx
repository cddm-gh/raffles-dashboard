"use client"

import { StatCard } from "@/components/dashboard/stat-card"
import { Users, Trophy, Gift, DollarSign } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="1,234"
          icon={Users}
        />
        <StatCard
          title="Active Raffles"
          value="12"
          icon={Trophy}
        />
        <StatCard
          title="Prizes Awarded"
          value="89"
          icon={Gift}
        />
        <StatCard
          title="Revenue"
          value="$12,345"
          icon={DollarSign}
        />
      </div>
    </div>
  )
}
