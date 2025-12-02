"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import PixelButton from "./PixelButton";

interface ChatInputProps {
  onSend: (message: string, images?: File[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  placeholder = "Type your command...",
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    if (message.trim() || selectedImages.length > 0) {
      onSend(message.trim(), selectedImages.length > 0 ? selectedImages : undefined);
      setMessage("");
      setSelectedImages([]);
      setImagePreviews([]);
    }
  };

  const processFiles = useCallback((files: File[]) => {
    const validFiles = files.filter(
      (file) => file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg"
    );

    if (validFiles.length === 0) return;

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreviews((prev) => [...prev, reader.result as string]);
          setSelectedImages((prev) => [...prev, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(Array.from(files));
    }
    // Reset file input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const imageFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          imageFiles.push(file);
        }
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      processFiles(imageFiles);
    }
  }, [processFiles]);

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const isSubmitDisabled = disabled || (!message.trim() && selectedImages.length === 0);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 bg-zinc-800 border-2 border-zinc-700">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="w-16 h-16 border-2 border-green-500 bg-black overflow-hidden">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover pixelated"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border border-black text-white font-pixel text-xs flex items-center justify-center hover:bg-red-400 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 relative z-10">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          multiple
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
        
        {/* Upload Button */}
        <button
          type="button"
          onClick={handleFileButtonClick}
          disabled={disabled}
          className={`
            bg-zinc-800 border-4 border-zinc-600 
            text-green-400 font-pixel text-lg
            px-4 py-4
            hover:bg-zinc-700 hover:border-green-500
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
            active:translate-x-[2px] active:translate-y-[2px]
            transition-all duration-150
            flex items-center justify-center
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          title="Upload image (PNG, JPG)"
        >
          📎
        </button>

        <div className="relative flex-1">
          {/* Terminal prompt indicator */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 font-pixel text-sm pointer-events-none z-10">
            {"$>"}
          </span>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPaste={handlePaste}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full bg-black border-4 border-zinc-700 
              text-green-400 font-pixel text-sm
              pl-12 pr-4 py-4
              placeholder:text-zinc-600
              focus:outline-none focus:border-green-500
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              transition-all duration-150
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />
          {/* Blinking cursor effect */}
          {!message && !disabled && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-5 bg-green-500 animate-pulse pointer-events-none" />
          )}
        </div>
        <PixelButton type="submit" variant="primary" disabled={isSubmitDisabled}>
          Send
        </PixelButton>
      </div>
    </form>
  );
}
