'use client';

import React from 'react';
import Link from 'next/link';
import { BackgroundPaths } from './background-paths';
import { MagnetLinesBackground } from './magnet-lines-background';
import { FluidSwirl } from './fluid-swirl';
import { ParticlesBackground } from './particles-background';
import { GlobeBackground } from './globe-background';
import AnimatedGradientBackground from './animated-gradient-background';
import { WavyBackground } from './wavy-background';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Info, FileCode, ChevronDown, Phone } from 'lucide-react';

// Define the available icon names we support
export type IconName = 'ArrowRight' | 'Mail' | 'Info' | 'FileCode' | 'ChevronDown' | 'Phone';

export interface HeroButtonProps {
    text: string;
    link: string;
    className?: string;
    textColor?: string;
    textHoverColor?: string;
    bgColor?: string;
    bgHoverColor?: string;
    borderColor?: string;
    isPrimary?: boolean;
    iconName?: IconName; // Changed from icon to iconName
    iconPosition?: 'left' | 'right';
    animation?: {
        type?: 'bounce' | 'pulse' | 'slide' | 'none';
        delay?: number;
    };
}

// Define the available background types
export type BackgroundType = 'none' | 'paths' | 'magnetLines' | 'fluid-swirl' | 'particles' | 'globe' | 'animated-gradient' | 'wavy';

export interface HeroSectionProps {
    title: string;
    description: string;
    buttons: HeroButtonProps[];
    backgroundClass?: string;
    titleColorClass?: string;
    titleColorHoverClass?: string;
    descriptionColorClass?: string;
    descriptionColorHoverClass?: string;
    centered?: boolean;
    withAnimation?: boolean;
    backgroundType?: BackgroundType;
    magnetLinesColor?: string;
    fluidSwirlColor?: string;
    particleColor?: string;
    particleCount?: number;
    globeDark?: number;
    gradientStartingGap?: number;
    gradientBreathing?: boolean;
    gradientAnimationSpeed?: number;
    gradientBreathingRange?: number;
    gradientTopOffset?: number;
    wavyBlur?: number;
    wavySpeed?: 'slow' | 'fast';
    wavyWaveWidth?: number;
    wavyWaveOpacity?: number;
    wavyVerticalOffset?: number;
    contentBgOpacity?: number;
    glowColor?: string;
    glowSize?: string;
}

/**
 * A reusable hero section component that can be used across all pages
 * Now with multiple background options
 */
