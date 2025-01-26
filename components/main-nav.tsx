"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-16 items-center px-4">
      <Link href="/" className="mr-6 flex items-center space-x-4">
        <div className="relative w-48 h-12">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-aNrKvmWohrJYLPUbOYmYk6N3bCbf2O.png"
            alt="UPEX Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="hidden font-bold text-lg sm:inline-block">QA Automation Practice</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
        <ModeToggle />
      </nav>
    </div>
  )
}

