'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const businessSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.enum(['retail', 'service', 'manufacturing'], {
    required_error: 'Please select a business type',
  }),
  annualTurnover: z.number().min(0, 'Annual turnover must be a positive number'),
})

type BusinessFormData = z.infer<typeof businessSchema>

export default function BusinessPage() {
  const [fee, setFee] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: '',
      businessType: 'retail',
      annualTurnover: 0,
    },
  })

  const onSubmit = async (data: BusinessFormData) => {
    try {
      const response = await fetch('/api/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit business data')
      }

      const result = await response.json()
      setFee(result.fee)
      setError(null)
    } catch (err) {
      setError('An error occurred while processing your request')
      setFee(null)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Business Revenue Collection</h1>
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
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter business name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="annualTurnover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Turnover</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" placeholder="Enter annual turnover" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Calculate and Collect Business Permit Fee</Button>
        </form>
      </Form>
      {fee !== null && (
        <Alert className="mt-4">
          <AlertTitle>Business Permit Fee</AlertTitle>
          <AlertDescription>The business permit fee is ${fee.toFixed(2)}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}