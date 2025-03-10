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
        <Link href={item.link} target="_blank" rel="noopener noreferrer">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group/portfolio-card relative overflow-hidden rounded-lg bg-st shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-st_light">
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/portfolio-card:scale-105 p-1 rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="group-hover/portfolio-card:opacity-0 opacity-100 absolute inset-0 bg-gradient-to-t from-st_darkest/90 to-transparent transition-opacity duration-300" />
                </div>

                <div className="relative p-6 flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold text-primary group-hover/portfolio-card:text-primary_light">{item.title}</h3>
                    <p className=" text-st_white min-h-[48px]">{item.description}</p>

                    <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, tagIndex) => (
                            <TagBadge key={tagIndex} tag={tag} />
                        ))}
                    </div>

                    <div
                        className={
                            `inline-flex w-fit px-4 py-2 rounded-lg items-center gap-2 text-primary border border-primary transition-colors hover:!text-st_darkest hover:bg-primary_light ` +
                            `group-hover/portfolio-card:border-primary_light group-hover/portfolio-card:text-primary_light`
                        }>
                        <span>Visit Project</span>
                        <ExternalLink size={16} />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

function TagBadge({ tag }: { tag: PortfolioItemTag }) {
    return (
        <div
            className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                tag.bgColor,
                tag.textColor,
                tag.bgHoverColor,
                tag.textHoverColor
            )}>
            <span className={cn('size-3.5 transition-colors duration-200')}>{tag.icon}</span>
            <span>{tag.name}</span>
        </div>
    );
}
