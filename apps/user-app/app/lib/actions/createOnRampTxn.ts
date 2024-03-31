'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import prisma from '@repo/db/client'

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions)
  const token = Math.random().toString()
  const userId = await session.user.id

  if (!userId) {
    return {
      message: 'User not logged in.',
    }
  }
  await prisma.onRampTransaction.create({
    data: {
      status: 'Processing',
      provider: provider,
      amount: amount,
      startTime: new Date(),
      userId: Number(userId),
      token: token,
    },
  })
  return {
    message: 'On ramp transaction added.',
  }
}
