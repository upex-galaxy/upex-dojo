"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-16 items-center px-4" data-testid="main-navigation">
      <Link href="/" className="mr-6 flex items-center space-x-4" data-testid="app-logo-link">
        <div className="relative w-48 h-12" data-testid="app-logo">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-aNrKvmWohrJYLPUbOYmYk6N3bCbf2O.png"
            alt="UPEX Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="hidden font-bold text-lg sm:inline-block text-foreground" data-testid="app-title">
          QA Automation Practice
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium ml-auto" data-testid="nav-actions">
        <Link
          href="/guide"
          className={cn(
            "flex items-center gap-1.5 transition-colors hover:text-foreground",
            pathname === "/guide" ? "text-foreground" : "text-muted-foreground"
          )}
          data-testid="nav-guide-link"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Guide</span>
        </Link>
        <ModeToggle />
      </nav>
    </div>
  )
}
