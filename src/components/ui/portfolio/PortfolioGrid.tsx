'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem, PortfolioItemTag } from '@/lib/constants/Portfolio.Constants';
import PortfolioCard from './PortfolioCard';
import { cn } from '@/lib/utils';

interface PortfolioGridProps {
    items: PortfolioItem[];
    tags?: PortfolioItemTag[];
}

export default function PortfolioGrid({ items, tags = [] }: PortfolioGridProps) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(items);

    // Filter items when selected tag changes
    useEffect(() => {
        if (selectedTag) {
            setFilteredItems(items.filter((item) => item.tags.some((tag) => tag.name === selectedTag)));
        } else {
            setFilteredItems(items);
        }
    }, [selectedTag, items]);

    // Get unique tags from items for the filter
    const uniqueTags =
        tags.length > 0
            ? tags
            : Array.from(new Set(items.flatMap((item) => item.tags.map((tag) => tag.name)))).map((tagName) => {
                  const foundTag = items.flatMap((item) => item.tags).find((tag) => tag.name === tagName);
                  return foundTag as PortfolioItemTag;
              });

    return (
        <div className="w-full">
            {/* Filter Controls */}
            {uniqueTags.length > 0 && (
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 justify-center">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={cn(
                                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                                selectedTag === null ? 'bg-primary text-white' : 'bg-st_dark text-st_white hover:bg-st_light'
                            )}>
                            All
                        </button>

                        {uniqueTags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedTag(tag.name)}
                                className={cn(
                                    'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                                    selectedTag === tag.name ? [tag.bgColor, tag.textColor] : 'bg-st_dark text-st_white hover:bg-st_light'
                                )}>
                                <span className="size-3.5">{tag.icon}</span>
                                <span>{tag.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Portfolio Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <PortfolioCard item={item} index={index} />
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty state */}
            {filteredItems.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center">
                    <h3 className="text-xl font-medium text-st_lightest mb-2">No projects found</h3>
                    <p className="text-st_light">Try selecting a different filter or check back later.</p>
                </motion.div>
            )}
        </div>
    );
}
