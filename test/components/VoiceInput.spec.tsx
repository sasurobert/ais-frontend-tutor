import { render, screen, fireEvent } from '@testing-library/react';
import { VoiceInput } from '../../src/components/voice/VoiceInput';
import { describe, it, expect, vi } from 'vitest';

describe('VoiceInput', () => {
    it('should render microphone icon in idle state', () => {
        render(<VoiceInput isListening={false} onToggle={() => { }} />);
        // Assuming we use aria-label or specific icon
        expect(screen.getByRole('button')).toBeDefined();
    });

    it('should call onToggle when clicked', () => {
        const mockToggle = vi.fn();
        render(<VoiceInput isListening={false} onToggle={mockToggle} />);

        fireEvent.click(screen.getByRole('button'));
        expect(mockToggle).toHaveBeenCalled();
    });

    it('should show listening state', () => {
        render(<VoiceInput isListening={true} onToggle={() => { }} />);
        // Check for active class or visual indicator
        const button = screen.getByRole('button');
        // We'll rely on class checking or aria-pressed
        expect(button.getAttribute('aria-pressed')).toBe('true');
    });
});
