import { renderHook, act } from '@testing-library/react';
import { useTextToSpeech } from '../../src/hooks/use-text-to-speech';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockSpeak = vi.fn();
const mockCancel = vi.fn();
const mockGetVoices = vi.fn().mockReturnValue([]);

// Mock class for SpeechSynthesisUtterance
class MockSpeechSynthesisUtterance {
    text: string;
    lang: string = '';
    volume: number = 1;
    rate: number = 1;
    pitch: number = 1;
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onerror: ((event: unknown) => void) | null = null;
    voice: SpeechSynthesisVoice | null = null;

    constructor(text: string) {
        this.text = text;
    }
    addEventListener = vi.fn();
}

describe('useTextToSpeech', () => {
    let originalSpeechSynthesis: unknown;
    let originalSpeechSynthesisUtterance: unknown;

    beforeEach(() => {
        originalSpeechSynthesis = window.speechSynthesis;
        originalSpeechSynthesisUtterance = (window as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance;

        // Mock window.speechSynthesis
        Object.defineProperty(window, 'speechSynthesis', {
            value: {
                speak: mockSpeak,
                cancel: mockCancel,
                getVoices: mockGetVoices,
                paused: false,
                pending: false,
                speaking: false,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                onvoiceschanged: null,
            },
            writable: true
        });

        // Mock SpeechSynthesisUtterance
        (window as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

        vi.clearAllMocks();
    });

    afterEach(() => {
        // Restore original
        if (originalSpeechSynthesis) {
            Object.defineProperty(window, 'speechSynthesis', { value: originalSpeechSynthesis });
        }
        (window as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = originalSpeechSynthesisUtterance;
    });

    it('should initialize with default state', () => {
        const { result } = renderHook(() => useTextToSpeech());
        expect(result.current.isSpeaking).toBe(false);
        expect(result.current.isSupported).toBe(true);
    });

    it('should speak text', () => {
        const { result } = renderHook(() => useTextToSpeech());

        act(() => {
            result.current.speak('Hello World');
        });

        expect(mockSpeak).toHaveBeenCalled();
        // Since we are using a class now, we check if the mock implementation (the class) was instantiated.
        // But vitest doesn't easily spy on class instantiation unless we wrap it.
        // However, mockSpeak is called with an instance of MockSpeechSynthesisUtterance, so we can check that.
        expect(mockSpeak.mock.calls[0][0]).toBeInstanceOf(MockSpeechSynthesisUtterance);
        expect(mockSpeak.mock.calls[0][0].text).toBe('Hello World');
    });

    it('should cancel speech', () => {
        const { result } = renderHook(() => useTextToSpeech());

        act(() => {
            result.current.cancel();
        });

        expect(mockCancel).toHaveBeenCalled();
    });
});
