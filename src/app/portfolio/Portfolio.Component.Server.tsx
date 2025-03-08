import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import { PORTFOLIO_ITEMS } from '@/lib/constants/Portfolio.Constants';
import PortfolioGrid from '@/components/ui/portfolio/PortfolioGrid';
import PortfolioSpotlight from '@/components/ui/portfolio/PortfolioSpotlight';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function PortfolioComponentServer() {
    // Get the first portfolio item for the spotlight
    const featuredProject = PORTFOLIO_ITEMS[0];

    return (
        <main className="flex w-full flex-col items-center justify-center">
            {/* Hero Section - Using a section tag with w-full to ensure full width */}
            <section className="w-full">
                <HeroSection
                    title="Our Portfolio"
                    description="Explore our collection of successful projects across web development, IT solutions, and engineering services."
                    buttons={[
                        {
                            text: 'Explore Projects',
                            link: '#portfolio',
                            isPrimary: true,
                            iconName: 'ArrowRight',
                            iconPosition: 'right',
                            animation: {
                                type: 'bounce',
                                delay: 0.5,
                            },
                        },
                        {
                            text: 'Contact Us',
                            link: '/contact',
                            isPrimary: false,
                            iconName: 'Mail',
                            iconPosition: 'right',
                        },
                    ]}
                    backgroundType="wavy"
                    wavySpeed="fast"
                    wavyWaveWidth={60}
                    wavyWaveOpacity={0.4}
                    wavyBlur={8}
                    centered={true}
                />
            </section>

            {/* Feature Project Spotlight */}
            <div className="w-full py-16 md:py-20">
                <div className="w-full">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">Featured Project</h2>
                        <p className=" text-st_lightest">
                            Take a closer look at one of our most impressive projects that showcases our expertise and capabilities.
                        </p>
                    </div>
                    <div className="w-full">
                        <PortfolioSpotlight item={featuredProject} />
                    </div>
                </div>
            </div>

            {/* Portfolio Grid */}
            <div id="portfolio" className="w-full py-16 bg-st_darkest md:py-20">
                <div className="w-full">
                    <div className="mb-12 text-center px-8">
                        <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">Our Projects</h2>
                        <p className="mx-auto max-w-2xl text-st_lightest">
                            Browse through our diverse portfolio of successful projects across multiple industries and technologies.
                        </p>
                    </div>
                    <div className="w-full px-8">
                        <PortfolioGrid items={PORTFOLIO_ITEMS} />
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="w-full py-16 bg-gradient-to-b from-st_dark to-st_darkest md:py-20">
                <div className="w-full px-4 sm:px-6">
                    <div className="flex flex-col items-center justify-between gap-8 rounded-xl bg-st_dark p-8 md:flex-row md:p-12">
                        <div className="relative hidden h-40 w-40 overflow-hidden rounded-full md:block">
                            <Image
                                src="/images/cta-icon.png"
                                alt="Ready to start your project"
                                fill
                                className="object-cover"
                                sizes="160px"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">Ready to Start Your Project?</h2>
                            <p className="text-st_white">
                                Let&apos;s discuss how we can help you achieve your technology goals. Our team is ready to turn your ideas
                                into reality.
                            </p>
                        </div>

                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary_dark">
                            <span>Get in Touch</span>
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
