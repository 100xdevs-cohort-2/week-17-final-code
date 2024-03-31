"use server"

import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";

export async function createOnRamptxns(amount: number, provider: string) {
   const session = await getServerSession(authOptions);
   const userId = session.user.id;
   const token = Math.random().toString();
   if (!userId){
        return {message: "User not found"};
   }
   await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token: token
        }
   })
   return {
    message: "On Ramp Transaction Created Successfully"
}

}