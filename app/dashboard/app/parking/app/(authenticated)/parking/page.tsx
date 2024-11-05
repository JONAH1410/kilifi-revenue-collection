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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const parkingSchema = z.object({
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  parkingDuration: z.number().min(1, 'Parking duration must be at least 1 hour'),
})

type ParkingFormData = z.infer<typeof parkingSchema>

export default function ParkingPage() {
  const [fee, setFee] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ParkingFormData>({
    resolver: zodResolver(parkingSchema),
    defaultValues: {
      vehicleNumber: '',
      parkingDuration: 1,
    },
  })

  const onSubmit = async (data: ParkingFormData) => {
    try {
      const response = await fetch('/api/parking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit parking data')
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
      <h1 className="text-3xl font-bold mb-6">Parking Revenue Collection</h1>
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
            name="vehicleNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter vehicle number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parkingDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parking Duration (hours)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min="1" placeholder="Enter parking duration" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Calculate and Collect Fee</Button>
        </form>
      </Form>
      {fee !== null && (
        <Alert className="mt-4">
          <AlertTitle>Parking Fee</AlertTitle>
          <AlertDescription>The parking fee is ${fee.toFixed(2)}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}