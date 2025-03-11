import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import PriceCard from '@/components/ui/PriceCard';
import ServiceCard from '@/components/ui/ServiceCard';
import CallToAction from '@/components/ui/CallToAction';
import { FaReact, FaPython } from 'react-icons/fa';
import { RiNextjsFill } from 'react-icons/ri';
import { SiTailwindcss, SiTypescript, SiShadcnui, SiSelenium, SiDrizzle } from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { BiLogoPostgresql } from 'react-icons/bi';

export default function FreelanceEngineeringComponentServer() {
    return (
        <>
            <HeroSection
                title="Engineering Services"
                description="Expert engineering services to bring your ideas to life"
                buttons={[
                    {
                        text: 'Get a Quote',
                        link: '/contact',
                        isPrimary: true,
                        textColor: 'primary',
                        textHoverColor: 'st_darkest',
                        bgHoverColor: 'primary',
                        borderColor: 'primary',
                        iconName: 'FileCode',
                        iconPosition: 'left',
                        animation: {
                            type: 'pulse',
                            delay: 0.1,
                        },
                    },
                    {
                        text: 'Learn More',
                        link: '#services',
                        textColor: 'primary',
                        textHoverColor: 'st_darkest',
                        bgHoverColor: 'primary',
                        borderColor: 'primary',
                        iconName: 'ChevronDown',
                        iconPosition: 'right',
                        animation: {
                            type: 'bounce',
                            delay: 0.2,
                        },
                    },
                ]}
                backgroundClass="bg-st_darkest"
                titleColorClass="text-primary"
                descriptionColorClass="text-st_lightest"
                withAnimation={true}
                backgroundType="magnetLines"
                magnetLinesColor="rgba(0, 128, 128, 0.3)"
                contentBgOpacity={0.65}
                glowColor="primary_darkest"
                glowSize="110px"
            />

            {/* Services Overview */}
            <section id="services" className="bg-st py-20 group/services-section">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4 text-primary group-hover/services-section:text-primary_light">
                                Our Engineering Services
                            </h2>
                            <p className="text-st_lightest group-hover/services-section:text-st_white max-w-3xl mx-auto">
                                We provide comprehensive engineering solutions tailored to your specific needs, leveraging our technical
                                expertise and industry experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Service 1 */}
                            <ServiceCard
                                title="Custom Software Development"
                                description="Tailored software solutions designed to address your unique business challenges and requirements."
                                features={[
                                    'Custom desktop applications',
                                    'Business automation tools',
                                    'Data processing utilities',
                                    'Cross-platform solutions',
                                    'Legacy system modernization',
                                ]}
                                className="transform hover:scale-105 transition-transform duration-300"
                            />

                            {/* Service 2 */}
                            <ServiceCard
                                title="Automation & Testing"
                                description="Comprehensive testing and automation solutions to ensure quality and reliability in your software."
                                features={[
                                    'Automated testing frameworks',
                                    'CI/CD pipeline implementation',
                                    'Regression testing',
                                    'Performance testing',
                                    'Load and stress testing',
                                ]}
                                className="transform hover:scale-105 transition-transform duration-300"
                            />

                            {/* Service 3 */}
                            <ServiceCard
                                title="Technical Consultation"
                                description="Expert guidance for complex technical challenges and strategic technology planning."
                                features={[
                                    'Technology stack evaluation',
                                    'Architecture design and review',
                                    'Performance optimization',
                                    'Security assessment',
                                    'Technical documentation',
                                ]}
                                className="transform hover:scale-105 transition-transform duration-300"
                            />

                            {/* Service 4 (New) */}
                            <ServiceCard
                                title="System Integration"
                                description="Seamlessly connect different systems, applications, and data sources to optimize your workflows."
                                features={[
                                    'API development and integration',
                                    'Database integration',
                                    'Third-party service connectors',
                                    'Legacy system integration',
                                    'Cloud service integration',
                                ]}
                                className="transform hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies */}
            <section className="bg-st pt-4 pb-16 group/tech-section relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4 text-primary group-hover/tech-section:text-primary_light transition-colors duration-300">
                                Our Technical Expertise
                            </h2>
                            <p className="text-st_lightest max-w-3xl mx-auto group-hover/tech-section:text-st_white transition-colors duration-300">
                                We leverage modern technologies and frameworks to deliver high-quality, scalable, and maintainable
                                solutions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Frontend */}
                            <div className="card min-w-sm max-w-sm flex flex-wrap h-full bg-st_darkest p-6 rounded-lg border border-primary/50 hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary text-2xl mr-3">
                                        <FaReact />
                                    </span>
                                    <h3 className="text-xl font-bold text-primary">Frontend</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-st_white">
                                        <span className="text-cyan-500 mr-2">
                                            <FaReact />
                                        </span>
                                        React
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-purple-500 mr-2">
                                            <RiNextjsFill />
                                        </span>
                                        Next.js
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-cyan-500 mr-2">
                                            <SiTailwindcss />
                                        </span>
                                        Tailwind CSS
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <SiTypescript />
                                        </span>
                                        TypeScript
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-st_white mr-2">
                                            <SiShadcnui />
                                        </span>
                                        Shadcn UI
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-yellow-500 mr-2">
                                            <TbBrandFramerMotion />
                                        </span>
                                        Framer Motion
                                    </li>
                                </ul>
                            </div>

                            {/* Backend */}
                            <div className="card min-w-sm max-w-sm flex flex-wrap h-full bg-st_darkest p-6 rounded-lg border border-primary/50 hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary text-2xl mr-3">
                                        <FaPython />
                                    </span>
                                    <h3 className="text-xl font-bold text-primary">Backend</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-st_white">
                                        <span className="text-yellow-500 mr-2">
                                            <FaPython />
                                        </span>
                                        Python
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-green-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                            </svg>
                                        </span>
                                        Node.js
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-yellow-500 mr-2">
                                            <SiDrizzle />
                                        </span>
                                        Drizzle ORM
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <BiLogoPostgresql />
                                        </span>
                                        PostgreSQL
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-orange-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z" />
                                            </svg>
                                        </span>
                                        RESTful APIs
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-purple-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M14 10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h12zM2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2z" />
                                                <path d="M5 11.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                <path d="M14 3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
                                                <path d="M5 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-2 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                            </svg>
                                        </span>
                                        GraphQL
                                    </li>
                                </ul>
                            </div>

                            {/* Testing & QA */}
                            <div className="card min-w-sm max-w-sm flex flex-wrap h-full bg-st_darkest p-6 rounded-lg border border-primary/50 hover:border-primary transition-allduration-300 transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary text-2xl mr-3">
                                        <SiSelenium />
                                    </span>
                                    <h3 className="text-xl font-bold text-primary">Testing & QA</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-st_white">
                                        <span className="text-green-500 mr-2">
                                            <SiSelenium />
                                        </span>
                                        Selenium
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-amber-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
                                            </svg>
                                        </span>
                                        Jest
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
                                                <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
                                            </svg>
                                        </span>
                                        Cypress
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-yellow-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627z" />
                                            </svg>
                                        </span>
                                        PyTest
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-green-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                            </svg>
                                        </span>
                                        GitHub Actions
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-orange-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                                            </svg>
                                        </span>
                                        Postman
                                    </li>
                                </ul>
                            </div>

                            {/* DevOps & Infrastructure */}
                            <div className="card min-w-sm max-w-sm flex flex-wrap h-full bg-st_darkest p-6 rounded-lg border border-primary/50 hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary text-2xl mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
                                        </svg>
                                    </span>
                                    <h3 className="text-xl font-bold text-primary">DevOps & Infrastructure</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                                            </svg>
                                        </span>
                                        AWS
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-400 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M14.064 0a8.75 8.75 0 0 0-6.867 4.467l-.758 1.22L4.854 5.79l-.109.163.4.586 1.093 1.638.496-.734 1.733-2.63L8.535 12h.887l.684-4.46.114-.317L13.416 5l1.592-2.48L14.064 0zM2.413 9.475l-.734 1.089-.496.734L0 8.5l1.156-1.732 1.295.244 1.412.513-.784 1.729.039.031-.1.142z" />
                                            </svg>
                                        </span>
                                        Azure
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M6.5 5.5a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-1a.5.5 0 0 1 1 0v1h1a.5.5 0 0 1 0 1h-1v3zm4-3a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-3a.5.5 0 0 1 .5-.5zm4 4.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h13z" />
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M13 5.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h13z"
                                                />
                                                <path d="M8.5 11.5a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-1a.5.5 0 0 1 1 0v1h1a.5.5 0 0 1 0 1h-1v3zm-4-4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-3a.5.5 0 0 1 .5-.5z" />
                                            </svg>
                                        </span>
                                        Docker
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-600 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                                            </svg>
                                        </span>
                                        Kubernetes
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-green-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z" />
                                            </svg>
                                        </span>
                                        Vercel
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-purple-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                            </svg>
                                        </span>
                                        Netlify
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background decoration for visual interest */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary_light rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Engagement Models */}
            <section className="bg-st_darkest py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary">Engagement Models</h2>

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
            <CallToAction
                title="Ready to discuss your project?"
                description="Contact us today to discuss how our engineering services can help bring your technical projects to life."
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
                bgColor="bg-st"
                textColor="text-st_white"
                titleColor="text-primary"
            />
        </>
    );
}
