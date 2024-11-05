import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function CessPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cess Revenue Collection</h1>
      <div className="space-y-4">
        <p>Manage cess collection for agricultural produce and natural resources.</p>
        <Link href="/cess/new_application">
          <Button>New Cess Application</Button>
        </Link>
      </div>
    </div>
  )
}