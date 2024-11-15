'use client'
import { useState } from 'react'


import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

const urlBackend = process.env.NEXT_PUBLIC_API_URL

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (!res?.ok) {
      setError('Credenciales inválidas')
    } else {
      alert('Inicio de sesión exitoso!')
    }
  }

  return (
    <div className='flex p-4 items-center justify-center mb-4'>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleLogin()
        }}
        className='bg-white p-8 shadow-lg rounded-lg w-full max-w-sm'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Iniciar Sesión</h2>
        <div className='space-y-4'>
          <Input
            type='email'
            placeholder='Correo electrónico'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full'
          />
          <Input
            type='password'
            placeholder='Contraseña'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full'
          />
        </div>
        <Button type='submit' variant='default' className='w-full mt-6'>
          Iniciar Sesión
        </Button>
        {error && <p className='text-red-500 text-sm mt-4'>{error}</p>}
      </form>
    </div>
  )
}
export default LoginForm
