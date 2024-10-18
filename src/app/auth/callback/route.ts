import { NextResponse } from 'next/server'
import { createClient } from '@/db/supabase/client'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (!code) {
    console.log('No code found in query string')
    return NextResponse.redirect(`${origin}/`)
  }

  try {
    const supabase = createClient()

    // Exchange the authorization code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError.message)
      return NextResponse.redirect(
        `${origin}/auth/error?message=${encodeURIComponent(exchangeError.message)}`
      )
    }

    // Redirect the user after successful login and metadata update
    return NextResponse.redirect(`${origin}/`)
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(`${origin}/auth/error?message=Unexpected%20error`)
  }
}
