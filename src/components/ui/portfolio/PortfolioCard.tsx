'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortfolioItem, PortfolioItemTag } from '@/lib/constants/Portfolio.Constants';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PortfolioCardProps {
    item: PortfolioItem;
    index: number;
}

export default function PortfolioCard({ item, index }: PortfolioCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-lg bg-st_dark shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-st_darkest/90 to-transparent transition-opacity duration-300" />
            </div>

            <div className="relative p-6">
                <h3 className="text-2xl font-semibold text-primary group-hover:text-primary_light">{item.title}</h3>
                <p className="mt-2 text-st_white">{item.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                        <TagBadge key={tagIndex} tag={tag} />
                    ))}
                </div>

                <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-primary transition-colors hover:text-primary_light">
                    <span>Visit Project</span>
                    <ExternalLink size={16} />
                </Link>
            </div>
        </motion.div>
    );
}

function TagBadge({ tag }: { tag: PortfolioItemTag }) {
    // Extract the base classes without the hover: prefix
    const bgColor = tag.bgColor;
    const textColor = tag.textColor;
    const iconColor = tag.iconColor;

    // Extract hover classes - these already include the hover: prefix
    const bgHoverClass = tag.bgHoverColor;
    const textHoverClass = tag.textHoverColor;
    const iconHoverClass = tag.iconHoverColor.replace('group-hover:', ''); // Remove group-hover: prefix if present

    return (
        <div
            className={cn(
                'group flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                bgColor,
                textColor,
                bgHoverClass,
                textHoverClass
            )}>
            <span className={cn('size-3.5 transition-colors duration-200', iconColor, `group-hover:${iconHoverClass}`)}>{tag.icon}</span>
            <span>{tag.name}</span>
        </div>
    );
}
