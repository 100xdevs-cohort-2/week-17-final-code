
import { getServerSession } from "next-auth"
import { OnRampTransactions } from "../../../components/OnRampTransactions"
import P2ptransfer from "../../../components/p2ptransfer"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client"
import { BalanceCard } from "../../../components/BalanceCard"

async function getBalance() {

   const session =await getServerSession(authOptions)
   const balance = await prisma.balance.findFirst({
      where:{
         userId:Number(session.user.id)
      }
   });
   return {
      amount:balance?.amount || 0,
      locked:balance?.locked || 0,
   }
}

async function getTransactions (){
   const session = await getServerSession(authOptions)
   const transactions = await prisma.onRampTransaction.findMany({
      where:{
         userId:Number(session.user.id)
      }
   });
  return  transactions.map(transaction=>{
      return {
       amount:transaction.amount,
       status:transaction.status,
       time:transaction.startTime,
       provider:transaction.provider,
       method:transaction.method
      }
   })
   
}

export default async function (){
   const transactions = await getTransactions()
   const balance = await getBalance()
   return <div>
     <h4 className="text-xl p-2   text-center font-semibold ">P2P transactions</h4>
   <div id="mainBody"  className="flex rounded-lg p-6  w-full justify-between gap-11 ">
   
      <div className="px-4 ">  <P2ptransfer balance={balance.amount} locked={balance.locked}  /></div>
    <div className=" flex flex-col gap-4">
      <div>
      <BalanceCard amount={balance.amount} locked={balance.locked}/>
      </div>
      <div id="transactions">
      <OnRampTransactions transactions={transactions}/>
      </div>
    </div>

</div>
     
   </div>
    
}