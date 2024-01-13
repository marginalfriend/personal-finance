import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account?.provider === "google") {
  //       return profile.email_verified && profile.email?.endsWith("@gmail.com")
  //     }
  //     return true // Do different verification for other providers that don't have `email_verified`
  //   },
  // }
} satisfies NextAuthOptions

export const { handlers, signIn, signOut } = NextAuth(authConfig)

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authConfig)
}
