'use client';

import createGlobe, { COBEOptions } from 'cobe';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Helper function to convert hex to RGB array
const hexToRgb = (hex: string): [number, number, number] => {
    // Remove the # if present
    hex = hex.replace('#', '');

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    return [r, g, b];
};

// Colors from tailwind config
const PRIMARY = '#57cc99'; // Emerald
const ST_DARK = '#1F2937'; // Slate
const ST_LIGHTEST = '#6B7280'; // Lightest slate

// Default marker locations (latitude, longitude)
const DEFAULT_LOCATIONS: MarkerLocation[] = [
    { location: [37.7749, -122.4194] as [number, number], name: 'San Francisco' }, // San Francisco
    { location: [40.7128, -74.006] as [number, number], name: 'New York' }, // New York
    { location: [51.5074, -0.1278] as [number, number], name: 'London' }, // London
    { location: [35.6762, 139.6503] as [number, number], name: 'Tokyo' }, // Tokyo
    { location: [-33.8688, 151.2093] as [number, number], name: 'Sydney' }, // Sydney
    { location: [19.4326, -99.1332] as [number, number], name: 'Mexico City' }, // Mexico City
    { location: [-23.5505, -46.6333] as [number, number], name: 'São Paulo' }, // São Paulo
    { location: [55.7558, 37.6173] as [number, number], name: 'Moscow' }, // Moscow
    { location: [28.6139, 77.209] as [number, number], name: 'New Delhi' }, // New Delhi
    { location: [30.0444, 31.2357] as [number, number], name: 'Cairo' }, // Cairo
];

export interface MarkerLocation {
    location: [number, number]; // [latitude, longitude]
    name?: string;
    size?: number;
    color?: string;
    pulsing?: boolean;
}

const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 1.2, // Increased diffuse for better visibility
    mapSamples: 16000,
    mapBrightness: 1.5, // Increased brightness
    baseColor: hexToRgb(ST_LIGHTEST), // Use st_lightest for the sphere
    markerColor: hexToRgb(PRIMARY), // Use primary for markers/highlights
    glowColor: hexToRgb(PRIMARY), // Use primary for glow
    markers: [],
};

export interface GlobeBackgroundProps {
    className?: string;
    markerColor?: [number, number, number];
    baseColor?: [number, number, number];
    glowColor?: [number, number, number];
    dark?: number;
    verticalOffset?: number;
    useThemeColors?: boolean;
    locations?: MarkerLocation[]; // Custom marker locations
}

export function GlobeBackground({
    className,
    markerColor,
    baseColor,
    glowColor,
    dark = 0,
    verticalOffset = 0,
    useThemeColors = true,
    locations = DEFAULT_LOCATIONS,
}: GlobeBackgroundProps) {
    let phi = 0;
    let width = 0;
    let height = 0;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
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
            state.height = height * 2;
        },
        [r, height]
    );

    const onResize = () => {
        if (canvasRef.current && containerRef.current) {
            width = canvasRef.current.offsetWidth;
            height = canvasRef.current.offsetHeight;
        }
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();

        // Convert our locations to cobe marker format
        const cobeMarkers = locations.map((loc) => ({
            location: loc.location,
            size: loc.size || 0.05,
        }));

        const config = {
            ...GLOBE_CONFIG,
            width: width * 2,
            height: height * 2,
            onRender,
            dark: dark > 0 ? dark : 0,
            markers: cobeMarkers,
        };

        // Apply custom colors if provided, otherwise use theme colors if enabled
        if (markerColor) {
            config.markerColor = markerColor;
        } else if (useThemeColors) {
            // Use PRIMARY for markers/highlights
            config.markerColor = hexToRgb(PRIMARY);
        }

        if (baseColor) {
            config.baseColor = baseColor;
        } else if (useThemeColors) {
            // Use ST_LIGHTEST for the sphere and ST_DARK for land dots based on dark mode
            config.baseColor = dark > 0.5 ? hexToRgb(ST_DARK) : hexToRgb(ST_LIGHTEST);
        }

        if (glowColor) {
            config.glowColor = glowColor;
        } else if (useThemeColors) {
            // Use PRIMARY for the glow
            config.glowColor = hexToRgb(PRIMARY);
        }

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
    }, [markerColor, baseColor, glowColor, dark, onRender, useThemeColors, locations]);

    return (
        <div ref={containerRef} className={cn('absolute inset-0 overflow-hidden flex items-center justify-center', className)}>
            <div
                className="relative w-full h-full max-w-[1200px] max-h-[1200px] mx-auto flex items-center justify-center"
                style={{
                    transform: `translateY(${verticalOffset}%)`,
                }}>
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
