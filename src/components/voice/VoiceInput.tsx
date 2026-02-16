import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface VoiceInputProps {
    isListening: boolean;
    onToggle: () => void;
    className?: string;
    disabled?: boolean;
}

export function VoiceInput({ isListening, onToggle, className, disabled }: VoiceInputProps) {
    return (
        <button
            onClick={onToggle}
            disabled={disabled}
            aria-pressed={isListening}
            aria-label={isListening ? "Stop listening" : "Start listening"}
            className={twMerge(
                "p-2 rounded-full transition-all duration-200 flex items-center justify-center",
                isListening
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 animate-pulse ring-2 ring-red-500/50"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {isListening ? (
                <Mic className="w-5 h-5" />
            ) : (
                <Mic className="w-5 h-5" />
            )}
        </button>
    );
}
