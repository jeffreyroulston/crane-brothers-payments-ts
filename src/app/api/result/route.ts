import { sendResultEmail } from '@/lib/sendgrid'
import { fetchWindcaveSession } from '@/lib/windcave'

export const revalidate = 0

/**
 * This file is used to allow Presentation to set the app in Draft Mode, which will load Visual Editing
 * and query draft content and preview the content as it will appear once everything is published
 */

import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  const { url } = request

  if (!url) {
    return NextResponse.error()
  }
  const _url = new URL(url)
  const sessionId = _url.searchParams.get('sessionId')

  if (!sessionId) {
    return NextResponse.error()
  }

  const paymentResult = await fetchWindcaveSession(sessionId) 
  
  if (paymentResult.transactions[0].responseText == 'APPROVED' ) { 
    const name = paymentResult.metaData.slice(-1)


      const body = { 
        name,
        email: paymentResult.customer.email,
        amount: paymentResult.amount,
        reference: paymentResult.merchantReference
      }

      const email = await sendResultEmail(body)

      if (email) { 
        return NextResponse.json({ status: 200, body: 'OK'})
      }

    } else { 
      return NextResponse.error()
    }
  }

