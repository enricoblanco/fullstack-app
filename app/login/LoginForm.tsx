'use client'

import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import Input from '../components/inputs/Input'
import Button from '../components/Button'
import GoogleIcon from '../components/icons/GoogleIcon'

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false
    }).then(callback => {
      if (callback?.ok) {
        router.push('/profile')
        router.refresh()
        toast.success('Login realizado com sucesso!')
      }
      if (callback?.error) {
        toast.error(callback.error)
        setIsLoading(false)
      }
    })
  }

  const googleLogin = async () => {
    setIsLoading(true)

    signIn('google', {
      callbackUrl: '/profile',
      redirect: false
    }).then(callback => {
      if (callback?.ok) {
        router.push('/profile')
        router.refresh()
        toast.success('Login realizado com sucesso!')
      }
      if (callback?.error) {
        toast.error(callback.error)
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <div className="text-4xl">Login</div>
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="E-mail"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Senha"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button onClick={googleLogin} icon={<GoogleIcon />}>
        Login with Google
      </Button>
      <button onClick={handleSubmit(onSubmit)}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      <p className="text-sm">
        Não tem conta?{' '}
        <Link className="underline" href={'/register'}>
          Sign-Up
        </Link>
      </p>
    </>
  )
}

export default LoginForm
