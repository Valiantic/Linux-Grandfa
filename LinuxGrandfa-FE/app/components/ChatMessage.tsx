'use client';
import React, { useState } from "react";
import Image from "next/image";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  images?: string[];
}

export default function ChatMessage({ message, isUser, timestamp, images }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 group`}>
      <div
        className={`
          relative max-w-[80%] px-4 py-3
          ${isUser
            ? "font-pixel text-lg bg-green-500 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            : "font-terminal text-2xl font-semibold bg-zinc-800 text-green-400 border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }
        `}
      >
        {/* Pixel corner accent */}
        <div
          className={`absolute -top-1 ${isUser ? "-left-1" : "-right-1"} w-2 h-2 ${isUser ? "bg-black" : "bg-green-500"
            }`}
        />

        {/* Avatar indicator */}
        <div className={`absolute -top-2 ${isUser ? "right-2" : "left-2"} text-xs`}>
          {isUser ? "👤" : "🐧"}
        </div>

        {/* Copy button */}
        {message && (
          <button
            onClick={handleCopy}
            className={`
              absolute top-2 right-2 p-1 text-xs
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              ${isUser
                ? "text-black/60 hover:text-black"
                : "text-green-400/60 hover:text-green-400"
              }
            `}
            title="Copy to clipboard"
          >
            {copied ? "✓" : "📋"}
          </button>
        )}

        {/* Display images if any */}
        {images && images.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((img, index) => (
              <div key={index} className="border-2 border-black overflow-hidden">
                <Image
                  src={img}
                  alt={`Attached image ${index + 1}`}
                  width={120}
                  height={120}
                  className="object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
            ))}
          </div>
        )}

        {message && <p className="leading-relaxed pr-6">{message}</p>}

        {timestamp && (
          <span className={`block mt-2 text-xs opacity-60 ${isUser ? "text-black" : "text-green-300"}`}>
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
