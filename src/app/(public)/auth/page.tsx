'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FaGoogle } from 'react-icons/fa'
import RegisterForm from '@/components/register/RegisterForm'
import LoginForm from '@/components/Login/LoginForm'

const AuthPage = () => {
  const { status } = useSession()
  const router = useRouter()
  const handleGoogleLogin = () => signIn('google')
  const handleLogout = () => signOut()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  return (
    <div className='relative min-h-screen flex flex-col justify-center items-center text-center p-8'>
      <h1 className='text-4xl font-bold mb-4'>
        Bienvenido a la Plataforma de Emprendedores de Villavicencio
      </h1>
      <p className='text-lg mb-6 max-w-xl'>
        Únete a nosotros y conecta con otros emprendedores locales para
        promocionar tus productos y servicios. Inicia sesión para crear tu
        perfil y empezar a crecer en la comunidad de Villavicencio.
      </p>

      <Tabs defaultValue='login' className='w-full max-w-md'>
        <TabsList className='mb-4'>
          <TabsTrigger value='login'>Iniciar Sesión</TabsTrigger>
          <TabsTrigger value='register'>Registro</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>

        {/* Register Tab */}
        <TabsContent value='register'>
          <RegisterForm />
        </TabsContent>
      </Tabs>
      <Button
        variant='outline'
        onClick={handleGoogleLogin}
        className='flex items-center justify-center'
      >
        <FaGoogle className='mr-2' /> Iniciar sesión con Google
      </Button>
      {status === 'authenticated' && (
        <Button variant='default' onClick={handleLogout} className='mt-4'>
          Cerrar Sesión
        </Button>
      )}
    </div>
  )
}

export default AuthPage
