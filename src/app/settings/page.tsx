'use client'

import * as z from 'zod'
import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { profileSchema } from '@/validation/profileForm.schema'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export default function Page() {
  const [avatarPic, setAvatarPic] = useState<string | null>(null)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      username: '',
      avatar: undefined,
      email: '',
      bio: '',
      twitter: '',
      linkedin: '',
      website: '',
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const filePreview = URL.createObjectURL(file)
      setAvatarPic(filePreview)
      form.setValue('avatar', file) // Correcting the 'name' parameter to 'avatar'
    }
  }

  const handleCustomButtonClick = () => {
    avatarInputRef.current?.click()
  }

  const deleteProfilePicture = () => {
    setAvatarPic(null)
    form.setValue('avatar', undefined) // Resetting the file field
  }

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log(values)
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Card className="h-fit w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Profile</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
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
                      onClick={handleCustomButtonClick} // Added the button click handler
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
                      onClick={deleteProfilePicture}
                    >
                      Delete picture
                    </Button>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public username, it will be shown in your group table, You can
                      only change this once every 30 days.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Twitter URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="LinkedIn URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Website URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button type="submit">Update profile</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
