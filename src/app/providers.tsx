'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import 'react-tooltip/dist/react-tooltip.css';
import { ClerkProvider } from '@clerk/nextjs';

interface RootProviderProps {
    children: React.ReactNode;
}

/**
 * Root provider component for the application
 * Includes Clerk authentication, toast notifications, and tooltip styles
 */
export function RootProvider({ children }: RootProviderProps) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: undefined,
                variables: { colorPrimary: '#57cc99' },
                layout: { shimmer: true },
            }}>
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
        </ClerkProvider>
    );
}
