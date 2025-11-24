// lib/types/waste.ts

export interface WasteItem {
  id: number;
  patient_id: number;
  patient_name: string;
  unique_id: string;
  drug_name: string;
  waste_type: "blister_pack" | "bottle" | "tube" | "carton" | "sachet" | "vial";
  quantity: string;
  quantity_numeric: number; // For calculations
  date_returned: string;
  status: "unused" | "expired" | "damaged";
  reason: string;
  points_earned: number;
  verified: boolean;
  verified_by?: string;
  verified_at?: string;
  disposal_method?: string;
  environmental_impact?: string;
}

export interface RewardsTier {
  name: string;
  minPoints: number;
  maxPoints: number;
  discount: number; // Percentage
  color: string;
  benefits: string[];
}

export interface UserRewards {
  patient_id: number;
  total_points: number;
  current_tier: string;
  lifetime_points: number;
  items_recycled: number;
  co2_saved_kg: number;
  discount_available: number;
  rewards_history: RewardTransaction[];
}

export interface RewardTransaction {
  id: number;
  type: "earned" | "redeemed";
  points: number;
  description: string;
  date: string;
  waste_item_id?: number;
}

// Waste type configurations with point values
export const WASTE_TYPE_CONFIG = {
  blister_pack: {
    label: "Blister Pack",
    icon: "💊",
    pointsPerUnit: 5,
    unit: "pack",
    co2SavedKg: 0.02,
    description: "Empty medication blister packs (aluminum/plastic)",
  },
  bottle: {
    label: "Bottle",
    icon: "🍶",
    pointsPerUnit: 10,
    unit: "bottle",
    co2SavedKg: 0.05,
    description: "Plastic or glass medication bottles",
  },
  tube: {
    label: "Tube",
    icon: "🧴",
    pointsPerUnit: 3,
    unit: "tube",
    co2SavedKg: 0.01,
    description: "Ointment or cream tubes",
  },
  carton: {
    label: "Carton",
    icon: "📦",
    pointsPerUnit: 2,
    unit: "carton",
    co2SavedKg: 0.015,
    description: "Medication packaging cartons",
  },
  sachet: {
    label: "Sachet",
    icon: "📋",
    pointsPerUnit: 1,
    unit: "sachet",
    co2SavedKg: 0.005,
    description: "Single-dose sachets",
  },
  vial: {
    label: "Vial",
    icon: "🧪",
    pointsPerUnit: 8,
    unit: "vial",
    co2SavedKg: 0.03,
    description: "Injection or medication vials",
  },
};

// Rewards tier system
export const REWARDS_TIERS: RewardsTier[] = [
  {
    name: "Bronze",
    minPoints: 0,
    maxPoints: 99,
    discount: 5,
    color: "bg-amber-700",
    benefits: ["5% discount on purchases", "Priority waste collection"],
  },
  {
    name: "Silver",
    minPoints: 100,
    maxPoints: 499,
    discount: 10,
    color: "bg-gray-400",
    benefits: [
      "10% discount on purchases",
      "Free home waste pickup",
      "Monthly health tips newsletter",
    ],
  },
  {
    name: "Gold",
    minPoints: 500,
    maxPoints: 999,
    discount: 15,
    color: "bg-yellow-500",
    benefits: [
      "15% discount on purchases",
      "Free delivery on all orders",
      "Exclusive eco-workshops access",
      "Quarterly health check voucher",
    ],
  },
  {
    name: "Platinum",
    minPoints: 1000,
    maxPoints: Infinity,
    discount: 20,
    color: "bg-purple-600",
    benefits: [
      "20% discount on purchases",
      "VIP health consultation",
      "Annual comprehensive health screening",
      "Carbon offset certificate",
      "Community ambassador status",
    ],
  },
];

// Helper functions
export const calculatePoints = (
  wasteType: keyof typeof WASTE_TYPE_CONFIG,
  quantity: number
): number => {
  return WASTE_TYPE_CONFIG[wasteType].pointsPerUnit * quantity;
};

export const calculateCO2Saved = (
  wasteType: keyof typeof WASTE_TYPE_CONFIG,
  quantity: number
): number => {
  return WASTE_TYPE_CONFIG[wasteType].co2SavedKg * quantity;
};

export const getUserTier = (points: number): RewardsTier => {
  return (
    REWARDS_TIERS.find(
      (tier) => points >= tier.minPoints && points <= tier.maxPoints
    ) || REWARDS_TIERS[0]
  );
};

export const getNextTier = (currentPoints: number): RewardsTier | null => {
  const currentTier = getUserTier(currentPoints);
  const currentIndex = REWARDS_TIERS.findIndex(
    (t) => t.name === currentTier.name
  );
  return REWARDS_TIERS[currentIndex + 1] || null;
};
