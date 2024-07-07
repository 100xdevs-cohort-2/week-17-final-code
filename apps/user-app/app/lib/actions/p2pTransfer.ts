'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export default async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const loggedInUser = session?.user?.id;
    if (!loggedInUser) {
        return {
            message: "Error while sending"
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    })

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    
await prisma.$transaction(async(tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(loggedInUser)} FOR UPDATE`
    const checkBalanceOfLoggedInUSer = await prisma.balance.findUnique({
        where: {
            userId: Number(loggedInUser)
        }
    });
    await new Promise(resolve => setTimeout(resolve, 4000))
    if (!checkBalanceOfLoggedInUSer || checkBalanceOfLoggedInUSer.amount < amount) {
            throw new Error("User don't have enough balance")
    }
    await tx.balance.update({
        where: {
            userId: Number(loggedInUser)
        },
        data: {
            amount: { decrement: amount }
        }
    })
    await tx.balance.update({
        where: {
            userId: toUser.id
        },
        data: {
            amount: { increment: amount }
        }
    })
})
}
