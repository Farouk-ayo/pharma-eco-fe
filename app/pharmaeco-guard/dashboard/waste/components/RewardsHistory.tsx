import React from "react";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { RewardTransaction } from "@/lib/types/waste";

interface RewardsHistoryProps {
  transactions: RewardTransaction[];
}

export const RewardsHistory: React.FC<RewardsHistoryProps> = ({
  transactions,
}) => {
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, RewardTransaction[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-primaryDark flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Rewards History
        </h4>
        <span className="text-sm text-gray-600">
          {transactions.length} transaction(s)
        </span>
      </div>

      {Object.entries(groupedTransactions).map(([month, monthTransactions]) => (
        <div key={month} className="space-y-2">
          <h5 className="text-sm font-semibold text-gray-700 px-3">{month}</h5>
          <div className="space-y-2">
            {monthTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`border-2 rounded-lg p-4 transition-all hover:shadow-sm ${
                  transaction.type === "earned"
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        transaction.type === "earned"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === "earned" ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === "earned"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "earned" ? "+" : "-"}
                      {transaction.points}
                    </p>
                    <p className="text-xs text-gray-600">points</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {transactions.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">
            No transaction history yet
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Start returning waste to earn rewards
          </p>
        </div>
      )}
    </div>
  );
};
