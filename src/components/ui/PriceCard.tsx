import React from 'react';
import Link from 'next/link';

export interface PriceCardFeature {
    text: string;
    included: boolean;
}

export interface PriceCardProps {
    title: string;
    price: string;
    priceSubtext?: string;
    features: PriceCardFeature[] | string[];
    buttonText?: string;
    buttonLink?: string;
    isPopular?: boolean;
    isHighlighted?: boolean;
    backgroundClass?: string;
    headerBackgroundClass?: string;
    scale?: boolean;
}

/**
 * A reusable price card component for displaying pricing plans
 */
export default function PriceCard({
    title,
    price,
    priceSubtext,
    features,
    buttonText = 'Get Started',
    buttonLink = '/contact',
    isPopular = false,
    isHighlighted = false,
    backgroundClass = 'bg-st_dark',
    headerBackgroundClass = 'bg-primary',
    scale = true,
}: PriceCardProps) {
    return (
        <div
            className={`${backgroundClass} ${isHighlighted ? 'border-2 border-primary' : 'border border-st_light'} rounded-lg overflow-hidden ${
                scale ? 'transition-transform hover:scale-105' : ''
            } ${isHighlighted && scale ? 'transform scale-105 md:scale-110 z-10 shadow-xl' : ''} relative`}>
            {isPopular && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-blue-900 text-xs font-bold px-2 py-1 rounded-bl-lg">POPULAR</div>
            )}

            <div className={`${headerBackgroundClass} p-4 text-center`}>
                <h2 className="text-2xl font-bold text-st_darkest">{title}</h2>
                <p className="text-3xl font-bold mt-2 text-st_darkest">{price}</p>
                {priceSubtext && <p className="text-lg text-st_darkest mt-1">{priceSubtext}</p>}
            </div>

            <div className="p-6">
                <ul className="space-y-3 text-st_white">
                    {features.map((feature, index) => {
                        // Check if feature is a string or a PriceCardFeature object
                        const featureText = typeof feature === 'string' ? feature : feature.text;
                        const isIncluded = typeof feature === 'string' ? true : feature.included;

                        return (
                            <li key={index} className="flex items-start">
                                <span className={`mr-2 ${isIncluded ? 'text-primary' : 'text-st_light'}`}>{isIncluded ? '✓' : '×'}</span>
                                <span className={isIncluded ? 'text-st_white' : 'text-st_light'}>{featureText}</span>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-6 text-center">
                    <Link href={buttonLink} className="btn-primary inline-block">
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
}
