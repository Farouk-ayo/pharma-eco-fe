"use client";
import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
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
  size = "md",
  className,
  isDisabled = false,
  isLoading = false,
}) => {
  const baseStyles =
    " rounded-b-[40px] rounded-t-[15px] font-semibold transition-all duration-200 ease-in-out hover:scale-[1.02]";

  const variantStyles: Record<string, string> = {
    primary: "bg-primary hover:bg-primary/90 text-white",
    secondary:
      "bg-transparent border-primary border text-primary hover:bg-tertiary/5 ",
    tertiary: "bg-tertiary3 hover:bg-tertiary2",
  };

  const disabledStyles =
    "bg-gray-400 text-gray-600 cursor-not-allowed opacity-50";

  const sizeClasses = {
    sm: "px-6 py-2 text-base",
    md: "px-6 py-2 text-sm sm:px-8 sm:py-3 sm:text-base",
    lg: "px-8 py-3 text-base sm:px-10 sm:py-4 sm:text-lg",
  };

  const combinedStyles = `${baseStyles} ${sizeClasses[size]} ${
    variantStyles[variant] || ""
  } ${className || ""} ${isDisabled || isLoading ? disabledStyles : ""}`;

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
