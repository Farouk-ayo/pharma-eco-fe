import Badge from "../badge";
import { MissionVisionCard } from "../cards/missionVisionCard";
import { HorizontalLine } from "../icons";

export const MVCSection = () => {
  return (
    <section className="px-4 lg:px-28 py-12 lg:py-20 relative">
      <div className="text-center lg:my-12 w-full lg:w-[60%] mx-auto">
        <Badge text="OUR DRIVE" className="mb-2" />{" "}
        <h1 className="text-2xl   lg:text-4xl font-semibold text-tertiary3 mb-6 ">
          What Is Pushing Us At PharmaEco As The Leader Of Pharmaceutical Waste
          Management
        </h1>
      </div>
      {/* Horizontal line connector */}
      <div className="hidden lg:block relative w-full -mb-8">
        <HorizontalLine className="w-full" />
      </div>

      {/* Mission and Vision Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-8 lg:gap-12">
        <MissionVisionCard
          letter="M"
          title="Our Mission"
          description="To build a sustainable, AI-driven system for the collection, recycling, and disposal of pharmaceutical waste and packaging materials by protecting public health, conserving the environment, and fostering circular economy practices in Nigeria."
          backgroundColor="#023022"
          letterColor="#023022E3"
        />
        <MissionVisionCard
          letter="V"
          title="Our Vision"
          description="To be Africa’s leading platform for pharmaceutical waste and packaging recycling, driving environmental responsibility, artificial intelligence,  innovation, and public health protection."
          backgroundColor="#FFB506"
          letterColor="#FFB506ED"
        />
      </div>
    </section>
  );
};
