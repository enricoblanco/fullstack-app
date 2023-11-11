'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import axios from 'axios'
import { signIn } from 'next-auth/react'

import Input from '../components/inputs/Input'
import Button from '../components/Button'
import GoogleIcon from '../components/icons/GoogleIcon'

/**
 * Component for user registration form.
 * @returns {JSX.Element} The registration form JSX element.
 */
const RegisterForm = () => {
  // State and hook initializations
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Form initialization using react-hook-form
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

  /**
   * Handles form submission.
   * @param {FieldValues} data - Form data from submission.
   * @returns {void}
   * @async
   */
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

  // JSX return representing the registration form
  return (
    <>
      <div className="text-4xl">Register</div>
      <div className="w-full flex justify-center">
        <Button onClick={googleLogin} icon={<GoogleIcon />}>
          Login with Google
        </Button>
      </div>
      <hr className="bg-slate-300 w-full h-px" />
      {/* Input components */}
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
      {/* Submit button */}
      <button onClick={handleSubmit(onSubmit)}>
        {isLoading ? 'Loading...' : 'Sign-Up'}
      </button>
      {/* Login link */}
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
