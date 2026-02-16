'use client';

import { useState, useRef, useEffect } from 'react';
import { useTutor } from '../hooks/use-tutor';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export default function ChatWindow() {
    const { messages, sendMessage, isLoading, error } = useTutor();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage(input);
        setInput('');
    };

    return (
        <div className="flex flex-col h-screen bg-neutral-900 text-neutral-100">
            <header className="p-4 border-b border-neutral-800 flex items-center gap-2">
                <Bot className="w-6 h-6 text-emerald-400" />
                <h1 className="text-xl font-bold">AI Tutor Droid</h1>
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
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        disabled={isLoading}
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
        </div>
    );
}
