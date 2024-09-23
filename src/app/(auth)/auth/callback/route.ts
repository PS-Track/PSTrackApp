import { NextResponse } from 'next/server'

import { createClient } from '@/db/supabase/client'

/**
 * Handles the GET request for the auth callback route.
 * @param request - The request object.
 * @returns A NextResponse object.
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  console.log('Received code:', code)

  if (!code) {
    console.log('No code found in query string')
    return NextResponse.redirect(`${origin}/`)
  }

  try {
    const supabase = createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Error exchanging code for session:', error.message)
      return NextResponse.redirect(
        `${origin}/auth/error?message=${encodeURIComponent(error.message)}`
      )
    }

    console.log('Successfully exchanged code for session')
    return NextResponse.redirect(`${origin}/`)
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(`${origin}/auth/error?message=Unexpected%20error`)
  }
}
