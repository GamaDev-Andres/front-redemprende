import Footer from '@/components/Footer'

import { ReactNode } from 'react'

export default function PublicLayout ({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
