"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"

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
        <ModeToggle />
      </nav>
    </div>
  )
}
