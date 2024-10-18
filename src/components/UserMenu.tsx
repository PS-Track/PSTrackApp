import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useAuthHook } from '@/hooks/auth/useAuthHook'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function UserMenu() {
  const router = useRouter()
  const { user, handleLogOut, isLoading } = useAuthHook()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-[40px] w-[40px] overflow-hidden rounded-full p-0"
        >
          <Image
            src="/01.png"
            width={40}
            height={40}
            alt=""
            className="aspect-square object-cover object-center"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-dark text-neutral-100">
        <DropdownMenuLabel>Hi, {user?.user_metadata.display_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push('/settings')}
          >
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogOut}
          disabled={isLoading}
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
