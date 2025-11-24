import React, { useState } from "react";
import {
  Info,
  CheckCircle,
  Gift,
  Trash2,
  TrendingUp,
  Shield,
  Leaf,
  X,
} from "lucide-react";

export const HowItWorksGuide: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-blue-900">How It Works</p>
            <p className="text-xs text-blue-700">
              Learn about our waste management & rewards program
            </p>
          </div>
          <span className="text-blue-600">→</span>
        </div>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  How Waste Management & Rewards Work
                </h2>
                <p className="text-sm text-gray-600">
                  Everything you need to know about our eco-friendly program
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Step-by-Step Process */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  The Process
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      icon: <Trash2 className="w-6 h-6 text-blue-600" />,
                      title: "Return Unused/Expired Medication",
                      description:
                        "Bring your unused, expired, or damaged medication to any PharmaEco collection point. We accept blister packs, bottles, tubes, cartons, and more.",
                      color: "blue",
                    },
                    {
                      step: 2,
                      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                      title: "Pharmacist Verification",
                      description:
                        "Our trained pharmacist will verify the returned items, document the type and quantity, and ensure proper handling according to NAFDAC guidelines.",
                      color: "green",
                    },
                    {
                      step: 3,
                      icon: <Gift className="w-6 h-6 text-purple-600" />,
                      title: "Earn Rewards Points",
                      description:
                        "Once verified, points are instantly added to your account. Different waste types earn different points - bottles earn more than sachets!",
                      color: "purple",
                    },
                    {
                      step: 4,
                      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
                      title: "Unlock Higher Tiers",
                      description:
                        "As you accumulate points, you'll progress through Bronze, Silver, Gold, and Platinum tiers - each with better discounts and benefits.",
                      color: "orange",
                    },
                    {
                      step: 5,
                      icon: <Gift className="w-6 h-6 text-pink-600" />,
                      title: "Redeem Your Discount",
                      description:
                        "Use your tier discount on your next medication purchase. The more you recycle, the more you save!",
                      color: "pink",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className={`flex gap-4 p-4 bg-${item.color}-50 border border-${item.color}-200 rounded-lg`}
                    >
                      <div
                        className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-500">
                            STEP {item.step}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-700">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Rewards Tiers */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Gift className="w-6 h-6 text-primary" />
                  Rewards Tiers
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Bronze",
                      points: "0-99 points",
                      discount: "5%",
                      color: "amber-700",
                      benefits: [
                        "5% discount on purchases",
                        "Priority waste collection",
                      ],
                    },
                    {
                      name: "Silver",
                      points: "100-499 points",
                      discount: "10%",
                      color: "gray-400",
                      benefits: [
                        "10% discount on purchases",
                        "Free home waste pickup",
                        "Monthly health tips",
                      ],
                    },
                    {
                      name: "Gold",
                      points: "500-999 points",
                      discount: "15%",
                      color: "yellow-500",
                      benefits: [
                        "15% discount on purchases",
                        "Free delivery on all orders",
                        "Eco-workshops access",
                        "Health check voucher",
                      ],
                    },
                    {
                      name: "Platinum",
                      points: "1000+ points",
                      discount: "20%",
                      color: "purple-600",
                      benefits: [
                        "20% discount on purchases",
                        "VIP health consultation",
                        "Annual health screening",
                        "Carbon offset certificate",
                      ],
                    },
                  ].map((tier) => (
                    <div
                      key={tier.name}
                      className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-10 h-10 bg-${tier.color} rounded-lg flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-sm">
                            {tier.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                          {tier.discount}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {tier.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-3">
                        {tier.points}
                      </p>
                      <ul className="space-y-1">
                        {tier.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-gray-700 flex items-start gap-1"
                          >
                            <span className="text-green-500">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Points System */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Points Per Waste Type
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { type: "Bottle", points: 10, icon: "🍶" },
                    { type: "Vial", points: 8, icon: "🧪" },
                    { type: "Blister Pack", points: 5, icon: "💊" },
                    { type: "Tube", points: 3, icon: "🧴" },
                    { type: "Carton", points: 2, icon: "📦" },
                    { type: "Sachet", points: 1, icon: "📋" },
                  ].map((item) => (
                    <div
                      key={item.type}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center"
                    >
                      <span className="text-2xl mb-1 block">{item.icon}</span>
                      <p className="font-semibold text-sm text-gray-900 mb-1">
                        {item.type}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        +{item.points} pts
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why It Matters */}
              <section className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <Leaf className="w-6 h-6" />
                  Why This Matters
                </h3>

                <div className="space-y-3 text-sm text-green-800">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">
                        Protect Public Health
                      </p>
                      <p className="text-xs">
                        Improper disposal contaminates water sources and harms
                        communities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Leaf className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Save the Environment</p>
                      <p className="text-xs">
                        Recycling pharmaceutical waste reduces CO₂ emissions and
                        landfill waste
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">NAFDAC Compliant</p>
                      <p className="text-xs">
                        All disposal follows approved pharmaceutical waste
                        management guidelines
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <div className="text-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition-colors font-semibold"
                >
                  Got It! Let&apos;s Start Recycling
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
