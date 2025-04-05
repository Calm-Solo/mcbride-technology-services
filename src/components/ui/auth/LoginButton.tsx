'use client';

import { useState } from 'react';
import { AuthOverlay } from './AuthOverlay';
import { useUser } from '@clerk/nextjs';

interface LoginButtonProps {
    className?: string;
    afterSignInUrl?: string;
}

export function LoginButton({ className, afterSignInUrl = '/' }: LoginButtonProps) {
    const [showAuth, setShowAuth] = useState(false);
    const { isSignedIn, user } = useUser();

    if (isSignedIn && user) {
        return (
            <button className={`px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors ${className}`}>
                {user.firstName || 'Account'}
            </button>
        );
    }

    return (
        <>
            <button
                onClick={() => setShowAuth(true)}
                className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors ${className}`}>
                Sign In
            </button>

            <AuthOverlay isOpen={showAuth} onClose={() => setShowAuth(false)} afterSignInUrl={afterSignInUrl} />
        </>
    );
}
