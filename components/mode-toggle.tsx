"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ToggleSwitch } from "@/components/ui/toggle-switch"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only show the toggle after mounting to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center space-x-3" data-testid="theme-toggle-placeholder">
        <div className="w-[1.2rem] h-[1.2rem]" />
        <ToggleSwitch checked={false} />
        <div className="w-[1.2rem] h-[1.2rem]" />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3" data-testid="theme-toggle-container">
      <Sun
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        data-testid="theme-light-icon"
      />
      <ToggleSwitch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
        data-testid="theme-toggle-switch"
      />
      <Moon
        className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        data-testid="theme-dark-icon"
      />
    </div>
  )
}
