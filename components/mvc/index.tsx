import { MissionVisionCard } from "../cards/missionVisionCard";
import { HorizontalLine } from "../icons";

export const MVCSection = () => {
  return (
    <section className="px-4 lg:px-28 py-12 lg:py-20 relative">
      {/* Horizontal line connector */}
      <div className="hidden lg:block relative w-full mb-8">
        <HorizontalLine className="w-full" />
      </div>

      {/* Mission and Vision Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <MissionVisionCard
          letter="M"
          title="Our Mission"
          description="To build a sustainable, AI-driven system for the collection, recycling, and disposal of pharmaceutical waste and packaging materials by protecting public health, conserving the environment, and fostering circular economy practices in Nigeria."
          backgroundColor="#1B4D3E"
          letterColor="#1B4D3E"
        />
        <MissionVisionCard
          letter="V"
          title="Our Vision"
          description="To be Africa's leading platform for pharmaceutical waste and packaging recycling, driving environmental responsibility, artificial intelligence, innovation, and public health protection."
          backgroundColor="#F59E0B"
          letterColor="#F59E0B"
        />
      </div>
    </section>
  );
};
