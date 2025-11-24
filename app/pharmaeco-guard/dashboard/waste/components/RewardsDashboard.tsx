import React from "react";
import { Trophy, TrendingUp, Leaf, Gift, Star } from "lucide-react";
import { UserRewards, REWARDS_TIERS, getNextTier } from "@/lib/types/waste";

interface RewardsDashboardProps {
  userRewards: UserRewards;
}

export const RewardsDashboard: React.FC<RewardsDashboardProps> = ({
  userRewards,
}) => {
  const currentTier = REWARDS_TIERS.find(
    (tier) =>
      userRewards.total_points >= tier.minPoints &&
      userRewards.total_points <= tier.maxPoints
  );
  const nextTier = getNextTier(userRewards.total_points);
  const progressToNext = nextTier
    ? ((userRewards.total_points - (currentTier?.minPoints || 0)) /
        (nextTier.minPoints - (currentTier?.minPoints || 0))) *
      100
    : 100;

  return (
    <div className="space-y-4">
      {/* Current Tier Card */}
      <div
        className={`${currentTier?.color} text-white rounded-xl p-6 shadow-lg`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-6 h-6" />
              <span className="text-sm font-medium opacity-90">
                Current Tier
              </span>
            </div>
            <h3 className="text-3xl font-bold">{currentTier?.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90 mb-1">Available Discount</p>
            <p className="text-4xl font-bold">{currentTier?.discount}%</p>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex justify-between text-sm mb-2">
              <span className="opacity-90">Progress to {nextTier.name}</span>
              <span className="font-semibold">
                {userRewards.total_points} / {nextTier.minPoints} points
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              />
            </div>
            <p className="text-xs mt-2 opacity-80">
              {nextTier.minPoints - userRewards.total_points} points to unlock{" "}
              {nextTier.discount}% discount
            </p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-gray-600 font-medium">
              Total Points
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {userRewards.total_points.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {userRewards.lifetime_points.toLocaleString()} lifetime
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-600 font-medium">
              Items Recycled
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {userRewards.items_recycled}
          </p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-green-500" />
            <span className="text-xs text-gray-600 font-medium">CO₂ Saved</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {userRewards.co2_saved_kg.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">kg</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-gray-600 font-medium">
              Next Discount
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {currentTier?.discount}%
          </p>
          <p className="text-xs text-gray-500 mt-1">On purchases</p>
        </div>
      </div>

      {/* Tier Benefits */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Your {currentTier?.name} Benefits
        </h4>
        <ul className="space-y-2">
          {currentTier?.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <span className="text-green-500 mt-0.5">✓</span>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* All Tiers Overview */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
        <h4 className="font-semibold text-primaryDark mb-3">
          All Rewards Tiers
        </h4>
        <div className="space-y-2">
          {REWARDS_TIERS.map((tier) => {
            const isCurrentTier = tier.name === currentTier?.name;
            const isUnlocked = userRewards.total_points >= tier.minPoints;

            return (
              <div
                key={tier.name}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  isCurrentTier
                    ? "bg-white border-2 border-primary shadow-sm"
                    : isUnlocked
                    ? "bg-white/50 border border-gray-200"
                    : "bg-white/30 border border-gray-100 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${tier.color} rounded-lg flex items-center justify-center`}
                  >
                    {isUnlocked ? (
                      <Trophy className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white text-xs font-bold">🔒</span>
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        isCurrentTier ? "text-primary" : "text-gray-900"
                      }`}
                    >
                      {tier.name}
                      {isCurrentTier && (
                        <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-600">
                      {tier.minPoints === 0
                        ? "Starting tier"
                        : `${tier.minPoints}+ points`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    {tier.discount}%
                  </p>
                  <p className="text-xs text-gray-600">discount</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
