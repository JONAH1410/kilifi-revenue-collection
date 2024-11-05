import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const landsSchema = z.object({
  plotNumber: z.string().min(1, 'Plot number is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  landSize: z.number().min(0.01, 'Land size must be at least 0.01 acres'),
})

type LandsFormData = z.infer<typeof landsSchema>

export default function LandsPage() {
  const [rates, setRates] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LandsFormData>({
    resolver: zodResolver(landsSchema),
    defaultValues: {
      plotNumber: '',
      ownerName: '',
      landSize: 0.01,
    },
  })

  const onSubmit = async (data: LandsFormData) => {
    try {
      const response = await fetch('/api/lands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit lands data')
      }

      const result = await response.json()
      setRates(result.rates)
      setError(null)
    } catch (err) {
      setError('An error occurred while processing your request')
      setRates(null)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Lands Revenue Collection</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="plotNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plot Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter plot number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter owner name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="landSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land Size (acres)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0.01" step="0.01" placeholder="Enter land size" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Calculate and Collect Land Rates</Button>
        </form>
      </Form>
      {rates !== null && (
        <Alert className="mt-4">
          <AlertTitle>Land Rates</AlertTitle>
          <AlertDescription>The land rates are ${rates.toFixed(2)}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}