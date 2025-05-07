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

    if (paymentResult) { 
      return NextResponse.json({ status: 200, body: paymentResult})
    } else { 
      return NextResponse.error()
    }
  }

