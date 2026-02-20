import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseSpeechRecognitionResult {
    isListening: boolean;
    transcript: string;
    startListening: () => void;
    stopListening: () => void;
    resetTranscript: () => void;
    isSupported: boolean;
    error: string | null;
}

export const useSpeechRecognition = (): UseSpeechRecognitionResult => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isSupported] = useState(() =>
        typeof window !== 'undefined' &&
        !!((window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
            (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition)
    );
    const [error, setError] = useState<string | null>(null);

    // Use a ref to store the recognition instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check browser support
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any };
        const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                setError(null);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onresult = (event: { resultIndex: number; results: { isFinal: boolean;[key: number]: { transcript: string } }[] }) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    setTranscript(prev => prev + ' ' + finalTranscript);
                }
            };

            recognition.onerror = (event: { error: string }) => {
                console.error('Speech recognition error', event.error);
                setError(event.error);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        } else {
            setTimeout(() => {
                setError('Browser not supported');
            }, 0);
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch {
                    // Ignore errors on cleanup
                }
            }
        };
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.error('Failed to start recognition', e);
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            try {
                recognitionRef.current.stop();
            } catch (e) {
                console.error('Failed to stop recognition', e);
            }
        }
    }, [isListening]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    return {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        isSupported,
        error
    };
};
