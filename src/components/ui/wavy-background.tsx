'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';

export interface WavyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: 'slow' | 'fast';
    waveOpacity?: number;
    fullHeight?: boolean;
    verticalOffset?: number;
    quality?: 'low' | 'medium' | 'high';
}

export const WavyBackground = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 10,
    speed = 'fast',
    waveOpacity = 0.5,
    fullHeight = false,
    verticalOffset = 0,
    quality = 'medium',
    ...props
}: WavyBackgroundProps) => {
    const noise = createNoise3D();
    let w: number, h: number, nt: number, i: number, x: number, ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement | null;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const getSpeed = () => {
        switch (speed) {
            case 'slow':
                return 0.001;
            case 'fast':
                return 0.002;
            default:
                return 0.001;
        }
    };

    const getStepSize = () => {
        switch (quality) {
            case 'low':
                return 10;
            case 'high':
                return 3;
            default:
                return 5;
        }
    };

    const updateCanvasSize = () => {
        if (!ctx || !canvas || !containerRef.current) return;

        const containerHeight = containerRef.current.offsetHeight;

        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = containerHeight;

        ctx.filter = `blur(${blur}px)`;
    };

    const init = () => {
        canvas = canvasRef.current;
        if (!canvas || !containerRef.current) return;

        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        ctx = context;

        updateCanvasSize();

        nt = 0;

        window.addEventListener('resize', updateCanvasSize);

        startAnimation();
    };

    const startAnimation = () => {
        if (!isVisible) return;
        render();
    };

    const stopAnimation = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    const waveColors = colors ?? [
        '#22577a', // primary_darkest
        '#38a3a5', // primary_dark
        '#57cc99', // primary
        '#80ed99', // primary_light
        '#c7f9cc', // primary_lightest
    ];

    const drawWave = (n: number) => {
        if (!ctx) return;
        nt += getSpeed();
        const stepSize = getStepSize();

        for (i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth || 50;
            ctx.strokeStyle = waveColors[i % waveColors.length];

            for (x = 0; x < w; x += stepSize) {
                const y = noise(x / 800, 0.3 * i, nt) * 100;
                const yOffset = h * (verticalOffset / 100);
                ctx.lineTo(x, y + h * 0.5 + yOffset);
            }
            ctx.stroke();
            ctx.closePath();
        }
    };

    const render = () => {
        if (!ctx || !isVisible) return;

        ctx.fillStyle = backgroundFill || '#111827';
        ctx.globalAlpha = waveOpacity || 0.5;
        ctx.fillRect(0, 0, w, h);
        drawWave(5);

        animationRef.current = requestAnimationFrame(render);
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsVisible(false);
                stopAnimation();
            } else {
                setIsVisible(true);
                startAnimation();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        init();

        return () => {
            stopAnimation();
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, []);

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(typeof window !== 'undefined' && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome'));
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                'flex flex-col items-center justify-center w-full',
                fullHeight ? 'h-screen' : 'h-full absolute inset-0',
                containerClassName
            )}>
            <canvas
                className="absolute inset-0 z-0 w-full h-full pointer-events-none"
                ref={canvasRef}
                id="canvas"
                style={{
                    ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
                }}></canvas>
            <div className={cn('relative z-10', className)} {...props}>
                {children}
            </div>
        </div>
    );
};
