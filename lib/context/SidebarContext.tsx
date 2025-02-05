"use client"

import { createContext, useContext, useState, useCallback, JSX } from "react"
import type { SidebarContextType } from "@/types/sidebar"

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  const toggleCollapse = useCallback((): void => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const toggleMobileMenu = useCallback((): void => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider 
      value={{ 
        isCollapsed, 
        isMobileOpen, 
        toggleCollapse, 
        toggleMobileMenu 
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext)
  
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  
  return context
}