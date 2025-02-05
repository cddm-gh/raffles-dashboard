import { LucideIcon } from "lucide-react"

export interface SidebarItem {
  title: string
  href: string
  icon: LucideIcon
}

export interface SidebarContextType {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleCollapse: () => void
  toggleMobileMenu: () => void
  handleMobileNavigation: () => void
}
