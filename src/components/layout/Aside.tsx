'use client'

import Image from 'next/image'
import { HiLogin } from 'react-icons/hi'
import { CiUser } from 'react-icons/ci'

import { Button } from '@/components/ui/button'
import { useAuthHook } from '@/hooks/auth/useAuthHook'
import { useRouter } from 'next/navigation'
import { UserMenu } from '@/components/UserMenu'

export default function Aside() {
  const router = useRouter()
  const { user, isLoading } = useAuthHook()

  return (
    <aside className="flex h-screen flex-col justify-between bg-[#09090b] py-3">
      <a href="/pstrackapp/public">
        <Image
          src="/icon-white.png"
          width={60}
          height={60}
          alt=""
          className="aspect-square"
        />
      </a>

      <div className="flex items-center justify-center">
        {!!user ? (
          <UserMenu />
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent"
            onClick={() => router.push('/auth')}
            disabled={isLoading}
          >
            <HiLogin size="15" />
          </Button>
        )}
      </div>
    </aside>
  )
}
