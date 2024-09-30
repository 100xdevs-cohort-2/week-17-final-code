"use server"
import prisma from '@repo/db/client'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"



export default async function updateBalance(number:string,amount:string, balance:number){
  const session =await getServerSession(authOptions)


  if(session.user.id){
    try {
  

      const user = await prisma.user.findFirst({
        where:{number:number} 
    
    
        })
      if(user){
    
    
    
        if(balance>Number(amount)){
    
        await prisma.$transaction([
                   
          prisma.balance.update({
            where:{
               userId:user.id
            },
            data:{
             amount:{
                 increment:Number(amount)
             }
            }
         }),
      prisma.balance.update({
          where:{
            userId:Number(session.user.id)
          },
          data:{
            amount:{
              decrement:Number(amount)
            }
          }
    
         }),
          
        ])
    
        const time =new Date()
        const  isoString= time.toISOString()
        const transactionToken = (Math.random()+10*18).toString()
    
        const transaction = await prisma.onRampTransaction.create({
            data:{
                userId:Number(session.user.id),
                token:transactionToken,
                amount:Number(amount),
                status:"Success",
                method:"Sent",
                provider:"wallet",
                startTime:isoString
            }
        })
        if(transaction){
          console.log("hey got her ")
        }
        return {
          msg:"balance updated",
          status:true
        } 
    
      }else{
        return {
          msg:"Insufficient balance can not proceed the transaction",
          status:false,
        }
      }
    
    
      }else{
        return {
          msg:"User doesn't exits",
          status:false,
        }
      }
     } catch (error) {
    
     return {
      error:error,
     msg:"server didn't responsd",
     status:false
     }
     
     }
  }else{

    return {
      msg:"user not authorised",
      status:false
    }
  }

             
               

}