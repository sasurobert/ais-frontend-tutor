import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseTextToSpeechResult {
    speak: (text: string) => void;
    cancel: () => void;
    isSpeaking: boolean;
    isSupported: boolean;
    voices: SpeechSynthesisVoice[];
}

export const useTextToSpeech = (): UseTextToSpeechResult => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported] = useState(() => typeof window !== 'undefined' && !!window.speechSynthesis);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {

            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);
            };

            loadVoices();

            if (window.speechSynthesis.onvoiceschanged !== undefined) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
            }
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (!isSupported) return;

        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Select an English voice if available (prefer Google US English or similar)
        // Ideally we let user select, but for now we pick a reasonable default
        const preferredVoice = voices.find(v => v.lang.includes('en-US')) || voices[0];
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => {
            console.error('TTS Error', e);
            setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
    }, [isSupported, voices]);

    const cancel = useCallback(() => {
        if (!isSupported) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, [isSupported]);

    return {
        speak,
        cancel,
        isSpeaking,
        isSupported,
        voices
    };
};
