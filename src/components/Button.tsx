"use client";

import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "option" | "submit";
type ButtonSize = "none" | "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  selected?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-cream text-white hover:brightness-110",
  secondary: "bg-medium text-white hover:brightness-125",
  outline: "bg-transparent border-2 border-cream text-cream hover:bg-cream/20",
  ghost: "bg-transparent text-cream hover:bg-white/10",
  option: "hover:brightness-90",
  submit: "bg-green text-green-foreground hover:brightness-70"
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
        ${variant === "option" ? (selected ? "bg-amber text-amber-foreground" : "bg-dark text-white") : ""}  
        rounded-2xl font-medium transition-colors duration-200 hover:cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed text-center
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
