import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  
  console.log('Received cess application data:', data)

  // Calculate cess (this is a simple example, adjust as needed)
  let cessRate
  switch (data.produceType) {
    case 'agricultural':
      cessRate = 0.02 // 2% of market value
      break
    case 'forestry':
      cessRate = 0.03 // 3% of market value
      break
    case 'mining':
      cessRate = 0.05 // 5% of market value
      break
    default:
      cessRate = 0.02 // Default to 2%
  }
  const cess = data.marketValue * cessRate

  return NextResponse.json({ success: true, cess })
}