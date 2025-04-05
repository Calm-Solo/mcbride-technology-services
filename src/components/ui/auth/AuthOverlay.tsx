'use client';

import { SignIn } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface AuthOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    afterSignInUrl?: string;
}

export function AuthOverlay({ isOpen, onClose, afterSignInUrl = '/dashboard' }: AuthOverlayProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors">
                            <FiX className="h-5 w-5" />
                        </button>
                        <SignIn
                            afterSignInUrl={afterSignInUrl}
                            routing="hash"
                            appearance={{
                                elements: {
                                    rootBox: 'mx-auto',
                                    card: 'bg-transparent shadow-none',
                                    headerTitle: 'text-gray-900 dark:text-white',
                                    headerSubtitle: 'text-gray-500 dark:text-gray-400',
                                    formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
                                    formFieldInput: 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600',
                                    formFieldLabel: 'text-gray-700 dark:text-gray-300',
                                    footerActionLink: 'text-blue-500 hover:text-blue-600',
                                },
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
