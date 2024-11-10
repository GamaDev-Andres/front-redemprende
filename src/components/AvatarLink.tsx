'use client'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSession } from 'next-auth/react'

const AvatarLink = () => {
    const {data} =useSession()
  return (
    <Link  className='cursor-pointer' href='/profile' legacyBehavior passHref>
      <Avatar title='Perfil' className='cursor-pointer'  about='user' >
        <AvatarImage src={data?.user?.image || ''} alt={data?.user?.name || ''} />
        <AvatarFallback>{data?.user?.name?.charAt(0) || ''}</AvatarFallback>
      </Avatar>
    </Link>
  )
}

export default AvatarLink
