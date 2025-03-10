'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Phone, Info, FileCode, ChevronDown, Globe, Server, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

// Updated icon type definition
export type CTAIconName = 'ArrowRight' | 'Mail' | 'Phone' | 'Info' | 'FileCode' | 'ChevronDown' | 'Globe' | 'Server' | 'Code';

// Button props interface
export interface CTAButtonProps {
    text: string;
    link: string;
    className?: string;
    /**
     * Default styles if not specified:
     * - textColor: 'primary'
     * - textHoverColor: 'st_darkest'
     * - bgColor: 'st_darkest'
     * - bgHoverColor: 'primary'
     * - borderColor: 'primary'
     */
    textColor?: string;
    textHoverColor?: string;
    bgColor?: string;
    bgHoverColor?: string;
    borderColor?: string;
    iconName?: CTAIconName;
    iconPosition?: 'left' | 'right';
}

// Main component props
export interface CallToActionProps {
    title: string;
    description: string;
    buttons?: CTAButtonProps[];
    // Style options
    variant?: 'centered' | 'split' | 'simple';
    bgColor?: string;
    textColor?: string;
    titleColor?: string;
    titleSize?: string;
    roundedCorners?: boolean;
    // Image options (for split variant)
    imageSrc?: string;
    imageAlt?: string;
    // Container options
    containerClassName?: string;
    contentClassName?: string;
}

export default function CallToAction({
    title,
    description,
    buttons = [],
    variant = 'simple',
    bgColor = 'bg-primary',
    textColor = 'text-st_darkest',
    titleColor = 'text-st_darkest',
    titleSize = 'text-3xl',
    roundedCorners = false,
    imageSrc,
    imageAlt = 'Call to action image',
    containerClassName = '',
    contentClassName = '',
}: CallToActionProps) {
    // Updated getIconComponent function
    const getIconComponent = (iconName: CTAIconName) => {
        switch (iconName) {
            case 'ArrowRight':
                return <ArrowRight size={16} />;
            case 'Mail':
                return <Mail size={16} />;
            case 'Phone':
                return <Phone size={16} />;
            case 'Info':
                return <Info size={16} />;
            case 'FileCode':
                return <FileCode size={16} />;
            case 'ChevronDown':
                return <ChevronDown size={16} />;
            case 'Globe':
                return <Globe size={16} />;
            case 'Server':
                return <Server size={16} />;
            case 'Code':
                return <Code size={16} />;
            default:
                return null;
        }
    };

    // Generate button classes based on props
    const getButtonClasses = (button: CTAButtonProps) => {
        const baseClasses = 'inline-flex items-center gap-2 font-medium transition-all duration-200 rounded-lg py-3 px-6';

        // Apply default values unless overridden
        // Background and text colors
        const bgClasses = button.bgColor ? `bg-${button.bgColor}` : 'bg-st_darkest';
        const textClasses = button.textColor ? `text-${button.textColor}` : 'text-primary';
        const hoverBgClasses = button.bgHoverColor ? `hover:bg-${button.bgHoverColor}` : 'hover:bg-primary';
        const hoverTextClasses = button.textHoverColor ? `hover:text-${button.textHoverColor}` : 'hover:text-st_darkest';

        // Border classes - default to primary border if not specified
        const borderClasses = button.borderColor ? `border border-${button.borderColor}` : 'border border-primary';

        return cn(baseClasses, bgClasses, textClasses, hoverBgClasses, hoverTextClasses, borderClasses, button.className);
    };

    // Simple centered variant
    if (variant === 'simple') {
        return (
            <section className={cn('py-16', bgColor, containerClassName)}>
                <div className="container mx-auto px-4 text-center">
                    <h2 className={cn('font-bold mb-4', titleSize, titleColor)}>{title}</h2>
                    <p className={cn('text-lg mb-8 max-w-2xl mx-auto', textColor)}>{description}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {buttons.map((button, index) => (
                            <Link key={index} href={button.link} className={getButtonClasses(button)}>
                                {button.iconPosition === 'left' && button.iconName && getIconComponent(button.iconName)}
                                <span>{button.text}</span>
                                {button.iconPosition === 'right' && button.iconName && getIconComponent(button.iconName)}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Split layout with image
    if (variant === 'split') {
        return (
            <section className={cn('py-16', bgColor, containerClassName)}>
                <div className="container mx-auto px-4">
                    <div
                        className={cn(
                            'flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12',
                            contentClassName,
                            roundedCorners ? 'rounded-xl' : ''
                        )}>
                        {imageSrc && (
                            <div className="relative hidden h-40 w-40 overflow-hidden rounded-full md:block">
                                <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="160px" />
                            </div>
                        )}

                        <div className="flex-1 text-center md:text-left">
                            <h2 className={cn('mb-4 font-bold md:text-3xl', titleSize, titleColor)}>{title}</h2>
                            <p className={cn(textColor)}>{description}</p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {buttons.map((button, index) => (
                                <Link key={index} href={button.link} className={getButtonClasses(button)}>
                                    {button.iconPosition === 'left' && button.iconName && getIconComponent(button.iconName)}
                                    <span>{button.text}</span>
                                    {button.iconPosition === 'right' && button.iconName && getIconComponent(button.iconName)}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Centered variant with card-like appearance
    return (
        <section className={cn('py-16', bgColor, containerClassName)}>
            <div className="container mx-auto px-4">
                <div className={cn('bg-st_dark p-6 md:p-8 max-w-4xl mx-auto', contentClassName, roundedCorners ? 'rounded-lg' : '')}>
                    <h2 className={cn('font-bold mb-4 text-center', titleSize, titleColor)}>{title}</h2>
                    <p className={cn('text-center mb-6', textColor)}>{description}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {buttons.map((button, index) => (
                            <Link key={index} href={button.link} className={getButtonClasses(button)}>
                                {button.iconPosition === 'left' && button.iconName && getIconComponent(button.iconName)}
                                <span>{button.text}</span>
                                {button.iconPosition === 'right' && button.iconName && getIconComponent(button.iconName)}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
