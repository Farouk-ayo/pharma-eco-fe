import React from "react";

interface BadgeProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  textColor = "text-primary",
  className,
}) => {
  return (
    <div
      className={`inline-block uppercase ${textColor} text-2xl font-semibold rounded-lg ${className}`}
    >
      {text}
    </div>
  );
};

export default Badge;
