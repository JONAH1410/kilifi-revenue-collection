import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  
  // Here you would typically save this data to a database
  console.log('Received parking data:', data)

  // Calculate fee (this is a simple example, adjust as needed)
  const fee = data.parkingDuration * 2 // $2 per hour

  return NextResponse.json({ success: true, fee })
}