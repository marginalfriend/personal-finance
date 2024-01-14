'use server'
import { auth } from '@/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient
const userId = 'userid'

export async function user() {
  const session = await auth()

  if (!session?.user) {
    console.log('No user found')
    return 'No user found'
  }

  console.log(session.user)
  return JSON.stringify(session.user)
}

// export async function accountCheck({ userId }: { userId: any }) {
//   const result = await prisma.user.findUnique({
//     where: {
//       id: userId ? userId.id : undefined
//     }
//   })
//   if (!result) throw Error('No such user')
//   return result
// }

export async function fetchUserCashflow() {
  const cashflow = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      cashflows: true
    }
  })
}