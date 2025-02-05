export interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export interface SidebarContextType {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleCollapse: () => void
  toggleMobileMenu: () => void
}
