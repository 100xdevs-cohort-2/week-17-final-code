'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(provider: string, amount: number){ 
    const session = await getServerSession(authOptions);
    //Ideally the token should come from the banking provider
    const token = (Math.random() * 1000).toString();
    if(!session?.user || !session?.user?.id){
        return {
            message: "Unauthorized request"
        }
    }
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            token: token,
            amount: amount,
            userId: Number(session.user?.id),
            startTime: new Date(),
        }
    })
    return {
        message: 'Done with the transactions...'
    }
}