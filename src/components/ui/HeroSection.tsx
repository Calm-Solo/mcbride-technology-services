import React from 'react';
import Link from 'next/link';

export interface HeroButtonProps {
    text: string;
    link: string;
    className?: string;
    bgColor?: string;
    textColor?: string;
    hoverBgColor?: string;
    hoverTextColor?: string;
}

export interface HeroSectionProps {
    title: string;
    description: string;
    buttons: HeroButtonProps[];
    backgroundClass?: string;
    titleColorClass?: string;
    descriptionColorClass?: string;
    centered?: boolean;
    withAnimation?: boolean;
}

/**
 * A reusable hero section component that can be used across all pages
 */
export default function HeroSection({
    title,
    description,
    buttons = [],
    backgroundClass = 'bg-st_darkest',
    titleColorClass = 'text-primary',
    descriptionColorClass = 'text-st_lightest',
    centered = true,
    withAnimation = true,
}: HeroSectionProps) {
    return (
        <section className={`py-16 ${backgroundClass}`}>
            <div className={`container mx-auto px-4 ${centered ? 'text-center' : ''} ${withAnimation ? 'group' : ''}`}>
                <h1
                    className={`text-4xl md:text-5xl font-bold mb-6 ${titleColorClass} ${
                        withAnimation ? 'group-hover:text-primary_light transition-colors' : ''
                    }`}>
                    {title}
                </h1>
                <p
                    className={`text-xl mb-8 ${descriptionColorClass} max-w-3xl ${centered ? 'mx-auto' : ''} ${
                        withAnimation ? 'group-hover:text-st_white transition-colors' : ''
                    }`}>
                    {description}
                </p>
                {buttons.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {buttons.map((button, index) => {
                            // Determine button styling
                            const buttonClass =
                                button.className ||
                                `${button.bgColor || 'bg-primary'} ${button.textColor || 'text-st_darkest'} 
                                hover:${button.hoverBgColor || 'bg-primary_light'} hover:${button.hoverTextColor || 'text-st_darkest'} 
                                transition-colors font-bold py-2 px-6 rounded-lg`;

                            return (
                                <Link key={index} href={button.link} className={button.className || buttonClass}>
                                    {button.text}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
