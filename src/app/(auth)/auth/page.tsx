'use client'
import Image from 'next/image'
import { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // const [isLoading, setIsLoading] = useState(false)
  // const { handleLoginViaMagicLink } = useAuthHook()
  //
  // async function onSubmit(event: SyntheticEvent) {
  //   event.preventDefault()
  //   setIsLoading(true)
  //
  //   const target = event.target as typeof event.target & {
  //     email: { value: string }
  //   }
  //   const email = target.email.value
  //
  //   try {
  //     await handleLoginViaMagicLink(email)
  //     // You might want to show a success message or redirect here
  //   } catch (error) {
  //     // Handle error (e.g., show error message)
  //     console.error('Login failed:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <Tabs
      defaultValue="login"
      className="w-[400px]"
    >
      <div className="flex w-full justify-center">
        <Image
          src="/logo-white.png"
          alt="PSTrack"
          width={200}
          height={200}
          className="pb-8"
        />
      </div>

      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Card className="border-[#27272a] bg-transparent">
          <CardContent className="space-y-2 pt-6">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-stone-300"
              >
                Email
              </Label>
              <Input
                id="email"
                placeholder="m@example.com"
                className="border-[#27272a] text-stone-300"
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-stone-300"
              >
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="relative border-[#27272a] pr-10 text-stone-300" // Add some padding-right to make space for the toggle button
                />
                <Button
                  onClick={togglePasswordVisibility}
                  size="sm"
                  variant="ghost"
                  className="absolute right-0 top-1/2 flex -translate-y-1/2 transform items-center border-none bg-transparent px-3 text-stone-300 hover:bg-transparent"
                >
                  {showPassword ? (
                    <HiEyeOff className="text-sm text-white" />
                  ) : (
                    <HiEye className="text-sm text-white" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-end space-y-1">
              <Label
                htmlFor="password"
                className="text-stone-300"
              >
                <a
                  href="#"
                  className="text-primary-300 text-right text-xs"
                >
                  Forgot password?
                </a>
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="default"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="signup">
        <Card className="border-[#27272a] bg-transparent">
          <CardContent className="space-y-2 pt-6">
            <div className="space-y-1">
              <Label
                htmlFor="name"
                className="text-stone-300"
              >
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="border-[#27272a] text-stone-300"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="username"
                className="text-stone-300"
              >
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="border-[#27272a] text-stone-300"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default">Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
