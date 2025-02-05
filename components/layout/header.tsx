"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Profile } from "@/components/profile"
import { useSidebar } from "@/lib/context/SidebarContext"

export function Header() {
  const { toggleMobileMenu } = useSidebar()

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle mobile menu</span>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Profile />
      </div>
    </header>
  )
}
