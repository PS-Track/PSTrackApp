import { NextResponse } from 'next/server'
import { createClient } from '@/db/supabase/client'

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

    // Exchange the authorization code for a session
    const { error: exchangeError, data } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError.message)
      return NextResponse.redirect(
        `${origin}/auth/error?message=${encodeURIComponent(exchangeError.message)}`
      )
    }

    // Ensure the session exists
    if (!data.session || !data.session.user) {
      console.error('No session or user found after code exchange')
      return NextResponse.redirect(`${origin}/auth/error?message=No%20session%20found`)
    }

    // Fetch user details
    const { data: userData, error: getUserError } = await supabase.auth.getUser()

    if (getUserError) {
      console.error('Error fetching user data:', getUserError.message)
      return NextResponse.redirect(
        `${origin}/auth/error?message=${encodeURIComponent(getUserError.message)}`
      )
    }

    // Check if "is_first_login" is false or missing from user_metadata
    const isFirstLogin = userData?.user?.user_metadata?.is_first_login

    if (isFirstLogin !== true) {
      // Update user metadata with "is_first_login: true"
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          is_first_login: true,
        },
      })

      if (updateError) {
        console.error('Error updating user metadata:', updateError.message)
        return NextResponse.redirect(
          `${origin}/auth/error?message=${encodeURIComponent(updateError.message)}`
        )
      }

      console.log('User metadata updated with is_first_login: true')
    }

    // Redirect the user after successful login and metadata update
    return NextResponse.redirect(`${origin}/dashboard`)
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(`${origin}/auth/error?message=Unexpected%20error`)
  }
}
