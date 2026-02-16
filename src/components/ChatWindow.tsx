'use client';

import { useState, useRef, useEffect } from 'react';
import { useTutor } from '../hooks/use-tutor';
import { Send, User, Bot, Loader2, Headphones } from 'lucide-react';
import clsx from 'clsx';
import { useSpeechRecognition } from '../hooks/use-speech-recognition';
import { useTextToSpeech } from '../hooks/use-text-to-speech';
import { VoiceInput } from './voice/VoiceInput';
import { VoiceModeOverlay } from './voice/VoiceModeOverlay';

export default function ChatWindow() {
    const { messages, sendMessage, isLoading, error } = useTutor();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isVoiceMode, setIsVoiceMode] = useState(false);

    // Voice Hooks
    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        isSupported: isSpeechSupported
    } = useSpeechRecognition();

    const {
        speak,
        cancel: cancelSpeech,
        isSpeaking,
        isSupported: isTTSSupported
    } = useTextToSpeech();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Construct the "Active" transcript to show in input or overlay
    // If listening, we show current transcript. 
    // If not listening, we show what's typed (or what was recognized)
    useEffect(() => {
        if (isListening) {
            setInput(transcript);
        }
    }, [transcript, isListening]);

    // Auto-send when listening stops (if we have input)
    // NOTE: This is a simple implementation. In a real app we might want a "confirm" step or delay.
    // For this MVP, we'll require manual send click for non-voice mode, 
    // but maybe for Voice Mode we auto-send?
    // Let's stick to manual toggle for now: Click Mic -> Speak -> Click Mic (Stop) -> Auto Send?
    // Yes, that's a common pattern.
    const wasListening = useRef(false);
    useEffect(() => {
        if (wasListening.current && !isListening) {
            // Just stopped listening
            if (input.trim()) {
                handleSend();
            }
        }
        wasListening.current = isListening;
    }, [isListening]); // eslint-disable-line react-hooks/exhaustive-deps

    // TTS Logic: Speak new bot messages if in Voice Mode
    const lastMessageRef = useRef<number>(0);
    useEffect(() => {
        if (messages.length > lastMessageRef.current) {
            const latestMsg = messages[messages.length - 1];
            if (latestMsg.role === 'assistant' && isVoiceMode) {
                speak(latestMsg.content);
            }
            lastMessageRef.current = messages.length;
        }
    }, [messages, isVoiceMode, speak]);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;
        sendMessage(input);
        setInput('');
        resetTranscript();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSend();
    };

    const toggleVoiceMode = () => {
        const newState = !isVoiceMode;
        setIsVoiceMode(newState);
        if (!newState) {
            cancelSpeech();
            stopListening();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-neutral-900 text-neutral-100 relative">
            <header className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-emerald-400" />
                    <h1 className="text-xl font-bold">AI Tutor Droid</h1>
                </div>
                {(isSpeechSupported && isTTSSupported) && (
                    <button
                        onClick={toggleVoiceMode}
                        className={clsx(
                            "p-2 rounded-full transition-colors",
                            isVoiceMode ? "bg-emerald-500/20 text-emerald-400" : "hover:bg-neutral-800 text-neutral-400"
                        )}
                        title="Toggle Voice Mode"
                    >
                        <Headphones className="w-5 h-5" />
                    </button>
                )}
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-neutral-500 mt-20">
                        <p>Ask me anything about Redstone, Physics, or Code!</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={clsx(
                            "flex gap-3 max-w-3xl",
                            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.role === 'user' ? "bg-blue-600" : "bg-emerald-600"
                        )}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={clsx(
                            "p-3 rounded-lg text-sm",
                            msg.role === 'user'
                                ? "bg-blue-600/20 border border-blue-600/50"
                                : "bg-neutral-800 border border-neutral-700"
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="flex items-center gap-2 text-neutral-500 text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Thinking...
                        </div>
                    </div>
                )}
                {error && (
                    <div className="p-3 bg-red-900/20 border border-red-500/50 text-red-200 rounded text-sm text-center">
                        Error: {error}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-800 bg-neutral-900">
                <div className="relative max-w-4xl mx-auto flex gap-2">
                    {/* Voice Input */}
                    {isSpeechSupported && (
                        <VoiceInput
                            isListening={isListening}
                            onToggle={isListening ? stopListening : startListening}
                        />
                    )}

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isListening ? "Listening..." : "Type your question..."}
                        className="flex-1 bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={isLoading || isListening}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-2 bg-emerald-600 rounded-full hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>

            <VoiceModeOverlay
                isOpen={isVoiceMode}
                onClose={toggleVoiceMode}
                transcript={isListening ? transcript : (isSpeaking ? "Speaking..." : "")}
                isListening={isListening || isSpeaking}
            />
        </div>
    );
}
