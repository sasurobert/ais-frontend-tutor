import React from 'react';
import { X, Mic } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { MaterialTextButton } from '@ais/material/MaterialComponents';
import { InteractiveParticleSystem } from '@ais/common/InteractiveParticleSystem';

interface VoiceModeOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    transcript: string;
    isListening: boolean;
}

export function VoiceModeOverlay({ isOpen, onClose, transcript, isListening }: VoiceModeOverlayProps) {
    if (!isOpen) return null;

    return (
        <InteractiveParticleSystem
            color={isListening ? '#ef4444' : '#6366f1'}
            count={isListening ? 3000 : 1500}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-white animate-in fade-in duration-300"
        >
            {/* Close Button */}
            <div className="absolute top-6 right-6">
                <MaterialTextButton
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
                    style={{ minWidth: '40px', padding: '8px', color: 'white' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X className="w-8 h-8" />
                    </div>
                </MaterialTextButton>
            </div>

            {/* Visualizer (Simple Pulse) */}
            <div className={twMerge(
                "mb-12 p-8 rounded-full transition-all duration-500",
                isListening ? "bg-red-500/20 animate-pulse ring-4 ring-red-500/30" : "bg-neutral-800"
            )}>
                <Mic className={twMerge("w-16 h-16", isListening ? "text-red-500" : "text-neutral-500")} />
            </div>

            {/* Status Text */}
            <h2 className="text-2xl font-light mb-8 text-neutral-400">
                {isListening ? "Listening..." : "Processing..."}
            </h2>

            {/* Transcript */}
            <div className="max-w-2xl text-center">
                <p className="text-3xl md:text-4xl font-medium leading-relaxed">
                    {transcript || <span className="text-neutral-600">Start speaking...</span>}
                </p>
            </div>
        </InteractiveParticleSystem>
    );
}
