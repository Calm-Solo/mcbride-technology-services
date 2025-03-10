'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Server, Globe, Code, FileCode, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the available icon names we support
export type IconName = 'ArrowRight' | 'Server' | 'Globe' | 'Code' | 'FileCode' | 'ChevronDown';

export interface ServicesCardProps {
    title: string;
    description: string;
    link: string;
    iconName: IconName;
    className?: string;
    iconClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    withAnimation?: boolean;
}

export default function ServicesCard({
    title,
    description,
    link,
    iconName,
    className = 'bg-st_darkest hover:bg-st_dark',
    iconClassName = 'w-12 h-12',
    titleClassName = 'text-xl font-bold mb-4 text-center',
    descriptionClassName = 'text-center',
    withAnimation = true,
}: ServicesCardProps) {
    // Function to get the icon component based on name
    const getIconComponent = (iconName: IconName) => {
        switch (iconName) {
            case 'ArrowRight':
                return ArrowRight;
            case 'Server':
                return Server;
            case 'Globe':
                return Globe;
            case 'Code':
                return Code;
            case 'FileCode':
                return FileCode;
            case 'ChevronDown':
                return ChevronDown;
            default:
                return ArrowRight;
        }
    };

    const Icon = getIconComponent(iconName);

    return (
        <motion.div
            whileHover={withAnimation ? { scale: 1.05 } : undefined}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`group/services-card feature-card  p-8 rounded-lg shadow-lg transition-all duration-300 cursor-pointer ${className}`}>
            <Link href={link} className="block h-full w-full">
                <div className="flex flex-col items-center">
                    <div className="flex justify-center mb-4">
                        <Icon className={iconClassName} />
                    </div>
                    <h3 className={titleClassName}>{title}</h3>
                    <p className={descriptionClassName}>{description}</p>
                    <div className="mt-6 text-center">
                        <span className="inline-flex items-center  transition-colors group/button">
                            Learn More{' '}
                            <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover/button:translate-x-1" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
