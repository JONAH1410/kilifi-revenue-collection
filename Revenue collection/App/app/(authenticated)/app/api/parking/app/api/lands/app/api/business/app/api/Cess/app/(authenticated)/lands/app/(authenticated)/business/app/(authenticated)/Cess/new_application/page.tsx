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

const cessSchema = z.object({
  applicantName: z.string().min(1, 'Applicant name is required'),
  produceType: z.enum(['agricultural', 'forestry', 'mining'], {
    required_error: 'Please select a produce type',
  }),
  quantity: z.number().min(0, 'Quantity must be a positive number'),
  marketValue: z.number().min(0, 'Market value must be a positive number'),
})

type CessFormData = z.infer<typeof cessSchema>

export default function NewCessApplicationPage() {
  const [cess, setCess] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<CessFormData>({
    resolver: zodResolver(cessSchema),
    defaultValues: {
      applicantName: '',
      produceType: 'agricultural',
      quantity: 0,
      marketValue: 0,
    },
  })

  const onSubmit = async (data: CessFormData) => {
    try {
      const response = await fetch('/api/cess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit cess application')
      }

      const result = await response.json()
      setCess(result.cess)
      setError(null)
    } catch (err) {
      setError('An error occurred while processing your request')
      setCess(null)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">New Cess Application</h1>
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
            name="applicantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applicant Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter applicant name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="produceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produce Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select produce type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="agricultural">Agricultural</SelectItem>
                    <SelectItem value="forestry">Forestry</SelectItem>
                    <SelectItem value="mining">Mining</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity (kg)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" placeholder="Enter quantity" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marketValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Market Value</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="0" placeholder="Enter market value" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit Cess Application</Button>
        </form>
      </Form>
      {cess !== null && (
        <Alert className="mt-4">
          <AlertTitle>Cess Amount</AlertTitle>
          <AlertDescription>The cess amount is ${cess.toFixed(2)}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}