import { useState } from 'react';
import { ChatMessage, TutorRequest, TutorResponse } from '../types/tutor';

export const useTutor = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (content: string) => {
        setIsLoading(true);
        setError(null);

        const userMessage: ChatMessage = { role: 'user', content, timestamp: Date.now() };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutor/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'user-1', // Hardcoded for MVP
                    sessionId: 'session-1',
                    message: content
                } as TutorRequest)
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data: TutorResponse = await response.json();

            const botMessage: ChatMessage = {
                role: 'assistant',
                content: data.content,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, sendMessage, isLoading, error };
};
