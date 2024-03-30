import { Card } from "@repo/ui/card";

export enum TransactionStatus {
  Success = "Success",
  Failure = "Failure",
  Processing = "Processing",
}

export enum Case {
  Debit = "Debit",
  Credit = "Credit",
}

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status?: TransactionStatus;
    provider?: string;
    case?: Case;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between gap-6 border-b">
            <div>
              {t.case === "Debit" ? (
                <div className="text-sm">Transfered INR</div>
              ) : (
                <div className="text-sm">Received INR</div>
              )}

              <div className="text-slate-600 text-xs pb-2">
                {t.time.toDateString()}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              {t.case === "Debit" ? <span className="inline-block"> - Rs {t.amount / 100}</span> : <span> + Rs {t.amount / 100}</span>}
              
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
