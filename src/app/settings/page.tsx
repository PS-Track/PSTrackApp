'use client'

import * as z from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { profileSchema } from '@/validation/profileForm.schema'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import AvatarField from '@/components/profile/AvatarField'
import DisplayNameField from '@/components/profile/DisplayNameField'
import UsernameField from '@/components/profile/UsernameField'
import EmailField from '@/components/profile/EmailField'
import PhoneField from '@/components/profile/PhoneField'
import BioField from '@/components/profile/BioField'
import SocialFields from '@/components/profile/SocialFields'

export default function Page() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      username: '',
      avatar: undefined,
      email: '',
      phoneCountryCode: '',
      phone: '',
      bio: '',
      twitter: '',
      linkedin: '',
      website: '',
    },
  })

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log(values)
  }

  return (
    <div className="flex justify-center py-10">
      <Card className="h-fit w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Profile</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <AvatarField form={form} />
              <DisplayNameField form={form} />
              <UsernameField form={form} />
              <EmailField form={form} />
              <PhoneField form={form} />
              <BioField form={form} />
              <SocialFields form={form} />
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
