'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { X, User as UserIcon } from 'lucide-react';
import { ClerkTransformedUser } from '@/types/clerk';

interface UserDetailsOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    user: ClerkTransformedUser | null;
    loading: boolean;
}

export function UserDetailsOverlay({ isOpen, onClose, user, loading }: UserDetailsOverlayProps) {
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
                        className="relative w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg border border-st bg-st_dark shadow-xl">
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-st_dark border-b border-st">
                            <div className="font-bold text-lg text-st_white">
                                {user ? `User: ${user.first_name} ${user.last_name}` : 'User Details'}
                            </div>
                            <button onClick={onClose} className="text-st_white hover:text-st_white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-64 p-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary_dark"></div>
                                    <p className="text-st_light">Loading user details...</p>
                                </div>
                            </div>
                        ) : !user ? (
                            <div className="flex justify-center items-center h-64 p-4">
                                <p className="text-st_light">No user details available</p>
                            </div>
                        ) : (
                            <div className="p-4 space-y-6">
                                {/* User Information */}
                                <Card className="p-4">
                                    <h4 className="text-md font-medium text-primary_dark mb-2 flex items-center gap-2">
                                        <UserIcon className="w-5 h-5" />
                                        User Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-st_light">User ID:</span>
                                                <p className="text-st_white">{user.id}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-st_light">Clerk ID:</span>
                                                <p className="text-st_white">{user.clerk_id}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-st_light">Email:</span>
                                                <p className="text-st_white">{user.email}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-st_light">Name:</span>
                                                <p className="text-st_white">{`${user.first_name || ''} ${user.last_name || ''}`}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-st_light">Username:</span>
                                                <p className="text-st_white">{user.username || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm text-st_light">Registration Date:</span>
                                                <p className="text-st_white">{new Date(user.created_at).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-st_light">Last Updated:</span>
                                                <p className="text-st_white">{new Date(user.updated_at).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-st_light">Last Sign In:</span>
                                                <p className="text-st_white">{new Date(user.last_sign_in).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
