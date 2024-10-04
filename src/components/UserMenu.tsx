import Image from 'next/image'

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
  const { user, handleLogOut, isLoading } = useAuthHook()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className=""
        asChild
      >
        <Button
          size="sm"
          variant="outline"
          className="h-[35px] w-[35px] overflow-hidden rounded-full p-0"
        >
          <Image
            src="/01.png"
            width={35}
            height={35}
            alt=""
            className="aspect-square object-cover object-center"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-dark w-56 text-neutral-100">
        <DropdownMenuLabel>Hi, {user?.user_metadata.first_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
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
