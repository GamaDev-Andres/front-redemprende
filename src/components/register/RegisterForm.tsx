'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const urlBackend = process.env.NEXT_PUBLIC_API_URL
interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterFormData>()

  const handleRegister = async (data: RegisterFormData) => {
    const { name, email, password, confirmPassword } = data

    // Manual validation
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.')
      return
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      toast.error(
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.'
      )
      return
    }

    try {
      const res = await fetch(`${urlBackend}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      if (res.ok) {
        toast.success('Registro exitoso!')
        reset()
      } else {
        const responseData = await res.json()
        toast.error(responseData.message || 'Error al registrar.')
      }
    } catch {
      toast.error('Error al registrar.')
    }
  }

  return (
    <div className='flex items-center justify-center mb-4'>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='p-8 shadow-lg rounded-lg w-full max-w-sm'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Crear Cuenta</h2>
        <div className='space-y-4'>
          <div>
            <Input
              type='text'
              placeholder='Nombre completo'
              {...register('name', { required: 'El nombre es obligatorio' })}
              className='w-full'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              type='email'
              placeholder='Correo electrónico'
              {...register('email', {
                required: 'El correo electrónico es obligatorio',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Correo electrónico no válido'
                }
              })}
              className='w-full'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type='password'
              placeholder='Contraseña'
              {...register('password', {
                required: 'La contraseña es obligatoria'
              })}
              className='w-full'
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type='password'
              placeholder='Confirmar contraseña'
              {...register('confirmPassword', {
                required: 'Debes confirmar la contraseña'
              })}
              className='w-full'
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <Button type='submit' variant='default' className='w-full mt-6'>
          Registrarse
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
