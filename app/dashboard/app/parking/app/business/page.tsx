import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BusinessPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Business Revenue Collection</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="businessName">Business Name</Label>
          <Input id="businessName" type="text" placeholder="Enter business name" />
        </div>
        <div>
          <Label htmlFor="businessType">Business Type</Label>
          <Select>
            <SelectTrigger id="businessType">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="annualTurnover">Annual Turnover</Label>
          <Input id="annualTurnover" type="number" min="0" placeholder="Enter annual turnover" />
        </div>
        <Button type="submit">Calculate and Collect Business Permit Fee</Button>
      </form>
    </div>
  )
}