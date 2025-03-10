import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import PriceCard from '@/components/ui/PriceCard';
import ServicesCard from '@/components/ui/services-card';
import CallToAction from '@/components/ui/CallToAction';

export default function WebDevelopmentComponentServer() {
    return (
        <>
            <HeroSection
                title="Website Development"
                description="Professional web development services fine tuned to your business needs."
                buttons={[
                    {
                        text: 'Request a Quote',
                        link: '/contact',
                        isPrimary: true,
                        textColor: 'st_darkest',
                        textHoverColor: 'st_darkest',
                        bgColor: 'primary',
                        bgHoverColor: 'primary_light',
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
                backgroundType="paths"
                contentBgOpacity={0.7}
                glowColor="primary_light"
                glowSize="120px"
            />

            {/* Services Overview */}
            <section className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our Web Development Services</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
                            <ServicesCard
                                title="Custom Website Development"
                                description="We create beautiful, responsive websites tailored to your brand and business objectives. Our sites are designed with both aesthetics and functionality in mind."
                                link="/contact?service=website"
                                iconName="Globe"
                            />

                            <ServicesCard
                                title="Web Application Development"
                                description="Transform your business processes with custom web applications designed to streamline operations, improve efficiency, and enhance user experience."
                                link="/contact?service=webapp"
                                iconName="Code"
                            />

                            {/* Additional services can be added here */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="bg-st_darkest py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Website Development Pricing</h2>

                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                            {/* Basic Plan */}
                            <PriceCard
                                title="Basic Website"
                                price="$1,200"
                                priceSubtext="One-time payment"
                                features={[
                                    'Up to 5 pages',
                                    'Mobile responsive design',
                                    'Contact form',
                                    'Basic SEO setup',
                                    'Social media integration',
                                ]}
                                buttonText="Get Started"
                                buttonLink="/contact"
                            />

                            {/* Professional Plan */}
                            <PriceCard
                                title="Business Website"
                                price="$2,500"
                                priceSubtext="One-time payment"
                                features={[
                                    'Up to 10 pages',
                                    'Advanced responsive design',
                                    'Content Management System',
                                    'Advanced SEO optimization',
                                    'Google Analytics integration',
                                    'Blog functionality',
                                ]}
                                buttonText="Get Started"
                                buttonLink="/contact"
                                isPopular={true}
                                isHighlighted={true}
                            />

                            {/* E-commerce Plan */}
                            <PriceCard
                                title="E-commerce"
                                price="$4,000+"
                                priceSubtext="Starting price"
                                features={[
                                    'Full e-commerce functionality',
                                    'Product management system',
                                    'Payment gateway integration',
                                    'Inventory management',
                                    'Customer account system',
                                    'Order tracking & management',
                                ]}
                                buttonText="Get Started"
                                buttonLink="/contact"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Maintenance Plans */}
            <section className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-primary_light">Website Maintenance Plans</h2>
                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                            {/* Basic Maintenance */}
                            <PriceCard
                                title="Basic Maintenance"
                                price="$75"
                                priceSubtext="/month"
                                features={['Software updates', 'Security monitoring', 'Monthly backups', '1 hour of content updates']}
                                buttonText="Select Plan"
                                buttonLink="/contact"
                                backgroundClass="bg-st_darkest"
                            />

                            {/* Standard Maintenance */}
                            <PriceCard
                                title="Standard Maintenance"
                                price="$150"
                                priceSubtext="/month"
                                features={[
                                    'All Basic features',
                                    'Weekly backups',
                                    '3 hours of content updates',
                                    'Performance optimization',
                                    'Monthly analytics report',
                                ]}
                                buttonText="Select Plan"
                                buttonLink="/contact"
                                backgroundClass="bg-st_darkest"
                            />

                            {/* Premium Maintenance */}
                            <PriceCard
                                title="Premium Maintenance"
                                price="$300"
                                priceSubtext="/month"
                                features={[
                                    'All Standard features',
                                    'Daily backups',
                                    '6 hours of content updates',
                                    'Priority support (24hr response)',
                                    'SEO monitoring & updates',
                                    'Conversion optimization',
                                ]}
                                buttonText="Select Plan"
                                buttonLink="/contact"
                                backgroundClass="bg-st_darkest"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Solutions */}
            <CallToAction
                title="Need a Custom Solution?"
                description="Every business has unique requirements. Contact us for a personalized quote tailored to your specific needs."
                buttons={[
                    {
                        text: 'Request a Quote',
                        link: '/contact',
                        bgColor: 'primary',
                        bgHoverColor: 'primary_light',
                        textColor: 'st_white',
                    },
                ]}
                variant="centered"
                bgColor="bg-st_darkest"
                textColor="text-st_white"
                titleColor="text-primary_light"
                roundedCorners={true}
            />

            {/* Technologies */}
            <section className="bg-st_darkest py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our Technologies</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card text-center">
                                <h3 className="text-xl font-bold mb-4 text-primary">Frontend</h3>
                                <ul className="text-st_white space-y-2">
                                    <li>React</li>
                                    <li>Next.js</li>
                                    <li>Vue.js</li>
                                    <li>Angular</li>
                                    <li>HTML5/CSS3</li>
                                    <li>Tailwind CSS</li>
                                </ul>
                            </div>

                            <div className="card text-center">
                                <h3 className="text-xl font-bold mb-4 text-primary">Backend</h3>
                                <ul className="text-st_white space-y-2">
                                    <li>Node.js</li>
                                    <li>Express</li>
                                    <li>PHP</li>
                                    <li>Python</li>
                                    <li>Ruby on Rails</li>
                                    <li>.NET</li>
                                </ul>
                            </div>

                            <div className="card text-center">
                                <h3 className="text-xl font-bold mb-4 text-primary">Database & CMS</h3>
                                <ul className="text-st_white space-y-2">
                                    <li>MongoDB</li>
                                    <li>MySQL</li>
                                    <li>PostgreSQL</li>
                                    <li>WordPress</li>
                                    <li>Shopify</li>
                                    <li>Contentful</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our Development Process</h2>

                        <div className="space-y-8">
                            <div className="card flex flex-col md:flex-row md:items-center">
                                <div className="bg-primary text-st_darkest text-center font-bold text-3xl rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0 mx-auto md:mx-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-primary text-center md:text-left">Discovery & Planning</h3>
                                    <p className="text-st_white">
                                        We start by understanding your business goals, target audience, and project requirements to create a
                                        detailed development plan.
                                    </p>
                                </div>
                            </div>

                            <div className="card flex flex-col md:flex-row md:items-center">
                                <div className="bg-primary text-st_darkest text-center font-bold text-3xl rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0 mx-auto md:mx-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-primary text-center md:text-left">Design & Prototyping</h3>
                                    <p className="text-st_white">
                                        We create wireframes and design mockups of your website or application, ensuring the visual elements
                                        align with your brand identity.
                                    </p>
                                </div>
                            </div>

                            <div className="card flex flex-col md:flex-row md:items-center">
                                <div className="bg-primary text-st_darkest text-center font-bold text-3xl rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0 mx-auto md:mx-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-primary text-center md:text-left">Development & Testing</h3>
                                    <p className="text-st_white">
                                        Our developers build your website or application following best practices and conduct thorough
                                        testing to ensure quality and performance.
                                    </p>
                                </div>
                            </div>

                            <div className="card flex flex-col md:flex-row md:items-center">
                                <div className="bg-primary text-st_darkest text-center font-bold text-3xl rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0 mx-auto md:mx-0">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-primary text-center md:text-left">Deployment & Launch</h3>
                                    <p className="text-st_white">
                                        We deploy your website or application to your hosting environment and ensure everything is
                                        functioning correctly before launch.
                                    </p>
                                </div>
                            </div>

                            <div className="card flex flex-col md:flex-row md:items-center">
                                <div className="bg-primary text-st_darkest text-center font-bold text-3xl rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0 mx-auto md:mx-0">
                                    5
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-primary text-center md:text-left">Support & Maintenance</h3>
                                    <p className="text-st_white">
                                        We provide ongoing support and maintenance to keep your website or application secure, up-to-date,
                                        and performing optimally.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <CallToAction
                title="Ready to start your project?"
                description="Contact us today to discuss your web development needs and get a free consultation."
                buttons={[
                    {
                        text: 'Get Started',
                        link: '/contact',
                        borderColor: 'primary',
                        bgColor: 'st_darkest',
                        bgHoverColor: 'st_dark',
                        textColor: 'primary_light',
                        iconName: 'ArrowRight',
                        iconPosition: 'right',
                    },
                ]}
                variant="simple"
                bgColor="bg-st_darkest"
                textColor="text-st_white"
                titleColor="text-primary"
            />
        </>
    );
}
