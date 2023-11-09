'use client'

import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Input from '../components/inputs/Input'

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({})

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true)
    console.log(data)
  }

  return (
    <>
      <div className="text-4xl">Register</div>
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
    </>
  )
}

export default RegisterForm
