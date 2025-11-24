import React, { useState } from "react";
import { Gift, Tag, ShoppingCart, CheckCircle, X } from "lucide-react";
import { UserRewards } from "@/lib/types/waste";
import Button from "@/components/buttons";

interface DiscountRedemptionProps {
  userRewards: UserRewards;
  onRedeemDiscount: (
    purchaseAmount: number,
    discountPercentage: number
  ) => Promise<void>;
}

export const DiscountRedemption: React.FC<DiscountRedemptionProps> = ({
  userRewards,
  onRedeemDiscount,
}) => {
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState<string>("");
  const [isRedeeming, setIsRedeeming] = useState(false);

  const calculateSavings = () => {
    const amount = parseFloat(purchaseAmount) || 0;
    const savings = (amount * userRewards.discount_available) / 100;
    const finalAmount = amount - savings;
    return { savings, finalAmount };
  };

  const handleRedeem = async () => {
    const amount = parseFloat(purchaseAmount);
    if (!amount || amount <= 0) return;

    setIsRedeeming(true);
    try {
      await onRedeemDiscount(amount, userRewards.discount_available);
      setShowRedemptionModal(false);
      setPurchaseAmount("");
    } finally {
      setIsRedeeming(false);
    }
  };

  const { savings, finalAmount } = calculateSavings();

  return (
    <>
      {/* Redemption Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Gift className="w-7 h-7 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-900 mb-1">
              Your Reward Discount
            </h3>
            <p className="text-sm text-purple-700">
              Use your earned rewards on your next purchase
            </p>
          </div>
        </div>

        <div className="bg-white/70 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Available Discount
            </span>
            <span className="text-3xl font-bold text-purple-600">
              {userRewards.discount_available}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Current Tier</span>
            <span className="font-semibold text-gray-900 bg-purple-100 px-3 py-1 rounded-full">
              {userRewards.current_tier}
            </span>
          </div>
        </div>

        <Button
          onClick={() => setShowRedemptionModal(true)}
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Redeem Discount on Purchase
        </Button>

        <p className="text-xs text-purple-700 text-center mt-3">
          Valid on all purchases • Can be combined with product offers
        </p>
      </div>

      {/* Redemption Modal */}
      {showRedemptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            {/* Header */}
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Apply Discount
                  </h3>
                  <p className="text-sm text-gray-600">
                    {userRewards.discount_available}% off your purchase
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowRedemptionModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Purchase Amount Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Purchase Amount (₦)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={purchaseAmount}
                    onChange={(e) => setPurchaseAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              {/* Calculation Breakdown */}
              {purchaseAmount && parseFloat(purchaseAmount) > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">
                      Discount Applied
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Original Amount:
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        ₦
                        {parseFloat(purchaseAmount).toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        Discount ({userRewards.discount_available}%):
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        -₦
                        {savings.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>

                    <div className="pt-2 border-t-2 border-green-300">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-900">
                          Final Amount:
                        </span>
                        <span className="text-2xl font-bold text-purple-600">
                          ₦
                          {finalAmount.toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white/60 rounded-lg">
                    <p className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 font-bold">💰</span>
                      <span>
                        You save{" "}
                        <strong className="text-green-700">
                          ₦
                          {savings.toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </strong>{" "}
                        with your {userRewards.current_tier} tier rewards!
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Important Notes */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Important Notes:
                </p>
                <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                  <li>Discount is applied automatically at checkout</li>
                  <li>Can be combined with product promotions</li>
                  <li>One-time use per purchase</li>
                  <li>Points remain valid for future redemptions</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleRedeem}
                  variant="primary"
                  className="flex-1"
                  isDisabled={
                    !purchaseAmount ||
                    parseFloat(purchaseAmount) <= 0 ||
                    isRedeeming
                  }
                >
                  {isRedeeming ? "Processing..." : "Apply Discount"}
                </Button>
                <Button
                  onClick={() => setShowRedemptionModal(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
