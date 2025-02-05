"use client"

import React, { JSX } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Ticket,
  Gift,
  CreditCard,
  Trophy,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/lib/context/SidebarContext"
import type { SidebarItem } from "@/types/sidebar"

const sidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Raffles",
    href: "/dashboard/raffles",
    icon: Trophy,
  },
  {
    title: "Tickets",
    href: "/dashboard/tickets",
    icon: Ticket,
  },
  {
    title: "Prizes",
    href: "/dashboard/prizes",
    icon: Gift,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
]

export function Sidebar(): JSX.Element {
  const pathname = usePathname()
  const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobileMenu } = useSidebar()

  return (
    <>
      <aside
        className={cn(
          // Base styles
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-background py-4 transition-all duration-300",
          // Width styles
          isCollapsed ? "w-[60px] px-2" : "w-[200px] px-3",
          // Desktop styles
          "lg:relative",
          // Mobile styles
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className={cn(
          "mb-8 flex items-center justify-between",
          isCollapsed ? "px-2" : "px-4"
        )}>
          <h1 className={cn(
            "text-xl font-bold transition-all duration-300",
            isCollapsed && "hidden"
          )}>
            Dashboard
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleMobileMenu()
                  }
                }}
                className={cn(
                  "flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive ? "bg-accent" : "transparent",
                  isCollapsed && "justify-center px-2"
                )}
                aria-current={isActive ? "page" : undefined}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className={cn(
                  "transition-all duration-300",
                  isCollapsed && "hidden"
                )}>
                  {item.title}
                </span>
              </Link>
            )
          })}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute -right-4 top-4 h-8 w-8 rounded-full border bg-background",
            "hidden lg:flex"
          )}
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
