import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { SidebarProvider } from "@/lib/context/SidebarContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen flex-1 flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 space-y-4 p-8 pt-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
