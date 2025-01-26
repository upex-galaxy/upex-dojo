import type React from "react"

interface ComponentLayoutProps {
  children: React.ReactNode
}

export function ComponentLayout({ children }: ComponentLayoutProps) {
  return (
    <main className="flex-1 page-background">
      <div className="container max-w-5xl mx-auto px-4 py-16">{children}</div>
    </main>
  )
}

