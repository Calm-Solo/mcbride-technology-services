'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LampContainer } from '@/components/ui/Lamp';
import { PortfolioItem } from '@/lib/constants/Portfolio.Constants';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioSpotlightProps {
    item: PortfolioItem;
}

export default function PortfolioSpotlight({ item }: PortfolioSpotlightProps) {
    // Add state to track if component is mounted - this helps with client-side navigation
    const [isMounted, setIsMounted] = useState(false);

    // Set mounted state on component mount
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    return (
        <LampContainer className="">
            <div className="relative z-50 flex flex-col items-center px-5 lg:px-10 w-full max-w-5xl">
                <AnimatePresence>
                    {isMounted && (
                        <motion.div
                            key="spotlight-content"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                                delay: 0.2,
                                duration: 0.8,
                                ease: 'easeInOut',
                            }}
                            className="group/spotlight w-full max-w-4xl mt-16 overflow-hidden rounded-xl bg-st_light hover:bg-st backdrop-blur-sm p-4">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="relative flex-shrink-0 w-full lg:w-1/2 aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover/spotlight:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <h2 className="text-3xl font-bold bg-gradient-to-br from-primary to-primary_light bg-clip-text text-transparent mb-4">
                                        {item.title}
                                    </h2>

                                    <p className="text-st_white mb-6">{item.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {item.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className={cn(
                                                    'group inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                                                    tag.bgColor,
                                                    tag.textColor,
                                                    tag.bgHoverColor,
                                                    tag.textHoverColor
                                                )}>
                                                <span className={cn('size-3.5 transition-colors duration-200')}>{tag.icon}</span>
                                                <span>{tag.name}</span>
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-fit px-4 py-2 rounded-lg items-center gap-2 text-primary border border-primary transition-colors hover:text-st_darkest hover:bg-primary_light">
                                        <span>View Project</span>
                                        <ExternalLink size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </LampContainer>
    );
}
