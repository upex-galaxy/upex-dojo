import type React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface ComponentCardProps {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

export function ComponentCard({ name, icon: Icon, href }: ComponentCardProps) {
  return (
    <Link href={href} data-testid="component-card-link">
      <Card
        className="bg-card hover:bg-accent transition-colors flex flex-col items-center justify-center"
        data-testid="component-card"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
          <CardTitle className="text-xl font-bold" data-testid="component-card-title">
            {name}
          </CardTitle>
          <Icon className="h-6 w-6 text-primary ml-4" data-testid="component-card-icon" />
        </CardHeader>
      </Card>
    </Link>
  )
}
