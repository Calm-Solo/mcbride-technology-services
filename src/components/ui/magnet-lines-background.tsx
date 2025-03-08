'use client';

import React from 'react';
import { MagnetLines } from './magnet-lines';

export interface MagnetLinesBackgroundProps {
    className?: string;
    lineColor?: string;
}

export function MagnetLinesBackground({
    className = '',
    lineColor = 'rgba(0, 128, 128, 0.3)', // Default to a semi-transparent primary_dark color
}: MagnetLinesBackgroundProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden flex items-center justify-center ${className}`}>
            <MagnetLines
                rows={12}
                columns={12}
                containerSize="100%"
                lineColor={lineColor}
                lineWidth="0.5vmin"
                lineHeight="5vmin"
                baseAngle={-5}
                className="opacity-70"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
}
