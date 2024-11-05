import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const modules = [
    { title: 'Parking', href: '/parking' },
    { title: 'Lands', href: '/lands' },
    { title: 'Business', href: '/business' },
    { title: 'Cess', href: '/cess' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Revenue Collection Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module) => (
          <Link href={module.href} key={module.title}>
            <Card>
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage {module.title.toLowerCase()} revenue</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}