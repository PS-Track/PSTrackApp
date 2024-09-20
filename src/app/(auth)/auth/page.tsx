'use client'

import Image from 'next/image'
import { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import RegisterTab from '@/app/(auth)/_components/RegisterTab'

// todo: handle login with email not registered

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

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
                placeholder="example@email.com"
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

          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full"
              variant="default"
            >
              Login
            </Button>

            <div className="flex w-full items-center justify-center space-x-2">
              <hr className="w-full border-stone-300" />
              <span className="text-nowrap text-xs uppercase text-stone-300">Or continue with</span>
              <hr className="w-full border-stone-300" />
            </div>
            <Button
              className="flex w-full items-center gap-3 bg-transparent text-stone-300"
              variant="outline"
            >
              <FaGoogle />
              Continue with Google
            </Button>

            <Button
              className="flex w-full items-center gap-3 bg-transparent text-stone-300"
              variant="outline"
            >
              <FaGithub />
              <span>Continue with GitHub</span>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="signup">
        <RegisterTab />
      </TabsContent>
    </Tabs>
  )
}
