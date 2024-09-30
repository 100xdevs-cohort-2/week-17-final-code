"use server"
import prisma from "../../../../../packages/db/src";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function transactions (amount:string,provider:string){
    const TransactionAmount =Number(amount)
    const time =new Date()
     const  isoString= time.toISOString()
    const session = await getServerSession(authOptions)
    if(!session.user.id || !session.user ){
        return  "Unauthorised request"
    }
const transactionToken = (Math.random()+10*18).toString()
const transaction = await prisma.onRampTransaction.create({
    data:{
        userId:Number(session.user.id),
        token:transactionToken,
        amount:TransactionAmount,
        method:"Recieved",
        status:"Processing",
        provider:provider,
        startTime:isoString
    }
})
if(transaction){
    return true
}

}