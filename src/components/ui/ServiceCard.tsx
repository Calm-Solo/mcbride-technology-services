import React from 'react';

export interface ServiceCardProps {
    title: string;
    description: string;
    features: string[];
    className?: string;
}

/**
 * A reusable service card component for displaying service information
 */
export default function ServiceCard({ title, description, features, className = '' }: ServiceCardProps) {
    return (
        <div
            className={`card min-w-sm max-w-sm flex flex-wrap h-full bg-st_darkest p-6 rounded-lg border border-primary/50 hover:border-primary transition-all ${className}`}>
            <h3 className="text-2xl font-bold mb-4 text-primary">{title}</h3>
            <p className="text-st_white mb-6">{description}</p>
            <ul className="list-disc list-inside text-st_white space-y-2 mb-6 flex-grow">
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    );
}
