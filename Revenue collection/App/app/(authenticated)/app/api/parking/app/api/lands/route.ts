import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  
  console.log('Received lands data:', data)

  // Calculate land rates (this is a simple example, adjust as needed)
  const rates = data.landSize * 100 // $100 per acre

  return NextResponse.json({ success: true, rates })
}