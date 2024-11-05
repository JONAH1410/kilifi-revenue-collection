import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold">Revenue Collection</h2>
        </div>
        <ul className="space-y-2 p-4">
          <li>
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
            </Link>
          </li>
          <li>
            <Link href="/parking">
              <Button variant="ghost" className="w-full justify-start">Parking</Button>
            </Link>
          </li>
          <li>
            <Link href="/lands">
              <Button variant="ghost" className="w-full justify-start">Lands</Button>
            </Link>
          </li>
          <li>
            <Link href="/business">
              <Button variant="ghost" className="w-full justify-start">Business</Button>
            </Link>
          </li>
          <li>
            <Link href="/cess">
              <Button variant="ghost" className="w-full justify-start">Cess</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}