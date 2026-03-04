
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./test/setup.ts'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@ais/material/MaterialComponents': path.resolve(__dirname, './test/__mocks__/MaterialComponents.ts'),
        }
    },
});
