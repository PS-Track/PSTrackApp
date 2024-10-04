'use client'

import Image from 'next/image'

import { useAuthHook } from '@/hooks/auth/useAuthHook'
import { UserMenu } from '@/components/UserMenu'
import LogoutBtn from '@/components/LogoutBtn'

export default function Aside() {
  const { user } = useAuthHook()

  return (
    <aside className="flex h-screen flex-col justify-between bg-[#09090b] py-3">
      <a
        href="/"
        className="mx-auto"
      >
        <Image
          src="/icon-white.png"
          width={60}
          height={60}
          alt=""
          className="aspect-square"
        />
      </a>

      <div className="flex items-center justify-center">
        {!!user ? <UserMenu /> : <LogoutBtn />}
      </div>
    </aside>
  )
}
