import React from 'react';
import Link from 'next/link';
import HeroSection from '@/components/ui/HeroSection';

export default function HomeComponentServer() {
    return (
        <>
            {/* Use the enhanced HeroSection component with multiple buttons */}
            <HeroSection
                title="McBride Technology Services"
                description="Professional IT solutions tailored to meet your business needs"
                buttons={[
                    {
                        text: 'Get in Touch',
                        link: '/contact',
                        className: 'btn-primary',
                    },
                    {
                        text: 'Learn More',
                        link: '/it-support',
                        className: 'btn-outline',
                    },
                ]}
                backgroundClass="bg-st_darkest"
                titleColorClass="text-primary"
                descriptionColorClass="text-st_lightest"
                withAnimation={true}
            />

            {/* Services Section */}
            <section className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="feature-card">
                            <h3 className="text-xl font-bold mb-4 text-primary">IT Support</h3>
                            <p className="text-st_white mb-6">
                                Comprehensive IT support services to keep your business running smoothly. From help desk to network
                                management, we&apos;ve got you covered.
                            </p>
                            <Link href="/it-support" className="text-primary hover:text-primary_light transition-colors">
                                Learn more →
                            </Link>
                        </div>

                        <div className="feature-card">
                            <h3 className="text-xl font-bold mb-4 text-primary">Web Development</h3>
                            <p className="text-st_white mb-6">
                                Custom websites and web applications designed to elevate your brand and improve your online presence.
                            </p>
                            <Link href="/web-development" className="text-primary hover:text-primary_light transition-colors">
                                Learn more →
                            </Link>
                        </div>

                        <div className="feature-card">
                            <h3 className="text-xl font-bold mb-4 text-primary">Freelance Engineering</h3>
                            <p className="text-st_white mb-6">
                                Expert software engineering services for your specialized technical projects and business needs.
                            </p>
                            <Link href="/freelance-engineering" className="text-primary hover:text-primary_light transition-colors">
                                Learn more →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-primary py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-st_darkest">Ready to get started?</h2>
                    <p className="text-st_darkest text-lg mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss how we can help with your technology needs.
                    </p>
                    <a
                        href="/contact"
                        className="bg-st_darkest text-primary_light hover:bg-st_dark transition-colors font-bold py-3 px-8 rounded-lg">
                        Contact Us
                    </a>
                </div>
            </section>
        </>
    );
}
