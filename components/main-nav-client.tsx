"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  Menu,
  BookOpen,
  FileText,
  LayoutDashboard,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface MainNavClientProps {
  user: {
    name: string
    email: string
  } | null
}

export function MainNavClient({ user }: MainNavClientProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const publicLinks = [
    { href: "/guide", label: "Guide", icon: BookOpen },
    { href: "/api/docs", label: "API Docs", icon: FileText },
  ]

  const authLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ]

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="flex h-16 items-center px-4" data-testid="main-navigation">
      {/* Logo */}
      <Link
        href="/"
        className="mr-6 flex items-center gap-1"
        data-testid="app-logo-link"
      >
        <span
          className="font-[family-name:var(--font-playfair)] text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500"
          data-testid="app-logo-upex"
        >
          UPEX
        </span>
        <span
          className="text-2xl font-light italic text-foreground"
          data-testid="app-logo-dojo"
        >
          Dojo
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex items-center space-x-6 text-sm font-medium ml-auto"
        data-testid="nav-desktop"
      >
        {/* Public Links */}
        {publicLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-1.5 transition-colors hover:text-foreground",
              pathname === link.href ? "text-foreground" : "text-muted-foreground"
            )}
            data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}-link`}
          >
            <link.icon className="h-4 w-4" />
            <span>{link.label}</span>
          </Link>
        ))}

        {/* Auth-dependent links */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full"
                data-testid="user-menu-button"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" data-testid="user-menu-dropdown">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium" data-testid="user-name">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid="user-email">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              {authLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className="cursor-pointer"
                    data-testid={`nav-${link.label.toLowerCase()}-link`}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
                data-testid="nav-logout-button"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Link
              href="/login"
              className={cn(
                "flex items-center gap-1.5 transition-colors hover:text-foreground",
                pathname === "/login" ? "text-foreground" : "text-muted-foreground"
              )}
              data-testid="nav-login-link"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
            <Button asChild size="sm" data-testid="nav-register-link">
              <Link href="/register" className="flex items-center gap-1.5">
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </Button>
          </>
        )}
      </nav>

      {/* Mobile Navigation */}
      <div className="flex items-center ml-auto md:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" data-testid="mobile-menu-button">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" data-testid="mobile-menu-sheet">
            <SheetHeader>
              <SheetTitle className="text-left">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {/* Public Links */}
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-md transition-colors",
                    pathname === link.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(" ", "-")}-link`}
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              ))}

              <div className="border-t my-2" />

              {/* Auth-dependent links */}
              {user ? (
                <>
                  <div className="px-2 py-2">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  {authLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 rounded-md transition-colors",
                        pathname === link.href
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                      data-testid={`mobile-nav-${link.label.toLowerCase()}-link`}
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      closeMobileMenu()
                      signOut({ callbackUrl: "/" })
                    }}
                    className="flex items-center gap-3 px-2 py-2 rounded-md transition-colors text-destructive hover:bg-destructive/10"
                    data-testid="mobile-nav-logout-button"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className={cn(
                      "flex items-center gap-3 px-2 py-2 rounded-md transition-colors",
                      pathname === "/login"
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                    data-testid="mobile-nav-login-link"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-2 py-2 rounded-md bg-primary text-primary-foreground"
                    data-testid="mobile-nav-register-link"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
