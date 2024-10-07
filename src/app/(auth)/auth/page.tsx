'use client'

import Image from 'next/image'

import LogInTab from '@/components/auth/LogInTab'
import SignUpTab from '@/components/auth/SignUpTab'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AuthPage() {
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
        <LogInTab />
      </TabsContent>

      <TabsContent value="signup">
        <SignUpTab />
      </TabsContent>
    </Tabs>
  )
}
