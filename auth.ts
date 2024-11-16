import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Tiktok from "next-auth/providers/tiktok"
import CredentialsProvider from "next-auth/providers/credentials"
import type { DefaultSession, NextAuthConfig } from "next-auth"
import type { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      provider?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    provider?: string
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    Tiktok({
      clientId: process.env.TIKTOK_CLIENT_ID!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        try {
          // Instead of using Firebase Admin directly, make a call to your API
          const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verify-credentials`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message || 'Authentication failed')
          }

          return {
            id: data.id,
            email: data.email,
            name: data.name,
          }
        } catch (error) {
          console.error("Error in authorize:", error)
          throw new Error("Authentication failed")
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id as string;
        token.provider = account?.provider as string;
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.provider = token.provider as string;
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

//secret: "FP6c8Qp66vKjQkl9Xk0c6LQZYLumPEwAxG02CGBnH7w=",