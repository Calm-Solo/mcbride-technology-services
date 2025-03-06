import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import PriceCard from '@/components/ui/PriceCard';
import ServiceCard from '@/components/ui/ServiceCard';

export default function FreelanceEngineeringComponentServer() {
    return (
        <>
            <HeroSection
                title="Freelance Engineering Services"
                description="Expert engineering solutions for your specialized technical projects"
                buttons={[
                    {
                        text: 'Request a Consultation',
                        link: '/contact',
                        className: 'btn-primary',
                    },
                ]}
            />

            {/* Services Overview */}
            <section className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our Engineering Services</h2>

                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                            {/* Service 1 */}
                            <ServiceCard
                                title="Custom Software Development"
                                description="We develop custom software solutions tailored to your specific business needs. From desktop applications to specialized tools, we build robust, efficient software."
                                features={[
                                    'Custom desktop applications',
                                    'Business automation tools',
                                    'Data processing utilities',
                                    'Cross-platform solutions',
                                    'Legacy system modernization',
                                ]}
                            />

                            {/* Service 2 */}
                            <ServiceCard
                                title="Automation & Testing"
                                description="Enhance your development workflow with our automation and testing expertise. We help you implement robust testing frameworks and CI/CD pipelines."
                                features={[
                                    'Automated testing frameworks',
                                    'CI/CD pipeline implementation',
                                    'Regression testing',
                                    'Performance testing',
                                    'Load and stress testing',
                                ]}
                            />

                            {/* Service 3 */}
                            <ServiceCard
                                title="Technical Consultation"
                                description="Expert guidance for your technical challenges and strategic planning. We provide technical consultation to help you make informed decisions."
                                features={[
                                    'Technology stack evaluation',
                                    'Architecture design and review',
                                    'Performance optimization',
                                    'Security assessment',
                                    'Technical documentation',
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="bg-st_darkest py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Our Technical Expertise</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card text-center">
                                <h3 className="text-xl font-bold mb-4 text-primary">Languages</h3>
                                <ul className="text-st_white space-y-2">
                                    <li>Python</li>
                                    <li>JavaScript/TypeScript</li>
                                    <li>C#/.NET</li>
                                    <li>Java</li>
                                    <li>C/C++</li>
                                    <li>Ruby</li>
                                </ul>
                            </div>

                            <div className="card text-center">
                                <h3 className="text-xl font-bold mb-4 text-primary">Frameworks & Tools</h3>
                                <ul className="text-st_white space-y-2">
                                    <li>React/Next.js</li>
                                    <li>Django/Flask</li>
                                    <li>Node.js</li>
                                    <li>Docker/Kubernetes</li>
                                    <li>Jenkins/GitHub Actions</li>
                                    <li>AWS/Azure/GCP</li>
                                </ul>
                            </div>

                            <div className="card text-center">
                                <h3 className="text-xl font-bold mb-4 text-primary">Testing & QA</h3>
                                <ul className="text-st_white space-y-2">
                                    <li>Jest/Mocha</li>
                                    <li>Selenium</li>
                                    <li>Cypress</li>
                                    <li>JUnit/PyTest</li>
                                    <li>Postman/Insomnia</li>
                                    <li>SonarQube</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Engagement Models */}
            <section className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary_light">Engagement Models</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <PriceCard
                                title="Hourly Rate"
                                price="$100-$150"
                                priceSubtext="/hour"
                                features={['Pay only for the time used', 'No long-term commitment', 'Detailed time tracking']}
                                buttonText="Contact Us"
                                buttonLink="/contact"
                                backgroundClass="bg-st_dark"
                                headerBackgroundClass="bg-primary"
                            />

                            <PriceCard
                                title="Monthly Retainer"
                                price="$4,000+"
                                priceSubtext="/month"
                                features={[
                                    'Guaranteed availability',
                                    'Priority support',
                                    'Regular progress reporting',
                                    'Discounted hourly rate',
                                ]}
                                buttonText="Contact Us"
                                buttonLink="/contact"
                                isHighlighted={true}
                                backgroundClass="bg-st_dark"
                                headerBackgroundClass="bg-primary"
                            />

                            <PriceCard
                                title="Project-Based"
                                price="Custom"
                                priceSubtext=" quote"
                                features={['Clear project scope', 'Fixed pricing', 'Milestone-based payments', 'Defined deliverables']}
                                buttonText="Request Quote"
                                buttonLink="/contact"
                                backgroundClass="bg-st_dark"
                                headerBackgroundClass="bg-primary"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-primary py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-st_darkest">Ready to discuss your project?</h2>
                    <p className="text-st_darkest text-lg mb-8 max-w-2xl mx-auto">
                        Contact us today to discuss how our freelance engineering services can help bring your technical projects to life.
                    </p>
                    <a
                        href="/contact"
                        className="bg-st_darkest text-primary_light hover:bg-st_dark transition-colors font-bold py-3 px-8 rounded-lg">
                        Get in Touch
                    </a>
                </div>
            </section>
        </>
    );
}
