import { useRouter } from 'next/navigation'
import { CiViewTable } from 'react-icons/ci'

import { Button } from '@/components/ui/button'

// todo: add custom bg on router.pathname

export default function Navigation() {
  const router = useRouter()

  return (
    <div className="flex w-full flex-1 justify-center pt-5">
      <Button
        size="icon"
        variant="ghost"
        className="mx-auto h-[35px] w-[35px] overflow-hidden rounded-full p-0 hover:bg-transparent"
        onClick={() => router.push('/')}
      >
        <CiViewTable />
      </Button>
    </div>
  )
}