export default function HeroSection({
    title,
    description,
    buttons = [],
    backgroundClass = 'bg-st_darkest',
    titleColorClass = 'text-primary',
    titleColorHoverClass = 'group-hover/hero-section:text-primary_light',
    descriptionColorClass = 'text-st_lightest',
    descriptionColorHoverClass = 'group-hover/hero-section:text-st_white',
    centered = true,
    withAnimation = true,
    backgroundType = 'fluid-swirl', // Default to fluid-swirl background
    magnetLinesColor = 'rgba(0, 128, 128, 0.3)', // Default to semi-transparent primary_dark
    fluidSwirlColor = 'rgba(0, 128, 128, 0.025)', // Default to semi-transparent primary color
    particleColor = 'rgba(87, 204, 153, 0.6)', // Default to semi-transparent primary color
    particleCount = 80, // Default particle count
    globeDark = 0, // Default globe dark setting
    gradientStartingGap = 125, // Default starting gap for gradient
    gradientBreathing = true, // Default breathing animation for gradient
    gradientAnimationSpeed = 0.02, // Default animation speed for gradient
    gradientBreathingRange = 5, // Default breathing range for gradient
    gradientTopOffset = 0, // Default top offset for gradient
    wavyBlur = 10, // Default blur for wavy background
    wavySpeed = 'fast', // Default speed for wavy background
    wavyWaveWidth = 50, // Default wave width for wavy background
    wavyWaveOpacity = 0.5, // Default wave opacity for wavy background
    wavyVerticalOffset = 25, // Default vertical offset for wavy background (25%)
    contentBgOpacity = 0.85, // Default opacity for content background
    glowColor = 'primary', // Default glow color
    glowSize = '80px', // Default glow size
}: HeroSectionProps) {
    // Function to get the icon component based on name
    const getIconComponent = (iconName: IconName) => {
        switch (iconName) {
            case 'ArrowRight':
                return ArrowRight;
            case 'Mail':
                return Mail;
            case 'Info':
                return Info;
            case 'FileCode':
                return FileCode;
            case 'ChevronDown':
                return ChevronDown;
            case 'Phone':
                return Phone;
            default:
                return ArrowRight;
        }
    };

    return (
        <section
            className={`relative group/hero-section py-16 ${backgroundClass}`}
            style={{
                minHeight: '60vh',
                height: '60vh',
            }}>
            {/* Render the selected background */}
            {backgroundType === 'paths' && <BackgroundPaths />}
            {backgroundType === 'magnetLines' && <MagnetLinesBackground lineColor={magnetLinesColor} />}
            {backgroundType === 'fluid-swirl' && <FluidSwirl color={fluidSwirlColor} />}
            {backgroundType === 'particles' && <ParticlesBackground particleColor={particleColor} particleCount={particleCount} />}
            {backgroundType === 'globe' && <GlobeBackground dark={globeDark} />}
            {backgroundType === 'animated-gradient' && (
                <AnimatedGradientBackground
                    startingGap={gradientStartingGap}
                    Breathing={gradientBreathing}
                    animationSpeed={gradientAnimationSpeed}
                    breathingRange={gradientBreathingRange}
                    topOffset={gradientTopOffset}
                    gradientColors={[
                        '#111827', // st_darkest
                        '#22577a', // primary_darkest
                        '#38a3a5', // primary_dark
                        '#57cc99', // primary
                        '#80ed99', // primary_light
                    ]}
                />
            )}
            {backgroundType === 'wavy' && (
                <WavyBackground
                    containerClassName="absolute inset-0 w-full h-full"
                    className="pointer-events-none"
                    blur={wavyBlur}
                    speed={wavySpeed}
                    waveWidth={wavyWaveWidth}
                    waveOpacity={wavyWaveOpacity}
                    verticalOffset={wavyVerticalOffset}
                    fullHeight={false}
                    colors={[
                        '#22577a', // primary_darkest
                        '#38a3a5', // primary_dark
                        '#57cc99', // primary
                        '#80ed99', // primary_light
                        '#c7f9cc', // primary_lightest
                    ]}
                />
            )}

            <div
                className={`relative z-10 container mx-auto px-4 flex items-center ${centered ? 'text-center' : ''}`}
                style={{ minHeight: 'calc(60vh - 8rem)' }}>
                <div className={`w-full`}>
                    {/* Content container with background and glow effect */}
                    <div
                        className={`relative max-w-4xl mx-auto p-8 rounded-xl backdrop-blur-sm`}
                        style={{
                            backgroundColor: `rgba(17, 24, 39, ${contentBgOpacity})`, // st_darkest with configurable opacity
                            boxShadow: `0 0 ${glowSize} rgba(var(--color-${glowColor}), 0.15)`,
                            position: 'relative',
                        }}>
                        {/* Subtle glow overlay */}
                        <div
                            className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
                            style={{
                                background: `radial-gradient(circle at center, rgba(var(--color-${glowColor}), 0.3) 0%, rgba(var(--color-${glowColor}), 0) 70%)`,
                                zIndex: 0,
                            }}></div>

                        <motion.h1
                            initial={withAnimation ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`relative z-10 text-4xl md:text-5xl font-bold mb-6 ${titleColorClass} ${
                                withAnimation ? `${titleColorHoverClass} transition-colors` : ''
                            }`}>
                            {title}
                        </motion.h1>

                        <motion.p
                            initial={withAnimation ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className={`relative z-10 text-xl mb-8 ${descriptionColorClass} max-w-3xl ${centered ? 'mx-auto' : ''} ${
                                withAnimation ? `${descriptionColorHoverClass} transition-colors` : ''
                            }`}>
                            {description}
                        </motion.p>

                        {buttons.length > 0 && (
                            <motion.div
                                initial={withAnimation ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="relative z-20 flex flex-col sm:flex-row gap-4 justify-center">
                                {buttons.map((button, index) => {
                                    // Determine if this is the primary button (first one or explicitly set)
                                    const isPrimary = button.isPrimary !== undefined ? button.isPrimary : index === 0;

                                    // Get the button styling based on the provided or default values
                                    const getButtonClasses = () => {
                                        if (button.className) return button.className;

                                        // Text color classes
                                        const textColorClass = `text-${button.textColor || (isPrimary ? 'st_darkest' : 'primary')}`;
                                        const textHoverColorClass = `hover:text-${button.textHoverColor || (isPrimary ? 'st_darkest' : 'st_white')}`;

                                        // Background color classes
                                        const bgColorClass = button.bgColor ? `bg-${button.bgColor}` : isPrimary ? 'bg-primary' : '';
                                        const bgHoverColorClass = `hover:bg-${button.bgHoverColor || (isPrimary ? 'primary_light' : 'primary')}`;

                                        // Border color class
                                        const borderColorClass = `border-${button.borderColor || 'primary'}`;

                                        // Common classes
                                        const commonClasses =
                                            'px-5 py-2.5 rounded-lg font-medium transition-all duration-300 border flex items-center justify-center w-full relative z-10';

                                        // Hover effect classes
                                        const hoverEffectClasses = 'hover:-translate-y-0.5 hover:scale-105 transform hover:shadow-md';

                                        // Primary button specific classes
                                        const primaryClasses = isPrimary
                                            ? 'shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 transform'
                                            : hoverEffectClasses;

                                        return `${textColorClass} ${textHoverColorClass} ${bgColorClass} ${bgHoverColorClass} ${borderColorClass} ${commonClasses} ${primaryClasses}`;
                                    };

                                    // Get animation classes based on the animation type
                                    const getAnimationClasses = () => {
                                        if (!button.animation || button.animation.type === 'none') return '';

                                        switch (button.animation.type) {
                                            case 'bounce':
                                                return 'animate-bounce';
                                            case 'pulse':
                                                return 'animate-pulse';
                                            case 'slide':
                                                return button.iconPosition === 'right'
                                                    ? 'transform transition-transform duration-300 ease-in-out group-hover:translate-x-1'
                                                    : 'transform transition-transform duration-300 ease-in-out group-hover:-translate-x-1';
                                            default:
                                                return '';
                                        }
                                    };

                                    // Determine which icon to use
                                    const iconName = button.iconName || (isPrimary ? 'ArrowRight' : undefined);
                                    const iconPosition = button.iconPosition || 'right';

                                    // Render the icon if iconName is provided
                                    const renderIcon = () => {
                                        if (!iconName) return null;

                                        const Icon = getIconComponent(iconName);

                                        return (
                                            <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'} ${getAnimationClasses()}`}>
                                                <Icon className="h-4 w-4" />
                                            </span>
                                        );
                                    };

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={withAnimation ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.4 + index * 0.1 + (button.animation?.delay || 0),
                                                duration: 0.5,
                                            }}
                                            className="w-full sm:w-auto relative z-10">
                                            <Link
                                                href={button.link}
                                                className={`group ${getButtonClasses()}`}
                                                style={{ position: 'relative', zIndex: 30 }}>
                                                {iconPosition === 'left' && renderIcon()}
                                                <span className="relative z-10">{button.text}</span>
                                                {iconPosition === 'right' && renderIcon()}

                                                {/* Hover effect overlay */}
                                                <span
                                                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-white"
                                                    style={{ zIndex: 5 }}></span>

                                                {/* Glow effect */}
                                                <span
                                                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-70 transition-all duration-300 blur-md"
                                                    style={{
                                                        zIndex: 1,
                                                        background: `radial-gradient(circle at center, rgba(var(--color-${button.bgColor || 'primary'}), 0.3) 0%, rgba(var(--color-${button.bgColor || 'primary'}), 0) 70%)`,
                                                        transform: 'scale(1.1)',
                                                    }}></span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
