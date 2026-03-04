/**
 * Mock @ais/material/MaterialComponents for test environment.
 * The actual material components are in a monorepo package not available in test isolation.
 */
import React from 'react';

export const MaterialTextButton = ({ children, onClick, ...props }: any) =>
    React.createElement('button', { 'data-testid': 'material-text-btn', onClick, ...props }, children);

export const MaterialFilledButton = ({ children, onClick, ...props }: any) =>
    React.createElement('button', { 'data-testid': 'material-filled-btn', onClick, ...props }, children);
