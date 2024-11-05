import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  
  console.log('Received business data:', data)

  // Calculate business permit fee (this is a simple example, adjust as needed)
  let fee
  switch (data.businessType) {
    case 'retail':
      fee = data.annualTurnover * 0.01 // 1% of turnover
      break
    case 'service':
      fee = data.annualTurnover * 0.015 // 1.5% of turnover
      break
    case 'manufacturing':
      fee = data.annualTurnover * 0.02 // 2% of turnover
      break
    default:
      fee = data.annualTurnover * 0.01 // Default to 1%
  }

  return NextResponse.json({ success: true, fee })
}