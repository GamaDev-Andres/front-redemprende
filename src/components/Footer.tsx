import React from 'react'

const Footer = () => {
  return (
    <footer className='flex items-center justify-center border-t p-4'>
      <p className='text-sm text-muted-foreground'>
        &copy; {new Date().getFullYear()} hecho con ❤️ por Andres Gama.
      </p>
    </footer>
  )
}

export default Footer
