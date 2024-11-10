// /app/(private)/layout.tsx
'use client'

import { NavMenu } from '@/components/NavMenu'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

export default function PrivateLayout ({ children }: { children: ReactNode }) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth')
    }
  }, [status, router])

  if (status !== 'authenticated')
    return (
      <>
        <div className='p-6 space-y-6'>
          {/* Header Section */}
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-6 w-40' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>

          {/* Main Content Section */}
          <div className='space-y-6'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-6 w-3/4' />
            <Skeleton className='h-6 w-5/6' />
            <Skeleton className='h-6 w-4/5' />
          </div>

          {/* Card/Grid Section */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <Skeleton className='h-40 w-full' />
            <Skeleton className='h-40 w-full' />
            <Skeleton className='h-40 w-full' />
          </div>

          {/* Footer Section */}
          <div className='flex justify-between space-x-4'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-6 w-24' />
          </div>
        </div>
      </>
    )

  return (
    <div className='flex flex-col min-h-screen'>
      <NavMenu />
      <main className='flex-1'>{children}</main>
      <footer className='flex items-center justify-center border-t p-4'>
        <p className='text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} hecho con ❤️ por Andres Gama.
        </p>
      </footer>
    </div>
  )
}
