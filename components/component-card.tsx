import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ComponentCardProps {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

export function ComponentCard({ name, icon: Icon, href }: ComponentCardProps) {
  return (
    <Link href={href}>
      <Card className="bg-card hover:bg-accent transition-colors flex flex-col items-center justify-center">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Icon className="h-6 w-6 text-primary ml-4" />
        </CardHeader>
      </Card>
    </Link>
  )
}

