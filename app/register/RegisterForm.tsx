'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import axios from 'axios'
import { signIn } from 'next-auth/react'

import Input from '../components/inputs/Input'

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Conta criada com sucesso!')

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false
        }).then(callback => {
          if (callback?.ok) {
            router.push('/profile')
            router.refresh()
            toast.success('Login realizado com sucesso!')
          }
          if (callback?.error) {
            toast.error(callback.error)
          }
        })
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="text-4xl">Register</div>
      <div className="w-full">
        <button className="bg-blue-500 hover:bg-blue-600 w-full text-white rounded-md px-4 py-2">
          <div>Sign-Up with Google</div>
        </button>
      </div>
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
      <button onClick={handleSubmit(onSubmit)}>
        {isLoading ? 'Loading...' : 'Sign-Up'}
      </button>
      <p className="text-sm">
        Já tem conta?{' '}
        <Link className="underline" href={'/login'}>
          Login
        </Link>
      </p>
    </>
  )
}

export default RegisterForm
