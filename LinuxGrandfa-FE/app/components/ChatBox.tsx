"use client";

import React, { useState, useRef, useEffect } from "react";
import PixelCard from "./PixelCard";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { sendChatMessage, filesToDataUrls } from "@/app/services";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
  images?: string[];
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Howdy, young G! I'm Nesti. What command line wisdom can this old penguin share with ya today?",
      isUser: false,
      timestamp: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string, images?: File[]) => {
    // Convert images to data URLs for display
    const imageUrls = images ? await filesToDataUrls(images) : [];
    
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      images: imageUrls.length > 0 ? imageUrls : undefined,
    };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // Get response from API
    const responseText = await sendChatMessage(text, imageUrls.length > 0 ? imageUrls : undefined);
    
    const response: Message = {
      id: messages.length + 2,
      text: responseText,
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, response]);
    setIsLoading(false);
  };

  return (
    <PixelCard className="w-full max-w-9xl max-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-zinc-800 border-b-4 border-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 border border-black" />
            <div className="w-3 h-3 bg-yellow-500 border border-black" />
            <div className="w-3 h-3 bg-green-500 border border-black" />
          </div>
          <span className="font-pixel text-green-400 text-sm">terminal@linuxgrandfa</span>
        </div>
        <div className="font-pixel text-zinc-500 text-xs">v1.0.0</div>
      </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-6 bg-zinc-900/50 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-zinc-800 relative">
        {/* Scanline effect overlay - z-index lower than content */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-0" />
        
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.text}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
            images={msg.images}
          />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-green-400 font-pixel text-sm mt-4">
            <div className="flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
            </div>
            <span>Nesti is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-zinc-800 border-t-4 border-black p-4">
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </PixelCard>
  );
}
