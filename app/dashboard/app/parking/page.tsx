import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ParkingPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Parking Revenue Collection</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="vehicleNumber">Vehicle Number</Label>
          <Input id="vehicleNumber" type="text" placeholder="Enter vehicle number" />
        </div>
        <div>
          <Label htmlFor="parkingDuration">Parking Duration (hours)</Label>
          <Input id="parkingDuration" type="number" min="1" placeholder="Enter parking duration" />
        </div>
        <Button type="submit">Calculate and Collect Fee</Button>
      </form>
    </div>
  )
}