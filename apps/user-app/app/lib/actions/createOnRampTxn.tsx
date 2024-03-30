"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTxn (amount:number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    const userId = session.user.id;

    if(!userId){
        return {
            messafe : "User not Logged In"
        }
    }

    await prisma.onRampTransaction.create({
        data:{
            userId : Number(userId),
            token,
            amount:amount * 100,
            status:"Processing",
            startTime: new Date(),
            provider,
        }
    })

    return { message : 'Done'}
}