import React, { useState, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { ProfileFormSchema } from '@/validation/profileForm.schema'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function AvatarField({ form }: { form: UseFormReturn<ProfileFormSchema> }) {
  const [avatarPic, setAvatarPic] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const filePreview = URL.createObjectURL(file)
      setAvatarPic(filePreview)
      form.setValue('avatar', file)
    }
  }

  const handleAvatarChange = () => {
    avatarInputRef.current?.click()
  }

  const deleteAvatar = () => {
    setAvatarPic(null)
    form.setValue('avatar', undefined)
  }

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-12 w-12">
        <AvatarImage
          src={avatarPic || ''}
          alt="Profile picture"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <label
          htmlFor="picture"
          className="cursor-pointer"
        >
          <Button
            type="button"
            variant="outline"
            className="mr-2"
            onClick={handleAvatarChange}
          >
            Upload new picture
          </Button>
        </label>
        <input
          id="picture"
          type="file"
          accept="image/*"
          className="hidden"
          ref={avatarInputRef}
          onChange={handleFileChange}
        />
        {avatarPic && (
          <Button
            type="button"
            variant="ghost"
            onClick={deleteAvatar}
          >
            Delete picture
          </Button>
        )}
      </div>
    </div>
  )
}
