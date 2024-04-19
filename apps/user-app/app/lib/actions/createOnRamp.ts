"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const createOnRamp  = async (provider:string , amount:number)=>{
    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id) return {message:"Unauthenticated request"}

    const token = (Math.random()*1000).toString();

    const onRamp = await prisma.onRampTransaction.create({
        data:{
            token,
            provider,
            amount:amount*100,
            userId:Number(session.user.id),
            status:"Processing",
            startTime: new Date()
        }
    })
    
    return{
        message:"Done"
    }
}