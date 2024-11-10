"use client"
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const LogoutButton = () => {
  return (
    <Button variant="default" onClick={() => signOut()}>
      Cerrar sesión
    </Button>
  )
}

export default LogoutButton