import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import { PORTFOLIO_ITEMS } from '@/lib/constants/Portfolio.Constants';
import PortfolioWaterfall from '@/components/ui/portfolio/PortfolioWaterfall';
import PortfolioSpotlight from '@/components/ui/portfolio/PortfolioSpotlight';
import {
    REACT_TAG,
    NEXT_JS_TAG,
    TAILWIND_CSS_TAG,
    TYPE_SCRIPT_TAG,
    SHADCN_UI_TAG,
    POSTGRES_TAG,
    DRIZZLE_TAG,
    FRAMER_MOTION_TAG,
    SELENIUM_TAG,
    PYTHON_TAG,
} from '@/lib/constants/PortfolioTags.Constants';
import CallToAction from '@/components/ui/CallToAction';

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
                            textColor: 'primary',
                            textHoverColor: 'st_darkest',
                            bgHoverColor: 'primary',
                            borderColor: 'primary',
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
                            textColor: 'primary',
                            textHoverColor: 'st_darkest',
                            bgHoverColor: 'primary',
                            borderColor: 'primary',
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

            {/* Portfolio Waterfall */}
            <div id="portfolio" className="w-full py-16 bg-st_dark md:py-20 group/portfolio">
                <div className="w-full">
                    <div className="mb-12 text-center px-8">
                        <h2 className="mb-4 text-3xl font-bold text-primary group-hover/portfolio:text-primary_light md:text-4xl">
                            Our Projects
                        </h2>
                        <p className="mx-auto max-w-2xl text-st_lightest group-hover/portfolio:text-st_white">
                            Browse through our diverse portfolio of successful projects across multiple industries and technologies.
                        </p>
                    </div>
                    <div className="w-full">
                        <PortfolioWaterfall
                            items={PORTFOLIO_ITEMS}
                            tags={[
                                REACT_TAG,
                                NEXT_JS_TAG,
                                TAILWIND_CSS_TAG,
                                TYPE_SCRIPT_TAG,
                                SHADCN_UI_TAG,
                                POSTGRES_TAG,
                                DRIZZLE_TAG,
                                FRAMER_MOTION_TAG,
                                SELENIUM_TAG,
                                PYTHON_TAG,
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <CallToAction
                title="Ready to Start Your Project?"
                description="Let's discuss how we can help you achieve your technology goals. Our team is ready to turn your ideas into reality."
                buttons={[
                    {
                        text: 'Get in Touch',
                        link: '/contact',
                        borderColor: 'border-primary',
                        bgHoverColor: 'hover:bg-primary',
                        textColor: 'text-primary',
                        textHoverColor: 'hover:text-st_darkest',
                        iconName: 'ArrowRight',
                        iconPosition: 'right',
                    },
                ]}
                variant="simple"
                bgColor="bg-st_darkest"
                textColor="text-st_white"
                titleColor="text-primary"
            />
        </main>
    );
}
