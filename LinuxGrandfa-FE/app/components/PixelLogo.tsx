import Image from "next/image";
import React from "react";

interface PixelLogoProps {
  size?: number;
  className?: string;
}

export default function PixelLogo({ size = 120, className = "" }: PixelLogoProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* 3D shadow layers */}
      <div
        className="absolute inset-0 bg-black/80 translate-x-3 translate-y-3"
        style={{ width: size, height: size }}
      />
      <div
        className="absolute inset-0 bg-green-500/30 translate-x-1.5 translate-y-1.5"
        style={{ width: size, height: size }}
      />
      
      {/* Main logo container */}
      <div
        className="
          relative bg-zinc-900 border-4 border-black p-4
          shadow-[0_0_20px_rgba(34,197,94,0.3)]
          group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]
          transition-all duration-300
          group-hover:-translate-x-1 group-hover:-translate-y-1
        "
        style={{ width: size, height: size }}
      >
        {/* Pixel corner decorations */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500" />
        
        {/* Inner border glow */}
        <div className="absolute inset-2 border-2 border-green-500/30" />
        
        <Image
          src="/logo.png"
          alt="Linux Grandfa Logo"
          width={size - 32}
          height={size - 32}
          className="
            relative z-10 w-full h-full object-contain
            [image-rendering:pixelated]
            drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]
          "
          priority
        />
      </div>
    </div>
  );
}
