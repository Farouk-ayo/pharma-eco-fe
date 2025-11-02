import React from "react";

interface BadgeProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const AdminBadge: React.FC<BadgeProps> = ({
  text,
  textColor = "text-primary",
  className,
}) => {
  return (
    <div
      className={`inline-block px-2 py-1 ${textColor} bg-primary/25 text-base lg:text-2xl font-semibold rounded-lg ${className}`}
    >
      {text}
    </div>
  );
};

export default AdminBadge;
