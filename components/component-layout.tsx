import type React from "react"

interface ComponentLayoutProps {
  children: React.ReactNode
}

export function ComponentLayout({ children }: ComponentLayoutProps) {
  return (
    <main className="flex-1" data-testid="component-page">
      <div className="container max-w-5xl mx-auto px-4 py-16" data-testid="component-container">
        {children}
      </div>
    </main>
  )
}
