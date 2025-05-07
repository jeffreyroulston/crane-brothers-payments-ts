import { createWindcaveSession } from '@/lib/windcave'

export const revalidate = 0


type Link = { 
  href: string
  rel: 'self' | 'hpp',
  method: string
}
/**
 * This file is used to allow Presentation to set the app in Draft Mode, which will load Visual Editing
 * and query draft content and preview the content as it will appear once everything is published
 */

import { NextRequest, NextResponse } from 'next/server'


export async function POST(request: NextRequest) {
  const body = await request.json()


  if (!body) {
    return NextResponse.error()
  }


  const windcave = await createWindcaveSession(body)

  const redirect = windcave.links.find((link:Link) => link.rel == 'hpp')

  if (redirect.href) {
    return NextResponse.json({ status: 200, body: redirect.href})
  } else { 
    return NextResponse.error()
  }
}
