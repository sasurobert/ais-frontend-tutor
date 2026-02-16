import { render, screen, fireEvent } from '@testing-library/react';
import { VoiceModeOverlay } from '../../src/components/voice/VoiceModeOverlay';
import { describe, it, expect, vi } from 'vitest';

describe('VoiceModeOverlay', () => {
    it('should not render when isOpen is false', () => {
        const { container } = render(<VoiceModeOverlay isOpen={false} onClose={() => { }} transcript="" isListening={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render when isOpen is true', () => {
        render(<VoiceModeOverlay isOpen={true} onClose={() => { }} transcript="Testing" isListening={true} />);
        expect(screen.getByText('Listening...')).toBeDefined();
        // Check for transcript if provided
        expect(screen.getByText('Testing')).toBeDefined();
    });

    it('should call onClose when close button clicked', () => {
        const mockClose = vi.fn();
        render(<VoiceModeOverlay isOpen={true} onClose={mockClose} transcript="" isListening={true} />);

        // Find close button (maybe by label or icon)
        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);
        expect(mockClose).toHaveBeenCalled();
    });
});
