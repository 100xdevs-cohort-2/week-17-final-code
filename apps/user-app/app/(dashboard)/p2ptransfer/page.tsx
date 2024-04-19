import prisma from "@repo/db/client";
import P2PTransfer from "../../../components/P2PTransfer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransactions } from "../../../components/P2pTransactions";

const getp2ptransaction = async () => {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2PTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },
  });
  return transactions;
};

export default async function () {
  const transactions = await getp2ptransaction();
  return (
    <div className="flex justify-center items-center w-[80vw] gap-20">
      <div className="w-[30%]">
        <P2PTransfer />
      </div>
      <div className="w-[60%]">
        <P2pTransactions transactions={transactions} />
      </div>
    </div>
  );
}
