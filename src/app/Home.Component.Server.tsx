import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ServicesCard from '@/components/ui/services-card';
import { Mail } from 'lucide-react';
import { MarkerLocation } from '@/components/ui/globe-background';

// Custom locations for the globe
const COMPANY_LOCATIONS: MarkerLocation[] = [
    // United States
    { location: [38.5816, -121.4944] as [number, number], name: 'Sacramento', pulsing: true, size: 0.05 }, // Sacramento (HQ - made larger)
    { location: [37.7749, -122.4194] as [number, number], name: 'San Francisco', pulsing: true, size: 0.03 }, // San Francisco
    { location: [34.0522, -118.2437] as [number, number], name: 'Los Angeles', pulsing: true, size: 0.03 }, // Los Angeles
    { location: [32.7157, -117.1611] as [number, number], name: 'San Diego', pulsing: true, size: 0.03 }, // San Diego
    { location: [47.6062, -122.3321] as [number, number], name: 'Seattle', pulsing: true, size: 0.03 }, // Seattle
    { location: [45.5051, -122.675] as [number, number], name: 'Portland', pulsing: true, size: 0.03 }, // Portland
    { location: [40.7128, -74.006] as [number, number], name: 'New York', pulsing: true, size: 0.03 }, // New York
    { location: [41.8781, -87.6298] as [number, number], name: 'Chicago', pulsing: true, size: 0.03 }, // Chicago
    { location: [29.7604, -95.3698] as [number, number], name: 'Houston', pulsing: true, size: 0.03 }, // Houston
    { location: [33.4484, -112.074] as [number, number], name: 'Phoenix', pulsing: true, size: 0.03 }, // Phoenix

    // Canada
    { location: [43.6532, -79.3832] as [number, number], name: 'Toronto', pulsing: true, size: 0.04 }, // Toronto
    { location: [45.5017, -73.5673] as [number, number], name: 'Montreal', pulsing: true, size: 0.03 }, // Montreal
    { location: [49.2827, -123.1207] as [number, number], name: 'Vancouver', pulsing: true, size: 0.03 }, // Vancouver
    { location: [51.0447, -114.0719] as [number, number], name: 'Calgary', pulsing: true, size: 0.03 }, // Calgary
    { location: [53.5461, -113.4938] as [number, number], name: 'Edmonton', pulsing: true, size: 0.03 }, // Edmonton

    // Europe
    { location: [51.5074, -0.1278] as [number, number], name: 'London', pulsing: true, size: 0.04 }, // London
    { location: [48.8566, 2.3522] as [number, number], name: 'Paris', pulsing: true, size: 0.03 }, // Paris
    { location: [52.52, 13.405] as [number, number], name: 'Berlin', pulsing: true, size: 0.03 }, // Berlin
    { location: [41.9028, 12.4964] as [number, number], name: 'Rome', pulsing: true, size: 0.03 }, // Rome
    { location: [40.4168, -3.7038] as [number, number], name: 'Madrid', pulsing: true, size: 0.03 }, // Madrid
    { location: [55.7558, 37.6173] as [number, number], name: 'Moscow', pulsing: true, size: 0.03 }, // Moscow

    // Asia
    { location: [35.6762, 139.6503] as [number, number], name: 'Tokyo', pulsing: true, size: 0.04 }, // Tokyo
    { location: [22.3193, 114.1694] as [number, number], name: 'Hong Kong', pulsing: true, size: 0.03 }, // Hong Kong
    { location: [31.2304, 121.4737] as [number, number], name: 'Shanghai', pulsing: true, size: 0.04 }, // Shanghai
    { location: [28.6139, 77.209] as [number, number], name: 'New Delhi', pulsing: true, size: 0.03 }, // New Delhi
    { location: [1.3521, 103.8198] as [number, number], name: 'Singapore', pulsing: true, size: 0.03 }, // Singapore
    { location: [25.2048, 55.2708] as [number, number], name: 'Dubai', pulsing: true, size: 0.03 }, // Dubai

    // Australia & Oceania
    { location: [-33.8688, 151.2093] as [number, number], name: 'Sydney', pulsing: true, size: 0.04 }, // Sydney
    { location: [-37.8136, 144.9631] as [number, number], name: 'Melbourne', pulsing: true, size: 0.03 }, // Melbourne
    { location: [-41.2865, 174.7762] as [number, number], name: 'Wellington', pulsing: true, size: 0.03 }, // Wellington

    // South America
    { location: [-23.5505, -46.6333] as [number, number], name: 'São Paulo', pulsing: true, size: 0.04 }, // São Paulo
    { location: [-34.6037, -58.3816] as [number, number], name: 'Buenos Aires', pulsing: true, size: 0.03 }, // Buenos Aires
    { location: [-33.4489, -70.6693] as [number, number], name: 'Santiago', pulsing: true, size: 0.03 }, // Santiago

    // Africa
    { location: [-33.9249, 18.4241] as [number, number], name: 'Cape Town', pulsing: true, size: 0.03 }, // Cape Town
    { location: [30.0444, 31.2357] as [number, number], name: 'Cairo', pulsing: true, size: 0.03 }, // Cairo
    { location: [6.5244, 3.3792] as [number, number], name: 'Lagos', pulsing: true, size: 0.03 }, // Lagos
];

