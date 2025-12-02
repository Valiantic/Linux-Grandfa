import React from "react";

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function PixelCard({ children, className = "" }: PixelCardProps) {
  return (
    <div
      className={`
        relative bg-zinc-900 border-4 border-black
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        before:absolute before:inset-0 before:border-2 before:border-green-500/20
        ${className}
      `}
    >
      {/* Corner decorations for pixel effect */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-500" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-500" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500" />
      {children}
    </div>
  );
}
