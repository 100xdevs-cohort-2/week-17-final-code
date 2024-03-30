"use server"
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export async function SendMoneyTo(number:string, amount:number) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id

    if(!userId) return { message : "UnAuthorized User!"};

    const toUser = await prisma.user.findFirst({
        where:{
            number
        }
    })

    if(!toUser) return {message : 'Invalid Number. Please provide a valid one..'};

    try{
        await prisma.$transaction(async (tx) =>{
            const sender = await tx.balance.findUnique({
                where : {
                    userId : Number(userId)
                }
            })
    
            if(!sender || sender.amount / 100 < amount) throw new Error('InSufficient Balance')

            await tx.balance.update({
                where:{userId : Number(sender.id)},
                data:{amount : {decrement:amount * 100}}
            })

            await tx.balance.update({
                where:{userId : toUser.id},
                data:{amount : {increment:amount * 100}}
            })
        });
    }catch(e){
        console.log("Error => ", e);
        return { message : e}
    }

    return {message : 'Transaction Successful!'}

}