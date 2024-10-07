import { useForm } from 'react-hook-form'

import { useAuthHook } from '@/hooks/auth/useAuthHook'

import { useToast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

type FormData = {
  email: string
  password: string
  repeatPassword: string
}

export default function SignUpTab() {
  const toaster = useToast()
  const { handleRegister, isLoading } = useAuthHook()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onRegister = async (data: FormData) => {
    try {
      await handleRegister(data.email, data.password)
    } catch (error) {
      toaster.toast({
        variant: 'destructive',
        title: 'Registration Error',
        description: (error as Error)?.message || 'An unknown error occurred',
      })
    }
  }

  // Watching password to validate repeat password field
  const password = watch('password')

  return (
    <Card className="border-[#27272a] bg-transparent">
      <form onSubmit={handleSubmit(onRegister)}>
        <CardContent className="space-y-2 pt-6">
          {/* Email Field */}
          <div className="space-y-1">
            <Label
              htmlFor="email"
              className="text-stone-300"
            >
              Email
            </Label>
            <Input
              id="email"
              className="border-[#27272a] text-stone-300"
              defaultValue="husamahmud@gmail.com" /*TODO remove this line*/
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <Label
              htmlFor="password"
              className="text-stone-300"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="border-[#27272a] text-stone-300"
              defaultValue="123123123" /*TODO remove this line*/
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          {/* Repeat Password Field */}
          <div className="space-y-1">
            <Label
              htmlFor="repeatPassword"
              className="text-stone-300"
            >
              Repeat Password
            </Label>
            <Input
              id="repeatPassword"
              type="password"
              className="border-[#27272a] text-stone-300"
              defaultValue="123123123" /*TODO remove this line*/
              {...register('repeatPassword', {
                required: 'Please repeat your password',
                validate: value => value === password || 'Passwords do not match',
              })}
            />
            {errors.repeatPassword && (
              <span className="text-sm text-red-500">{errors.repeatPassword.message}</span>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            variant="default"
            disabled={isLoading}
          >
            Signup
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
