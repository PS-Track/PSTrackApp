import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuLoader } from 'react-icons/lu'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { FaGithub, FaGoogle } from 'react-icons/fa6'

import { useAuthHook } from '@/hooks/auth/useAuthHook'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

type FormData = {
  email: string
  password: string
}

export default function LogInTab() {
  const toaster = useToast()
  const { handleLoginViaEmailAndPassword, isLoading } = useAuthHook()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onLogin = async (data: FormData) => {
    toaster.toast({
      description: (
        <div className="flex items-center gap-3">
          <LuLoader className="animate-spin" />
          <p>Logging in</p>
        </div>
      ),
    })

    try {
      await handleLoginViaEmailAndPassword(data.email, data.password)
    } catch (error) {
      toaster.toast({
        variant: 'destructive',
        title: 'Login Error',
        description: (error as Error)?.message || 'An unknown error occurred',
      })
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Card className="border-[#27272a] bg-transparent">
      <form onSubmit={handleSubmit(onLogin)}>
        <CardContent className="space-y-2 pt-6">
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="text-stone-300"
            >
              Email
            </Label>
            <Input
              id="email"
              className="border-[#27272a] text-stone-300"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="password"
              className="text-stone-300"
            >
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="relative border-[#27272a] pr-10 text-stone-300"
                {...register('password', { required: 'Password is required' })}
              />
              <Button
                onClick={togglePasswordVisibility}
                size="sm"
                variant="ghost"
                className="absolute right-0 top-1/2 flex -translate-y-1/2 transform items-center border-none bg-transparent px-3 text-stone-300 hover:bg-transparent"
              >
                {showPassword ? (
                  <HiEyeOff className="text-sm text-white" />
                ) : (
                  <HiEye className="text-sm text-white" />
                )}
              </Button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="flex justify-end space-y-1">
            <Label
              htmlFor="password"
              className="text-stone-300"
            >
              <a
                href="#"
                className="text-primary-300 text-right text-xs"
              >
                Forgot password?
              </a>
            </Label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full"
            variant="default"
            disabled={isLoading}
          >
            Login
          </Button>

          <div className="flex w-full items-center justify-center space-x-2">
            <hr className="w-full border-stone-300" />
            <span className="text-nowrap text-xs uppercase text-stone-300">Or continue with</span>
            <hr className="w-full border-stone-300" />
          </div>
          <Button
            className="flex w-full items-center gap-3 bg-transparent text-stone-300"
            variant="outline"
          >
            <FaGoogle />
            Continue with Google
          </Button>

          <Button
            className="flex w-full items-center gap-3 bg-transparent text-stone-300"
            variant="outline"
          >
            <FaGithub />
            <span>Continue with GitHub</span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
