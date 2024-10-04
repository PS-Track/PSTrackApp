import { useRouter } from 'next/navigation'
import { HiLogin } from 'react-icons/hi'

import { useAuthHook } from '@/hooks/auth/useAuthHook'

import { Button } from '@/components/ui/button'

export default function LogoutBtn() {
  const router = useRouter()
  const { isLoading } = useAuthHook()

  return (
    <Button
      size="icon"
      variant="outline"
      className="h-[40px] w-[40px] overflow-hidden rounded-full p-0"
      onClick={() => router.push('/auth')}
      disabled={isLoading}
    >
      <HiLogin size="15" />
    </Button>
  )
}
