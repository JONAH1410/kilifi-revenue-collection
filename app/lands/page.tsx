import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LandsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lands Revenue Collection</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="plotNumber">Plot Number</Label>
          <Input id="plotNumber" type="text" placeholder="Enter plot number" />
        </div>
        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" type="text" placeholder="Enter owner name" />
        </div>
        <div>
          <Label htmlFor="landSize">Land Size (acres)</Label>
          <Input id="landSize" type="number" min="0" step="0.01" placeholder="Enter land size" />
        </div>
        <Button type="submit">Calculate and Collect Land Rates</Button>
      </form>
    </div>
  )
}