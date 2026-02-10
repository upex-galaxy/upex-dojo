import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardNav } from "./components/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background" data-testid="dashboard-layout">
      <DashboardNav user={session.user} />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
