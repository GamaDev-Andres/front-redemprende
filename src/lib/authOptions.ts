import { signInApi } from '@/services/signIn'
import { NextAuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your-email@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        })

        const data = await res.json()

        if (res.ok && data) {
          return data.user // Retorna datos del usuario
        }
        return null // Devuelve null si falla
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn ({ user }) {
      // Llamar a tu API para almacenar los datos del usuario en MySQL
      try {

        const res = await signInApi({
          email: user.email as string,
          name: user.name as string,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          imageUrl: (user.image ?? (user as any)?.imageUrl ?? "") as string
        })
        
        if (res) {
          return true 
        } else {
          console.error('Error al guardar el usuario:', res)
          return false 
        }
      } catch (error) {
        console.error('Error al guardar el usuario:', error)
        return false
      }
    },
    async jwt ({ token, account, profile, user }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
          idToken: account.id_token,
          userId: profile?.sub // Guarda el ID único del usuario en el token
        })
      }
      if (user) {
        // Simula la respuesta de tu API
        const res = await signInApi({
          email: user.email as string,
          name: user.name as string,
          imageUrl: user.image as string
        })

        if (res) {
          // Añade los datos de la API al token
          token.userData = {
            id: res.id, // El ID único del usuario de tu app
            email: res.email,
            name: res.name,
            image: res.imageUrl
          }
        }
      }
      return token
    },
    async session ({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
          idToken: token.idToken,
          userId: token.userId // Incluye el ID en la sesión
        })
      }
      if (token.userData) {
        // Pasa los datos del token a la sesión
        session.user = token.userData as Session['user'] // Incluye el ID del usuario junto con otros datos
      }
      return session
    }
  }
}
