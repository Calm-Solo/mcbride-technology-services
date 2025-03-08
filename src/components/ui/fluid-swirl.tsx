'use client';

import React, { useEffect, useRef } from 'react';

// Define types for our objects
interface NodeObject {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface LineObject {
    spring: number;
    friction: number;
    nodes: NodeObject[];
    update: () => void;
    draw: () => void;
}

interface ColorUpdater {
    phase: number;
    offset: number;
    frequency: number;
    amplitude: number;
    update: () => number;
    value: () => number;
}

interface CanvasContext extends CanvasRenderingContext2D {
    running?: boolean;
    frame?: number;
}

interface Config {
    debug: boolean;
    friction: number;
    trails: number;
    size: number;
    dampening: number;
    tension: number;
}

// Global variables with proper typing
let ctx: CanvasContext | null = null;
let colorUpdater: ColorUpdater | null = null;
let currentValue = 0;
let pos: { x: number; y: number } = { x: 0, y: 0 };
let lines: LineObject[] = [];
const config: Config = {
    debug: true,
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
};

// Create a color updater
function createColorUpdater(options: { phase?: number; offset?: number; frequency?: number; amplitude?: number } = {}): ColorUpdater {
    return {
        phase: options.phase || 0,
        offset: options.offset || 0,
        frequency: options.frequency || 0.001,
        amplitude: options.amplitude || 1,
        update: function () {
            this.phase += this.frequency;
            currentValue = this.offset + Math.sin(this.phase) * this.amplitude;
            return currentValue;
        },
        value: function () {
            return currentValue;
        },
    };
}

// Node constructor
function createNode(): NodeObject {
    return {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
    };
}

// Line constructor
function createLine(options: { spring?: number } = {}): LineObject {
    const spring = (options.spring || 0.45) + 0.1 * Math.random() - 0.05;
    const friction = config.friction + 0.01 * Math.random() - 0.005;
    const nodes: NodeObject[] = [];

    for (let i = 0; i < config.size; i++) {
        const node = createNode();
        node.x = pos.x;
        node.y = pos.y;
        nodes.push(node);
    }

    return {
        spring,
        friction,
        nodes,
        update: function () {
            let springForce = this.spring;
            let node = this.nodes[0];

            node.vx += (pos.x - node.x) * springForce;
            node.vy += (pos.y - node.y) * springForce;

            for (let i = 0, n = this.nodes.length; i < n; i++) {
                node = this.nodes[i];

                if (i > 0) {
                    const prevNode = this.nodes[i - 1];
                    node.vx += (prevNode.x - node.x) * springForce;
                    node.vy += (prevNode.y - node.y) * springForce;
                    node.vx += prevNode.vx * config.dampening;
                    node.vy += prevNode.vy * config.dampening;
                }

                node.vx *= this.friction;
                node.vy *= this.friction;
                node.x += node.vx;
                node.y += node.vy;

                springForce *= config.tension;
            }
        },
        draw: function () {
            if (!ctx) return;

            let node, nextNode;
            let x = this.nodes[0].x;
            let y = this.nodes[0].y;

            ctx.beginPath();
            ctx.moveTo(x, y);

            for (let i = 1, n = this.nodes.length - 2; i < n; i++) {
                node = this.nodes[i];
                nextNode = this.nodes[i + 1];
                x = 0.5 * (node.x + nextNode.x);
                y = 0.5 * (node.y + nextNode.y);

                ctx.quadraticCurveTo(node.x, node.y, x, y);
            }

            node = this.nodes[this.nodes.length - 2];
            nextNode = this.nodes[this.nodes.length - 1];
            ctx.quadraticCurveTo(node.x, node.y, nextNode.x, nextNode.y);
            ctx.stroke();
            ctx.closePath();
        },
    };
}

function handleMouseMove(e: MouseEvent | TouchEvent) {
    // Initialize lines
    function initLines() {
        lines = [];
        for (let i = 0; i < config.trails; i++) {
            lines.push(createLine({ spring: 0.45 + (i / config.trails) * 0.025 }));
        }
    }

    // Handle pointer position
    function updatePointerPosition(e: MouseEvent | TouchEvent) {
        if ('touches' in e) {
            pos.x = e.touches[0].pageX;
            pos.y = e.touches[0].pageY;
        } else {
            pos.x = e.clientX;
            pos.y = e.clientY;
        }
        e.preventDefault();
    }

    // Handle touch start
    function handleTouchStart(e: TouchEvent) {
        if (e.touches.length === 1) {
            pos.x = e.touches[0].pageX;
            pos.y = e.touches[0].pageY;
        }
    }

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchstart', handleMouseMove as unknown as EventListener);
    document.addEventListener('mousemove', updatePointerPosition as EventListener);
    document.addEventListener('touchmove', updatePointerPosition as EventListener);
    document.addEventListener('touchstart', handleTouchStart as EventListener);

    updatePointerPosition(e);
    initLines();
    renderFrame();
}

function renderFrame() {
    if (!ctx || !ctx.running || !colorUpdater) return;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    // Use primary color with opacity
    ctx.strokeStyle = 'rgba(0, 128, 128, 0.025)'; // This will be overridden by the color prop
    ctx.lineWidth = 10;

    for (let i = 0; i < config.trails; i++) {
        const line = lines[i];
        line.update();
        line.draw();
    }

    if (ctx.frame !== undefined) {
        ctx.frame++;
    }

    window.requestAnimationFrame(renderFrame);
}

function resizeCanvas() {
    if (!ctx) return;
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
}

export const renderCanvas = function (color: string = 'rgba(0, 128, 128, 0.025)') {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    ctx = canvas.getContext('2d') as CanvasContext;
    if (!ctx) return;

    ctx.running = true;
    ctx.frame = 1;
    ctx.strokeStyle = color;

    colorUpdater = createColorUpdater({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleMouseMove as unknown as EventListener);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('focus', () => {
        if (ctx && !ctx.running) {
            ctx.running = true;
            renderFrame();
        }
    });

    window.addEventListener('blur', () => {
        if (ctx) {
            ctx.running = true;
        }
    });

    resizeCanvas();

    // Initialize with a simulated mouse event at the center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    pos = { x: centerX, y: centerY };

    // Create a synthetic event to initialize
    const syntheticEvent = new MouseEvent('mousemove', {
        clientX: centerX,
        clientY: centerY,
    });

    handleMouseMove(syntheticEvent);
};

export interface FluidSwirlProps {
    className?: string;
    color?: string;
}

export function FluidSwirl({ className = '', color = 'rgba(0, 128, 128, 0.025)' }: FluidSwirlProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            renderCanvas(color);
        }

        return () => {
            // Cleanup event listeners on unmount
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchstart', handleMouseMove as unknown as EventListener);
            document.body.removeEventListener('orientationchange', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('focus', () => {});
            window.removeEventListener('blur', () => {});

            // Stop animation
            if (ctx) {
                ctx.running = false;
            }
        };
    }, [color]);

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <canvas id="canvas" ref={canvasRef} className="pointer-events-none absolute inset-0 mx-auto"></canvas>
        </div>
    );
}
