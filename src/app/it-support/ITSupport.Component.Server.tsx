import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import PriceCard from '@/components/ui/PriceCard';
import ServicesCard from '@/components/ui/services-card';
import CallToAction from '@/components/ui/CallToAction';

export default function ITSupportComponentServer() {
    return (
        <>
            <HeroSection
                title="IT Support Services"
                description="Comprehensive IT support solutions tailored to your business needs"
                buttons={[
                    {
                        text: 'Get a Quote',
                        link: '/contact',
                        isPrimary: true,
                        textColor: 'primary',
                        textHoverColor: 'st_darkest',
                        bgHoverColor: 'primary',
                        borderColor: 'primary',
                        iconName: 'ArrowRight',
                        iconPosition: 'right',
                        animation: {
                            type: 'slide',
                            delay: 0.1,
                        },
                    },
                ]}
                backgroundClass="bg-st_darkest"
                titleColorClass="text-primary"
                descriptionColorClass="text-st_lightest"
                withAnimation={true}
                backgroundType="particles"
                particleColor="rgba(87, 204, 153, 0.5)"
                particleCount={100}
                contentBgOpacity={0.8}
                glowColor="primary_dark"
                glowSize="90px"
            />

            {/* Services Overview */}
            <section className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our IT Support Services</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
                            <ServicesCard
                                title="Help Desk Support"
                                description="Our responsive help desk provides timely assistance for all your technical issues. From software troubleshooting to hardware problems, we've got you covered."
                                link="/contact?service=helpdesk"
                                iconName="Server"
                            />

                            <ServicesCard
                                title="Network Management"
                                description="Keep your business connected with our comprehensive network management services. We ensure your network remains secure, fast, and reliable."
                                link="/contact?service=network"
                                iconName="Globe"
                            />

                            {/* Additional services can be added here */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="bg-st_darkest py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our Support Plans</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Basic Plan */}
                        <PriceCard
                            title="Basic Support"
                            price="$99"
                            priceSubtext="/month"
                            features={[
                                'Help desk support (9am-5pm)',
                                'Remote troubleshooting',
                                'Basic system maintenance',
                                'Email support',
                            ]}
                            buttonText="Get Started"
                            buttonLink="/contact"
                        />

                        {/* Business Plan */}
                        <PriceCard
                            title="Business Support"
                            price="$299"
                            priceSubtext="/month"
                            features={[
                                '24/7 priority support',
                                'Remote and on-site assistance',
                                'Network management',
                                'Security monitoring',
                                'Regular system updates',
                            ]}
                            buttonText="Get Started"
                            buttonLink="/contact"
                            isHighlighted={true}
                        />

                        {/* Enterprise Plan */}
                        <PriceCard
                            title="Enterprise Support"
                            price="$599"
                            priceSubtext="/month"
                            features={[
                                '24/7 dedicated support',
                                'Unlimited on-site visits',
                                'Advanced network management',
                                'Enterprise security solutions',
                                'Strategic IT consulting',
                            ]}
                            buttonText="Get Started"
                            buttonLink="/contact"
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <CallToAction
                title="Ready to solve your IT challenges?"
                description="Contact us today to discuss your specific needs and how we can support your business."
                buttons={[
                    {
                        text: 'Contact Our IT Team',
                        link: '/contact',
                        borderColor: 'border-st_darkest',
                        bgHoverColor: 'hover:bg-st_darkest',
                        textColor: 'text-st_darkest',
                        textHoverColor: 'hover:text-primary',
                        iconName: 'ArrowRight',
                        iconPosition: 'right',
                    },
                ]}
                variant="simple"
                bgColor="bg-primary"
                textColor="text-st_darkest"
                titleColor="text-st_darkest"
            />
        </>
    );
}
