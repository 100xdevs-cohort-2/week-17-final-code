"use server";

import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";

export default async function createOnRampTransactions(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    message: "User not logged in";
  }
  const token = (Math.random() * 1000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      userId: Number(session?.user?.id),
      token: token,
      amount: amount * 10,
      startTime: new Date(),
    },
  });
  return {
    msg: "Done",
  };
}
