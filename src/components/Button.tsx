"use client";

import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "option";
type ButtonSize = "none" | "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-cream text-dark hover:bg-light",
  secondary: "bg-medium text-cream hover:bg-light",
  outline: "bg-transparent border-2 border-cream text-cream hover:bg-cream hover:text-dark",
  ghost: "bg-transparent text-cream",
  option: "bg-dark text-white hover:bg-light",
};

const sizeStyles: Record<ButtonSize, string> = {
  none: "",
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        rounded-md font-medium transition-colors duration-200 hover:cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed text-center
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
