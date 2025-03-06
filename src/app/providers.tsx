'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'react-tooltip/dist/react-tooltip.css';

interface RootProviderProps {
    children: React.ReactNode;
}

/**
 * Root provider component for the application
 * Currently includes toast notifications and tooltip styles
 * Future providers (authentication, state management, etc.) will be added here
 */
export function RootProvider({ children }: RootProviderProps) {
    return (
        <>
            {children}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#1F2937',
                        color: '#F9FAFB',
                        border: '1px solid #57cc99',
                    },
                    success: {
                        iconTheme: {
                            primary: '#57cc99',
                            secondary: '#F9FAFB',
                        },
                    },
                }}
            />
        </>
    );
}
