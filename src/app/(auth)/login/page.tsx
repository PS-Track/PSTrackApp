'use client'
// import Link from 'next/link'
import React from 'react'

// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthHook } from '@/hooks/auth/useAuthHook'

export default function Page() {
  const { handleLoginViaMagicLink } = useAuthHook()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string

    await handleLoginViaMagicLink(email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder=""
            required
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </form>
  )

  // return (
  //   <Card className="mx-auto max-w-md">
  //     <CardHeader>
  //       <CardTitle className="text-xl">Sign Up</CardTitle>
  //       <CardDescription>Enter your information to create an account</CardDescription>
  //     </CardHeader>
  //     <CardContent>
  //       <div className="grid gap-4">
  //         <div className="grid grid-cols-2 gap-4">
  //           <div className="grid gap-2">
  //             <Label htmlFor="first-name">First name</Label>
  //             <Input
  //               id="first-name"
  //               placeholder="Max"
  //               required
  //             />
  //           </div>
  //           <div className="grid gap-2">
  //             <Label htmlFor="last-name">Last name</Label>
  //             <Input
  //               id="last-name"
  //               placeholder="Robinson"
  //               required
  //             />
  //           </div>
  //         </div>
  //         <div className="grid gap-2">
  //           <Label htmlFor="email">Email</Label>
  //           <Input
  //             id="email"
  //             type="email"
  //             placeholder="m@example.com"
  //             required
  //           />
  //         </div>
  //         <div className="grid gap-2">
  //           <Label htmlFor="password">Password</Label>
  //           <Input
  //             id="password"
  //             type="password"
  //           />
  //         </div>
  //         <Button
  //           type="submit"
  //           className="w-full"
  //         >
  //           Create an account
  //         </Button>
  //         <Button
  //           variant="outline"
  //           className="w-full"
  //         >
  //           Sign up with GitHub
  //         </Button>
  //       </div>
  //       <div className="mt-4 text-center text-sm">
  //         Already have an account?{' '}
  //         <Link
  //           href="#"
  //           className="underline"
  //         >
  //           Sign in
  //         </Link>
  //       </div>
  //     </CardContent>
  //   </Card>
  // )
}
