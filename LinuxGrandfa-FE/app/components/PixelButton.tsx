"use client";

import React from "react";

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function PixelButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: PixelButtonProps) {
  const baseStyles =
    "font-pixel px-6 py-3 text-sm uppercase tracking-wider transition-all duration-150";

  const enabledStyles = "active:translate-y-1 active:shadow-none";
  
  const disabledStyles = "opacity-50 cursor-not-allowed";

  const variants = {
    primary:
      "bg-green-500 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 border-2 border-black",
    secondary:
      "bg-zinc-800 text-green-400 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(34,197,94,0.5)] hover:-translate-x-0.5 hover:-translate-y-0.5 border-2 border-green-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${disabled ? disabledStyles : enabledStyles} ${disabled ? '' : variants[variant]} ${disabled ? 'bg-zinc-700 text-zinc-500 border-2 border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]' : variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
