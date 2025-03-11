'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PortfolioItem, PortfolioItemTag } from '@/lib/constants/Portfolio.Constants';
import PortfolioWaterfallItem from './PortfolioWaterfallItem';
import { cn } from '@/lib/utils';

// Define the preferred order of tags for better visual distribution
const TAG_ORDER = [
    'Python',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Shadcn UI',
    'PostgreSQL',
    'Drizzle',
    'Selenium',
    'Stripe',
];

interface PortfolioWaterfallProps {
    items: PortfolioItem[];
    tags?: PortfolioItemTag[];
}

export default function PortfolioWaterfall({ items, tags = [] }: PortfolioWaterfallProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(items);
    const [filterVisible, setFilterVisible] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Filter items when selected tags change
    useEffect(() => {
        if (selectedTags.length > 0) {
            setFilteredItems(items.filter((item) => item.tags.some((tag) => selectedTags.includes(tag.name))));
        } else {
            setFilteredItems(items);
        }
    }, [selectedTags, items]);

    // Animation for filter section
    useEffect(() => {
        // Check if filter section is already in viewport
        const checkInitialVisibility = () => {
            if (filterRef.current) {
                const rect = filterRef.current.getBoundingClientRect();
                const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;

                if (isInViewport) {
                    setFilterVisible(true);
                    return true;
                }
            }
            return false;
        };

        // If not already visible, set up the observer
        if (!checkInitialVisibility()) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setFilterVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 }
            );

            if (filterRef.current) {
                observer.observe(filterRef.current);
            }

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    // Get unique tags from items for the filter
    let uniqueTags =
        tags.length > 0
            ? tags
            : Array.from(new Set(items.flatMap((item) => item.tags.map((tag) => tag.name)))).map((tagName) => {
                  const foundTag = items.flatMap((item) => item.tags).find((tag) => tag.name === tagName);
                  return foundTag as PortfolioItemTag;
              });

    // Sort tags according to the defined order
    uniqueTags = uniqueTags.sort((a, b) => {
        const indexA = TAG_ORDER.indexOf(a.name);
        const indexB = TAG_ORDER.indexOf(b.name);

        // If both tags are in the order array, sort by their position
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }

        // If only one tag is in the order array, prioritize it
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;

        // If neither tag is in the order array, sort alphabetically
        return a.name.localeCompare(b.name);
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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Controls */}
            {uniqueTags.length > 0 && (
                <div
                    ref={filterRef}
                    className={cn(
                        'mb-12 transform transition-all duration-500 ease-out',
                        !filterVisible && 'opacity-0 -translate-y-12',
                        filterVisible && 'opacity-100 translate-y-0'
                    )}>
                    <div className="flex flex-wrap items-center gap-2 justify-center">
                        <button
                            onClick={() => setSelectedTags([])}
                            className={cn(
                                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                                // When no tags are selected, "All" is considered selected
                                selectedTags.length === 0
                                    ? 'bg-primary text-st_darkest ring-2 ring-st_white'
                                    : 'bg-st_darkest text-primary hover:bg-primary hover:text-st_darkest'
                            )}>
                            All
                        </button>

                        {uniqueTags.map((tag, index) => {
                            const isSelected = selectedTags.includes(tag.name);

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleTagToggle(tag.name)}
                                    className={cn(
                                        'group flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                                        // Use selected colors when selected, otherwise use base colors
                                        isSelected ? tag.bgSelectedColor : tag.bgColor,
                                        isSelected ? tag.textSelectedColor : tag.textColor,
                                        // Only apply hover effects when not selected
                                        !isSelected && tag.bgHoverColor,
                                        !isSelected && tag.textHoverColor,
                                        // Add a subtle shadow or border when selected
                                        isSelected && 'ring-2 ring-st_white'
                                    )}>
                                    <span className={cn('size-3.5 transition-colors duration-200')}>{tag.icon}</span>
                                    <span>{tag.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Filter status message - always shown */}
                    <div className="mt-4 text-center text-sm">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {selectedTags.length === 0 ? (
                                <span className="text-st_light leading-6">Showing all projects</span>
                            ) : (
                                <>
                                    <span className="text-st_light leading-6">Showing projects with: </span>
                                    {selectedTags.map((tagName, index) => {
                                        const tag = uniqueTags.find((t) => t.name === tagName);
                                        if (!tag) return null;

                                        return (
                                            <span
                                                key={index}
                                                className={cn(
                                                    'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
                                                    tag.bgSelectedColor,
                                                    tag.textSelectedColor
                                                )}>
                                                <span className={'size-3'}>{tag.icon}</span>
                                                {tagName}
                                            </span>
                                        );
                                    })}
                                    <button
                                        onClick={() => setSelectedTags([])}
                                        className="ml-2 text-primary hover:text-primary_dark underline text-xs">
                                        Clear all
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Portfolio Waterfall */}
            <div className="flex flex-col space-y-16">
                {filteredItems.map((item, index) => (
                    <div key={item.title} className="overflow-hidden">
                        <PortfolioWaterfallItem item={item} index={index} />
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center opacity-80 animate-fadeIn">
                    <h3 className="text-xl font-medium text-st_lightest mb-2">No projects found</h3>
                    <p className="text-st_light">Try selecting a different filter or check back later.</p>
                </div>
            )}
        </div>
    );
}
