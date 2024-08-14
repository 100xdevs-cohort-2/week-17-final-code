"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../../app/lib/auth"
import db from "@repo/db/client"


enum statusType {
    Success = "Success",
    Failure =  "Failure",
    Processing = "Processing"
}

export async function createOnrampTranactions(amount : number, provider : string)
{
    const session = await getServerSession(authOptions);
    const userId = session.user?.id;

    try{
        const x = await db.onRampTransaction.create({
            data : {
                token : Math.random().toString(),
                status : statusType.Processing,
                provider,
                amount,
                startTime : new Date(),
                userId : Number(userId)
            }
        });

        console.log("hey");

        return {
            msg : "onRamp created"
        }
    }
    catch(e : any)
    {
        console.log(e);
        return {
            msg : e.toString()
        }
    }

    

}