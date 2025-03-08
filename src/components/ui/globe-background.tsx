'use client';

import createGlobe, { COBEOptions } from 'cobe';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [87 / 255, 204 / 255, 153 / 255], // Primary color
    glowColor: [1, 1, 1],
    markers: [
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 },
    ],
};

export interface GlobeBackgroundProps {
    className?: string;
    markerColor?: [number, number, number];
    baseColor?: [number, number, number];
    glowColor?: [number, number, number];
    dark?: number;
}

export function GlobeBackground({ className, markerColor, baseColor, glowColor, dark = 0 }: GlobeBackgroundProps) {
    let phi = 0;
    let width = 0;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const [r, setR] = useState(0);

    const updatePointerInteraction = (value: number | null) => {
        pointerInteracting.current = value;
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
        }
    };

    const updateMovement = (clientX: number) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            setR(delta / 200);
        }
    };

    const onRender = useCallback(
        (state: Record<string, number>) => {
            if (!pointerInteracting.current) phi += 0.005;
            state.phi = phi + r;
            state.width = width * 2;
            state.height = width * 2;
        },
        [r]
    );

    const onResize = () => {
        if (canvasRef.current) {
            width = canvasRef.current.offsetWidth;
        }
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();

        const config = {
            ...GLOBE_CONFIG,
            width: width * 2,
            height: width * 2,
            onRender,
            dark,
        };

        if (markerColor) config.markerColor = markerColor;
        if (baseColor) config.baseColor = baseColor;
        if (glowColor) config.glowColor = glowColor;

        const globe = createGlobe(canvasRef.current!, config);

        setTimeout(() => {
            if (canvasRef.current) {
                canvasRef.current.style.opacity = '1';
            }
        });

        return () => {
            window.removeEventListener('resize', onResize);
            globe.destroy();
        };
    }, [markerColor, baseColor, glowColor, dark, onRender]);

    return (
        <div className={cn('absolute inset-0 overflow-hidden flex items-center justify-center', className)}>
            <div className="relative w-full h-full max-w-[1200px] max-h-[1200px] mx-auto">
                <canvas
                    className="w-full h-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
                    ref={canvasRef}
                    onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerInteractionMovement.current)}
                    onPointerUp={() => updatePointerInteraction(null)}
                    onPointerOut={() => updatePointerInteraction(null)}
                    onMouseMove={(e) => updateMovement(e.clientX)}
                    onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
                />
            </div>
        </div>
    );
}
