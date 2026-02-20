import { renderHook, act, waitFor } from '@testing-library/react';
import { useSpeechRecognition } from '../../src/hooks/use-speech-recognition';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock window.SpeechRecognition
const mockStart = vi.fn();
const mockStop = vi.fn();
const mockAbort = vi.fn();

// We need a way to access the current instance to trigger events

class MockSpeechRecognition {
    start = vi.fn().mockImplementation(function (this: MockSpeechRecognition) {
        mockStart();
        // Async trigger to simulate real behavior
        setTimeout(() => {
            if (this.onstart) this.onstart();
        }, 0);
    });
    stop = vi.fn().mockImplementation(function (this: MockSpeechRecognition) {
        mockStop();
        setTimeout(() => {
            if (this.onend) this.onend();
        }, 0);
    });
    abort = mockAbort;
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onresult: ((event: unknown) => void) | null = null;
    onerror: ((event: unknown) => void) | null = null;
    lang: string = '';
    continuous: boolean = false;
    interimResults: boolean = false;

    constructor() {
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }
}

describe('useSpeechRecognition', () => {
    let originalSpeechRecognition: unknown;
    let originalWebkitSpeechRecognition: unknown;

    beforeEach(() => {
        originalSpeechRecognition = (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition;
        originalWebkitSpeechRecognition = (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;
        (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition = MockSpeechRecognition;
        (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition = MockSpeechRecognition;
        vi.clearAllMocks();
    });

    afterEach(() => {
        (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition = originalSpeechRecognition;
        (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition = originalWebkitSpeechRecognition;
    });

    it('should initialize with failed support if browser does not support SpeechRecognition', () => {
        delete (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition;
        delete (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition;

        const { result } = renderHook(() => useSpeechRecognition());
        expect(result.current.isSupported).toBe(false);
    });

    it('should initialize with supported state', () => {
        const { result } = renderHook(() => useSpeechRecognition());
        expect(result.current.isSupported).toBe(true);
        expect(result.current.isListening).toBe(false);
    });

    it('should start listening', async () => {
        const { result } = renderHook(() => useSpeechRecognition());

        await act(async () => {
            result.current.startListening();
        });

        expect(mockStart).toHaveBeenCalled();

        // Wait for the async state update
        await waitFor(() => {
            expect(result.current.isListening).toBe(true);
        });
    });

    it('should stop listening', async () => {
        const { result } = renderHook(() => useSpeechRecognition());

        await act(async () => {
            result.current.startListening();
        });

        await waitFor(() => {
            expect(result.current.isListening).toBe(true);
        });

        await act(async () => {
            result.current.stopListening();
        });

        expect(mockStop).toHaveBeenCalled();

        await waitFor(() => {
            expect(result.current.isListening).toBe(false);
        });
    });
});
