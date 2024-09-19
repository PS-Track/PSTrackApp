'use client'

import { useState, SyntheticEvent } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthHook } from '@/hooks/auth/useAuthHook'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { handleLoginViaMagicLink } = useAuthHook()

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const target = event.target as typeof event.target & {
      email: { value: string }
    }
    const email = target.email.value

    try {
      await handleLoginViaMagicLink(email)
      // You might want to show a success message or redirect here
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-full w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back to PSTrack</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email to sign in to your account
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label
                  className="sr-only"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <Button disabled={isLoading}>
                {/*{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}*/}
                Sign In with Email
              </Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="text-muted-foreground bg-background px-2">Or continue with</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Button
              className="bg-transparent"
              variant="outline"
              type="button"
              disabled={isLoading}
            >
              {/*todo loader*/}
              GitHub
            </Button>
            <Button
              className="bg-transparent"
              variant="outline"
              type="button"
              disabled={isLoading}
            >
              {/*todo loader*/}
              GitHub
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground px-8 text-center text-sm">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
