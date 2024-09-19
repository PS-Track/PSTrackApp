import Image from 'next/image'
import { HiLogin } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { CiUser } from 'react-icons/ci'

export default function Aside() {
  const user = true

  return (
    <aside className="flex h-screen flex-col justify-between bg-[#09090b] py-3">
      <a href="/">
        <Image
          src="/logo-white.png"
          width={60}
          height={60}
          alt=""
          className="aspect-square"
        />
      </a>

      <div className="flex items-center justify-center">
        {user ? (
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent"
          >
            <CiUser size="15" />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent"
          >
            <HiLogin size="15" />
          </Button>
        )}
      </div>
    </aside>
  )
}
