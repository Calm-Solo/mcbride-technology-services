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
    { location: [37.7749, -122.4194] as [number, number], name: 'San Francisco', pulsing: true }, // San Francisco
    { location: [40.7128, -74.006] as [number, number], name: 'New York', pulsing: true }, // New York
    { location: [51.5074, -0.1278] as [number, number], name: 'London', pulsing: true }, // London
    { location: [35.6762, 139.6503] as [number, number], name: 'Tokyo', pulsing: true }, // Tokyo
    { location: [-33.8688, 151.2093] as [number, number], name: 'Sydney', pulsing: true }, // Sydney
    { location: [19.4326, -99.1332] as [number, number], name: 'Mexico City', pulsing: true }, // Mexico City
    { location: [-23.5505, -46.6333] as [number, number], name: 'São Paulo', pulsing: true }, // São Paulo
    { location: [55.7558, 37.6173] as [number, number], name: 'Moscow', pulsing: true }, // Moscow
    { location: [28.6139, 77.209] as [number, number], name: 'New Delhi', pulsing: true }, // New Delhi
    { location: [30.0444, 31.2357] as [number, number], name: 'Cairo', pulsing: true }, // Cairo
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
    const [pulsePhases, setPulsePhases] = useState<number[]>(locations.map(() => Math.random() * Math.PI * 2));
    const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | null>(null);

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

            // Also resize the overlay canvas
            if (overlayCanvasRef.current) {
                overlayCanvasRef.current.width = width;
                overlayCanvasRef.current.height = height;
            }
        }
    };

    // Function to convert lat/long to 3D coordinates on the globe
    const latLongTo3d = (lat: number, long: number, radius: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (long + 180) * (Math.PI / 180);

        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);

        return { x, y, z };
    };

    // Function to project 3D coordinates to 2D screen coordinates
    const project3dTo2d = (x: number, y: number, z: number) => {
        // Simple perspective projection
        const scale = 400 / (400 - z);
        const screenX = width / 2 + x * scale;
        const screenY = height / 2 + y * scale;

        return { x: screenX, y: screenY, scale };
    };

    // Function to draw pulsing effects on the overlay canvas
    const drawPulsingEffects = () => {
        if (!overlayCanvasRef.current) return;

        const ctx = overlayCanvasRef.current.getContext('2d');
        if (!ctx) return;

        // Clear the canvas
        ctx.clearRect(0, 0, width, height);

        // Update pulse phases
        const newPhases = [...pulsePhases];

        // Draw pulsing effects for each marker
        locations.forEach((marker, index) => {
            // Skip if marker doesn't want pulsing effect
            if (marker.pulsing === false) return;

            // Get 3D coordinates
            const coords3d = latLongTo3d(marker.location[0], marker.location[1], 180);

            // Rotate based on current phi
            const rotatedX = coords3d.x * Math.cos(phi + r) - coords3d.z * Math.sin(phi + r);
            const rotatedZ = coords3d.x * Math.sin(phi + r) + coords3d.z * Math.cos(phi + r);

            // Project to 2D
            const projected = project3dTo2d(rotatedX, coords3d.y, rotatedZ);

            // Only draw if the point is on the front half of the globe (z > 0)
            if (rotatedZ < 0) {
                // Update the phase
                newPhases[index] = (newPhases[index] + 0.03) % (Math.PI * 2);

                // Calculate pulse size based on phase
                const pulseSize = Math.sin(newPhases[index]) * 0.5 + 0.5; // Range from 0 to 1
                const maxRadius = 20;
                const currentRadius = 5 + pulseSize * maxRadius;

                // Draw the pulse
                const markerColor = marker.color ? hexToRgb(marker.color) : hexToRgb(PRIMARY);

                // Outer pulse
                const gradient = ctx.createRadialGradient(projected.x, projected.y, 0, projected.x, projected.y, currentRadius);
                gradient.addColorStop(0, `rgba(${markerColor[0] * 255}, ${markerColor[1] * 255}, ${markerColor[2] * 255}, 0.8)`);
                gradient.addColorStop(0.5, `rgba(${markerColor[0] * 255}, ${markerColor[1] * 255}, ${markerColor[2] * 255}, 0.4)`);
                gradient.addColorStop(1, `rgba(${markerColor[0] * 255}, ${markerColor[1] * 255}, ${markerColor[2] * 255}, 0)`);

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(projected.x, projected.y, currentRadius, 0, Math.PI * 2);
                ctx.fill();

                // Inner dot
                ctx.beginPath();
                ctx.fillStyle = `rgba(${markerColor[0] * 255}, ${markerColor[1] * 255}, ${markerColor[2] * 255}, 0.9)`;
                ctx.arc(projected.x, projected.y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Update phases
        setPulsePhases(newPhases);

        // Request next frame
        animationFrameRef.current = requestAnimationFrame(drawPulsingEffects);
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

        // Start the pulsing animation
        animationFrameRef.current = requestAnimationFrame(drawPulsingEffects);

        setTimeout(() => {
            if (canvasRef.current) {
                canvasRef.current.style.opacity = '1';
            }
            if (overlayCanvasRef.current) {
                overlayCanvasRef.current.style.opacity = '1';
            }
        });

        return () => {
            window.removeEventListener('resize', onResize);
            globe.destroy();
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
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
                <canvas
                    className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-500 pointer-events-none"
                    ref={overlayCanvasRef}
                />
            </div>
        </div>
    );
}
