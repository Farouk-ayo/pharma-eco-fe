import React from "react";

interface StatisticsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  color: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  icon,
  title,
  value,
  color,
}) => {
  return (
    <div className={`flex items-center gap-5  bg-white p-4 rounded-lg shadow `}>
      <div className={`text-${color}-600 text md:text-3xl`}>{icon}</div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <h3 className=" font-semibold text-xl md:text-2xl text-gray-500">
          {title}
        </h3>
        <p className=" text-3xl md:text-4xl font-bold ">{value}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
