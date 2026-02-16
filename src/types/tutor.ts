export interface TutorRequest {
    userId: string;
    sessionId: string;
    message: string;
}

export interface TutorResponse {
    content: string;
    metadata?: {
        topic?: string;
        progress?: number;
        sentiment?: string;
    };
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}
