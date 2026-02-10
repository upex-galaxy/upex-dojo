import { auth } from "@/lib/auth"
import { MainNavClient } from "@/components/main-nav-client"

async function MainNavAsync() {
  const session = await auth()

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
      }
    : null

  return <MainNavClient user={user} />
}

export function MainNav() {
  // @ts-expect-error Async Server Component
  return <MainNavAsync />
}