export default function HomeComponentServer() {
    return (
        <>
            {/* Use the enhanced HeroSection component with globe background */}
            <HeroSection
                title="McBride Technology Services"
                description="Professional IT solutions tailored to meet your business needs"
                buttons={[
                    {
                        text: 'Get in Touch',
                        link: '/contact',
                        isPrimary: true,
                        textColor: 'st_darkest',
                        textHoverColor: 'st_darkest',
                        bgColor: 'primary',
                        bgHoverColor: 'primary_light',
                        borderColor: 'primary',
                        iconName: 'Mail',
                        iconPosition: 'right',
                        animation: {
                            type: 'slide',
                            delay: 0.1,
                        },
                    },
                    {
                        text: 'Learn More',
                        link: '/it-support',
                        textColor: 'primary',
                        textHoverColor: 'st_white',
                        bgColor: '',
                        bgHoverColor: 'primary',
                        borderColor: 'primary',
                        iconName: 'ArrowRight',
                        iconPosition: 'right',
                        animation: {
                            type: 'slide',
                            delay: 0.2,
                        },
                    },
                ]}
                backgroundClass="bg-st_darkest"
                withAnimation={true}
                backgroundType="globe"
                globeDark={0.3}
                globeVerticalOffset={-5}
                contentBgOpacity={0.7}
                glowColor="primary"
                glowSize="100px"
                locations={COMPANY_LOCATIONS}
            />

            {/* Services Section with improved styling */}
            <section className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServicesCard
                            title="IT Support"
                            description="Comprehensive IT support services for businesses of all sizes. We handle everything from troubleshooting to system maintenance."
                            link="/it-support"
                            iconName="Server"
                        />

                        <ServicesCard
                            title="Web Development"
                            description="Custom web development solutions that help your business establish a strong online presence and reach more customers."
                            link="/web-development"
                            iconName="Globe"
                        />

                        <ServicesCard
                            title="Engineering"
                            description="Expert engineering and development services for specialized technical projects and unique business needs."
                            link="/engineering"
                            iconName="Code"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-primary_darkest py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-primary">Ready to Transform Your IT Infrastructure?</h2>
                    <p className="text-xl mb-8 text-st_white max-w-3xl mx-auto">
                        Partner with McBride Technology Services for comprehensive IT solutions that drive your business forward.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center bg-primary hover:bg-primary_light text-st_darkest font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform">
                        Contact Us Today <Mail className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>
        </>
    );
}
