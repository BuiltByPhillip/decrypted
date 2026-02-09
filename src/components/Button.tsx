"use client";

import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "option";
type ButtonSize = "none" | "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  selected?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-cream text-dark hover:brightness-110",
  secondary: "bg-medium text-cream hover:brightness-125",
  outline: "bg-transparent border-2 border-cream text-cream hover:bg-cream/20",
  ghost: "bg-transparent text-cream hover:bg-white/10",
  option: "bg-dark hover:brightness-150",
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
  selected,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${variant === "option" ? (selected ? "bg-green text-green-foreground" : "text-white") : ""}  
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
