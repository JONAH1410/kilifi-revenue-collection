import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewCessApplicationPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">New Cess Application</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="applicantName">Applicant Name</Label>
          <Input id="applicantName" type="text" placeholder="Enter applicant name" />
        </div>
        <div>
          <Label htmlFor="produceType">Produce Type</Label>
          <Select>
            <SelectTrigger id="produceType">
              <SelectValue placeholder="Select produce type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agricultural">Agricultural</SelectItem>
              <SelectItem value="forestry">Forestry</SelectItem>
              <SelectItem value="mining">Mining</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="quantity">Quantity (kg)</Label>
          <Input id="quantity" type="number" min="0" placeholder="Enter quantity" />
        </div>
        <div>
          <Label htmlFor="marketValue">Market Value</Label>
          <Input id="marketValue" type="number" min="0" placeholder="Enter market value" />
        </div>
        <Button type="submit">Submit Cess Application</Button>
      </form>
    </div>
  )
}