"use client";
import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  type = "button",
  children,
  onClick,
  href,
  className,
  isDisabled = false,
  isLoading = false,
}) => {
  const baseStyles =
    "px-2 py-2 sm:px-5 py-4 rounded-md font-semibold transition-all duration-200 ease-in-out text-sm sm:text-lg ";

  const variantStyles: Record<string, string> = {
    primary: "bg-primary hover:bg-tertiary",
    secondary: "bg-secondary hover:bg-tertiary1",
    tertiary: "bg-tertiary3 hover:bg-tertiary2",
  };

  const disabledStyles =
    "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50";

  const combinedStyles = `${baseStyles} ${variantStyles[variant] || ""} ${
    className || ""
  } ${isDisabled || isLoading ? disabledStyles : ""}`;

  const handleClick = (event: React.MouseEvent) => {
    if (isDisabled || isLoading) {
      event.preventDefault();
      event.stopPropagation();
    } else if (onClick) {
      onClick();
    }
  };

  const buttonContent = (
    <>{isLoading ? <span className="loader"></span> : children}</>
  );

  if (href) {
    return (
      <a
        href={isDisabled || isLoading ? undefined : href}
        className={combinedStyles}
        onClick={handleClick}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={combinedStyles}
      type={type}
      disabled={isDisabled || isLoading}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
