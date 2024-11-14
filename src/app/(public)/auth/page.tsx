'use client';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';

const AuthPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleLogin = () => signIn('google');
  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center p-8">
      {/* Fondo adicional para efecto visual */}
      
      <h1 className="text-4xl font-bold mb-4">
        Bienvenido a la Plataforma de Emprendedores de Villavicencio
      </h1>
      <p className="text-lg mb-6 max-w-xl">
        Únete a nosotros y conecta con otros emprendedores locales para promocionar tus productos y servicios. 
        Inicia sesión para crear tu perfil y empezar a crecer en la comunidad de Villavicencio.
      </p>
      {status === 'unauthenticated' ? (
        <Button variant="default" onClick={handleLogin}>
          <FaGoogle/> Iniciar sesión con Google
        </Button>
      ) : (
        <Button variant="default" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      )}
    </div>
  );
};

export default AuthPage;
