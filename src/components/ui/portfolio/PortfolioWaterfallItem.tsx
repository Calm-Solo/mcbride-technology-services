'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortfolioItem, PortfolioItemTag } from '@/lib/constants/Portfolio.Constants';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PortfolioWaterfallItemProps {
    item: PortfolioItem;
    index: number;
}

export default function PortfolioWaterfallItem({ item, index }: PortfolioWaterfallItemProps) {
    // Determine if this item should have the image on the left or right
    const isEven = index % 2 === 0;
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if element is already in viewport when component mounts
        const checkInitialVisibility = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const isInViewport = rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;

                if (isInViewport) {
                    // If already in viewport, make it visible immediately
                    setIsVisible(true);
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
                        setIsVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.2 }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return (
        <Link href={item.link} target="_blank" rel="noopener noreferrer">
            <div
                ref={ref}
                className={cn(
                    'group/portfolio-item relative overflow-hidden rounded-lg bg-st shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-st_light mb-16',
                    'transform transition-all duration-700 ease-out',
                    !isVisible && 'opacity-0',
                    !isVisible && (isEven ? '-translate-x-96' : 'translate-x-96'),
                    isVisible && 'opacity-100 translate-x-0'
                )}>
                <div className={cn('flex flex-col md:flex-row items-center gap-6 p-6', !isEven && 'md:flex-row-reverse')}>
                    {/* Image Side */}
                    <div className="relative aspect-video w-full md:w-1/2 overflow-hidden rounded-lg">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/portfolio-item:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="group-hover/portfolio-item:opacity-0 opacity-100 absolute inset-0 bg-gradient-to-t from-st_darkest/60 to-transparent transition-opacity duration-300" />
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <h3 className="text-2xl md:text-3xl font-semibold text-primary group-hover/portfolio-item:text-primary_light">
                            {item.title}
                        </h3>

                        <p className="text-st_white">{item.description}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {item.tags.map((tag, tagIndex) => (
                                <TagBadge key={tagIndex} tag={tag} />
                            ))}
                        </div>

                        <div
                            className={
                                `inline-flex w-fit px-4 py-2 mt-4 rounded-lg items-center gap-2 text-primary border border-primary transition-colors hover:!text-st_darkest hover:bg-primary_light ` +
                                `group-hover/portfolio-item:border-primary_light group-hover/portfolio-item:text-primary_light`
                            }>
                            <span>Visit Project</span>
                            <ExternalLink size={16} />
                        </div>
                    </div>
                </div>
            </div>
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
