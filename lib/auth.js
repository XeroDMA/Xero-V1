import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyUser } from "./auth-helpers.js"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await verifyUser(credentials.username, credentials.password)

        if (user) {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.user.username = token.username
      }
      return session
    },
  },
  pages: {
    signIn: "/staff",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
