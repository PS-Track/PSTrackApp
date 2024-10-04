'use client'

import Image from 'next/image'

import { useAuthHook } from '@/hooks/auth/useAuthHook'

import LogoutBtn from '@/components/LogoutBtn'
import { UserMenu } from '@/components/UserMenu'
import Navigation from '@/components/layout/Navigation'

export default function Aside() {
  const { user } = useAuthHook()

  return (
    <aside className="flex h-screen flex-col justify-between bg-[#09090b] py-3">
      <div className="mx-auto">
        <Image
          src="/icon-white.png"
          width={60}
          height={60}
          alt="PSTrack Logo"
          className="aspect-square"
        />
      </div>

      <Navigation />

      <div className="flex items-center justify-center">
        {!!user ? <UserMenu /> : <LogoutBtn />}
      </div>
    </aside>
  )
}
