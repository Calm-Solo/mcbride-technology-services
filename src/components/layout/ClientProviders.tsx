'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

type ClientProvidersProps = {
    children: React.ReactNode;
};

/**
 * ClientProviders component that wraps the application with client-side providers
 * This includes toast notifications and may include other providers in the future
 */
export default function ClientProviders({ children }: ClientProvidersProps) {
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
