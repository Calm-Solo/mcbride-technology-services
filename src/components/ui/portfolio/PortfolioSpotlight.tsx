'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
    return (
        <LampContainer className="">
            <div className="relative z-50 flex flex-col items-center px-5 lg:px-10 w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    className="w-full max-w-4xl mt-16 overflow-hidden rounded-xl bg-st_dark/70 backdrop-blur-sm p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="relative flex-shrink-0 w-full lg:w-1/2 aspect-video rounded-lg overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
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
                                            'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                                            tag.bgColor,
                                            tag.textColor
                                        )}>
                                        <span className="size-3.5">{tag.icon}</span>
                                        <span>{tag.name}</span>
                                    </span>
                                ))}
                            </div>

                            <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 self-start rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary_dark">
                                <span>View Project</span>
                                <ExternalLink size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </LampContainer>
    );
}
