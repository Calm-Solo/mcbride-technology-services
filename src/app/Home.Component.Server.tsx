import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';
import ServicesCard from '@/components/ui/services-card';
import { Mail } from 'lucide-react';

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
                globeDark={0.6}
                contentBgOpacity={0.7}
                glowColor="primary"
                glowSize="100px"
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
                            title="Freelance Engineering"
                            description="Expert freelance engineering and development services for specialized technical projects and unique business needs."
                            link="/freelance-engineering"
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
