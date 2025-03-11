'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const LampContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    // Add state to track if component is mounted
    const [isMounted, setIsMounted] = useState(false);

    // Set mounted state on component mount
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    return (
        <div
            className={cn('relative flex min-h-fit flex-col items-center justify-center overflow-hidden w-full rounded-md z-0', className)}>
            <div className="relative flex h-full w-full flex-1 items-center justify-center z-0 ">
                <AnimatePresence>
                    {isMounted && (
                        <>
                            <motion.div
                                key="lamp-glow-1"
                                initial={{ opacity: 0.5, width: '15rem' }}
                                animate={{ opacity: 1, width: '30rem' }}
                                exit={{ opacity: 0, width: '15rem' }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.8,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                                }}
                                className="absolute right-1/2 overflow-visible w-[30rem] bg-gradient-conic from-primary via-transparent to-transparent text-white ">
                                <div className="absolute w-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                                <div className="absolute w-40 h-[100%] left-0 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                            </motion.div>
                            <motion.div
                                key="lamp-glow-2"
                                initial={{ opacity: 0.5, width: '15rem' }}
                                animate={{ opacity: 1, width: '30rem' }}
                                exit={{ opacity: 0, width: '15rem' }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.8,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                                }}
                                className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-primary text-white [--conic-position:from_290deg_at_center_top]">
                                <div className="absolute w-40 h-[100%] right-0 bg-st bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                                <div className="absolute w-[100%] right-0 bg-st h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                            </motion.div>
                            <div className="absolute top-1/2 h-48 w-full translate-y-4 scale-x-150 bg-st blur-2xl"></div>
                            <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                            <div className="absolute inset-auto z-50 h-36 w-[28rem] rounded-full bg-primary opacity-50 blur-3xl"></div>
                            <motion.div
                                key="lamp-glow-3"
                                initial={{ width: '8rem' }}
                                animate={{ width: '16rem' }}
                                exit={{ width: '8rem' }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.8,
                                    ease: 'easeInOut',
                                }}
                                className="absolute inset-auto z-30 h-36 w-64  rounded-full bg-primary_light blur-2xl"></motion.div>
                            <motion.div
                                key="lamp-line"
                                initial={{ width: '15rem' }}
                                animate={{ width: '30rem' }}
                                exit={{ width: '15rem' }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.8,
                                    ease: 'easeInOut',
                                }}
                                className="absolute inset-auto z-50 h-0.5 w-[30rem]  bg-primary_light"></motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="absolute inset-auto z-40 h-full w-full  bg-st"></div>
            </div>

            <div className="relative z-50 flex flex-col items-center px-5">{children}</div>
        </div>
    );
};
