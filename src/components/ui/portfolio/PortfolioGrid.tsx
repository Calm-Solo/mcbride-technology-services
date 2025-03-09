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
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(items);

    // Filter items when selected tags change
    useEffect(() => {
        if (selectedTags.length > 0) {
            setFilteredItems(items.filter((item) => item.tags.some((tag) => selectedTags.includes(tag.name))));
        } else {
            setFilteredItems(items);
        }
    }, [selectedTags, items]);

    // Get unique tags from items for the filter
    const uniqueTags =
        tags.length > 0
            ? tags
            : Array.from(new Set(items.flatMap((item) => item.tags.map((tag) => tag.name)))).map((tagName) => {
                  const foundTag = items.flatMap((item) => item.tags).find((tag) => tag.name === tagName);
                  return foundTag as PortfolioItemTag;
              });

    const handleTagToggle = (tagName: string) => {
        setSelectedTags((prev) => {
            // If tag is already selected, remove it
            if (prev.includes(tagName)) {
                return prev.filter((t) => t !== tagName);
            }
            // Otherwise add it
            return [...prev, tagName];
        });
    };

    return (
        <div className="w-full">
            {/* Filter Controls */}
            {uniqueTags.length > 0 && (
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 justify-center">
                        <button
                            onClick={() => setSelectedTags([])}
                            className={cn(
                                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                                selectedTags.length === 0 ? 'bg-primary text-white' : 'bg-st_dark text-st_white hover:bg-st_light'
                            )}>
                            All
                        </button>

                        {uniqueTags.map((tag, index) => {
                            const isSelected = selectedTags.includes(tag.name);

                            // Extract the base classes
                            const bgColor = isSelected ? tag.bgColor : 'bg-st_dark';
                            const textColor = isSelected ? tag.textColor : 'text-st_white';
                            const iconColor = isSelected ? tag.iconColor : 'text-st_white';

                            // Extract hover classes - these already include the hover: prefix
                            const bgHoverClass = isSelected ? tag.bgHoverColor : 'hover:bg-st_light';
                            const textHoverClass = isSelected ? tag.textHoverColor : '';
                            const iconHoverClass = isSelected ? tag.iconHoverColor.replace('group-hover:', '') : '';

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleTagToggle(tag.name)}
                                    className={cn(
                                        'group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                                        bgColor,
                                        textColor,
                                        bgHoverClass,
                                        textHoverClass
                                    )}>
                                    <span
                                        className={cn(
                                            'size-3.5 transition-colors duration-200',
                                            iconColor,
                                            isSelected ? `group-hover:${iconHoverClass}` : ''
                                        )}>
                                        {tag.icon}
                                    </span>
                                    <span>{tag.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected tags summary */}
                    {selectedTags.length > 0 && (
                        <div className="mt-4 text-center text-sm text-st_light">
                            <span>Showing projects with: </span>
                            {selectedTags.map((tag, index) => (
                                <span key={index} className="font-medium text-primary">
                                    {tag}
                                    {index < selectedTags.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>
                    )}
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
