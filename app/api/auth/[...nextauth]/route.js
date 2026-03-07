import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email) {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        }).catch(() => null)

        if (existingUser) {
          // Existing user: only update lastSignIn, preserve their role
          await prisma.user.update({
            where: { email: user.email },
            data: { lastSignIn: new Date() },
          }).catch(() => {})
        } else {
          // New user: set initial role (adapter creates the user,
          // then we update role immediately after)
          // Use upsert to handle race with adapter
          await prisma.user.update({
            where: { email: user.email },
            data: {
              lastSignIn: new Date(),
              role: getInitialRole(user.email),
            },
          }).catch(() => {
            // User doesn't exist yet, will be created by adapter
          })
        }
      }
      return true
    },
    async session({ session, user }) {
      // Add role and user info to session
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      })
      
      if (dbUser) {
        session.user.id = dbUser.id
        session.user.role = dbUser.role
      }
      
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}

const handler = NextAuth(authOptions)

function getInitialRole(email) {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
  if (adminEmails.includes(email)) {
    return 'ADMIN'
  }
  return 'FAMILY'
}

export { handler as GET, handler as POST }
