import { renderHook, act, waitFor } from '@testing-library/react';
import { useSpeechRecognition } from '../../src/hooks/use-speech-recognition';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock window.SpeechRecognition
const mockStart = vi.fn();
const mockStop = vi.fn();
const mockAbort = vi.fn();

// We need a way to access the current instance to trigger events
let currentRecognitionInstance: any = null;

class MockSpeechRecognition {
    start = vi.fn().mockImplementation(function (this: any) {
        mockStart();
        // Async trigger to simulate real behavior
        setTimeout(() => {
            if (this.onstart) this.onstart();
        }, 0);
    });
    stop = vi.fn().mockImplementation(function (this: any) {
        mockStop();
        setTimeout(() => {
            if (this.onend) this.onend();
        }, 0);
    });
    abort = mockAbort;
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onresult: ((event: any) => void) | null = null;
    onerror: ((event: any) => void) | null = null;
    lang: string = '';
    continuous: boolean = false;
    interimResults: boolean = false;

    constructor() {
        currentRecognitionInstance = this;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }
}

describe('useSpeechRecognition', () => {
    let originalSpeechRecognition: any;
    let originalWebkitSpeechRecognition: any;

    beforeEach(() => {
        originalSpeechRecognition = window.SpeechRecognition;
        originalWebkitSpeechRecognition = window.webkitSpeechRecognition;
        window.SpeechRecognition = MockSpeechRecognition as any;
        window.webkitSpeechRecognition = MockSpeechRecognition as any;
        vi.clearAllMocks();
        currentRecognitionInstance = null;
    });

    afterEach(() => {
        window.SpeechRecognition = originalSpeechRecognition;
        window.webkitSpeechRecognition = originalWebkitSpeechRecognition;
    });

    it('should initialize with failed support if browser does not support SpeechRecognition', () => {
        delete (window as any).SpeechRecognition;
        delete (window as any).webkitSpeechRecognition;

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
