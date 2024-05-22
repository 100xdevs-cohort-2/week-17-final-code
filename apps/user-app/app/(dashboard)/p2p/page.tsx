"use server";
import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/card-stack";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import P2PTransaction from "../../../components/p2pTransactions";
async function getp2pTransaction() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    toUserId: t.toUserId,
  }));
}
export default async function () {
  const transactions = await getp2pTransaction();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
          <P2PTransaction transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
