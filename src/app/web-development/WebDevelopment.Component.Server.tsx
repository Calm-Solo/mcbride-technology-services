import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import PriceCard from '@/components/ui/PriceCard';
import ServicesCard from '@/components/ui/services-card';
import CallToAction from '@/components/ui/CallToAction';
import { FaReact, FaNodeJs, FaPhp, FaPython, FaWordpress, FaShopify, FaMicrosoft } from 'react-icons/fa';
import { RiNextjsFill } from 'react-icons/ri';
import {
    SiTailwindcss,
    SiTypescript,
    SiVuedotjs,
    SiAngular,
    SiExpress,
    SiRubyonrails,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiContentful,
} from 'react-icons/si';

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
                backgroundType="paths"
                contentBgOpacity={0.7}
                glowColor="primary_light"
                glowSize="120px"
            />

            {/* Services Overview */}
            <section className="bg-st py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary">Our Web Development Services</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
                            <ServicesCard
                                title="Custom Website Development"
                                description="We create beautiful, responsive websites tailored to your brand and business objectives. Our sites are designed with both aesthetics and functionality in mind."
                                link="/contact?service=website"
                                iconName="Globe"
                                className="bg-st_darkest/80 text-primary/80 hover:bg-st_darkest hover:text-primary"
                                descriptionClassName="text-center text-st_lightest group-hover/services-card:text-st_white"
                            />

                            <ServicesCard
                                title="Web Application Development"
                                description="Transform your business processes with custom web applications designed to streamline operations, improve efficiency, and enhance user experience."
                                link="/contact?service=webapp"
                                iconName="Code"
                                className="bg-st_darkest/80 text-primary/80 hover:bg-st_darkest hover:text-primary"
                                descriptionClassName="text-center text-st_lightest group-hover/services-card:text-st_white"
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
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary pb-4">Website Development Pricing</h2>

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
            <section className="bg-st_darkest py-4">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-primary">Website Maintenance Plans</h2>
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

            {/* Custom Solutions 
            <CallToAction
                title="Need a Custom Solution?"
                description="Every business has unique requirements. Contact us for a personalized quote tailored to your specific needs."
                buttons={[
                    {
                        text: 'Request a Quote',
                        link: '/contact',
                        borderColor: 'border-primary',
                        textColor: 'text-primary',
                        bgHoverColor: 'hover:bg-primary',
                        textHoverColor: 'hover:text-st_darkest',
                        iconName: 'ArrowRight',
                        iconPosition: 'right',
                    },
                ]}
                variant="centered"
                bgColor="bg-st_darkest"
                textColor="text-st_white"
                titleColor="text-primary_light"
                roundedCorners={true}
            />
            */}

            {/* Technologies */}
            <section className="bg-st py-20 group/tech-section relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4 text-primary group-hover/tech-section:text-primary_light transition-colors duration-300">
                                Our Technologies
                            </h2>
                            <p className="text-st_lightest max-w-3xl mx-auto group-hover/tech-section:text-st_white transition-colors duration-300">
                                We leverage cutting-edge web technologies to build fast, responsive, and scalable websites and applications
                                tailored to your needs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Frontend */}
                            <div className="bg-st_dark backdrop-blur-sm p-8 rounded-lg border border-primary/20 hover:border-primary/60 hover:bg-st_darkest transition-all duration-300 transform hover:-translate-y-2">
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
                                        <span className="text-green-500 mr-2">
                                            <SiVuedotjs />
                                        </span>
                                        Vue.js
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-red-500 mr-2">
                                            <SiAngular />
                                        </span>
                                        Angular
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <SiTypescript />
                                        </span>
                                        TypeScript
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-cyan-500 mr-2">
                                            <SiTailwindcss />
                                        </span>
                                        Tailwind CSS
                                    </li>
                                </ul>
                            </div>

                            {/* Backend */}
                            <div className="bg-st_dark backdrop-blur-sm p-8 rounded-lg border border-primary/20 hover:border-primary/60 hover:bg-st_darkest transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary text-2xl mr-3">
                                        <FaNodeJs />
                                    </span>
                                    <h3 className="text-xl font-bold text-primary">Backend</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-st_white">
                                        <span className="text-green-500 mr-2">
                                            <FaNodeJs />
                                        </span>
                                        Node.js
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-gray-300 mr-2">
                                            <SiExpress />
                                        </span>
                                        Express
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-indigo-500 mr-2">
                                            <FaPhp />
                                        </span>
                                        PHP
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-yellow-500 mr-2">
                                            <FaPython />
                                        </span>
                                        Python
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-red-500 mr-2">
                                            <SiRubyonrails />
                                        </span>
                                        Ruby on Rails
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-600 mr-2">
                                            <FaMicrosoft />
                                        </span>
                                        .NET
                                    </li>
                                </ul>
                            </div>

                            {/* Database & CMS */}
                            <div className="bg-st_dark backdrop-blur-sm p-8 rounded-lg border border-primary/20 hover:border-primary/60 hover:bg-st_darkest transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary text-2xl mr-3">
                                        <SiPostgresql />
                                    </span>
                                    <h3 className="text-xl font-bold text-primary">Database & CMS</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-st_white">
                                        <span className="text-green-500 mr-2">
                                            <SiMongodb />
                                        </span>
                                        MongoDB
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <SiMysql />
                                        </span>
                                        MySQL
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-400 mr-2">
                                            <SiPostgresql />
                                        </span>
                                        PostgreSQL
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <FaWordpress />
                                        </span>
                                        WordPress
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-green-500 mr-2">
                                            <FaShopify />
                                        </span>
                                        Shopify
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-purple-500 mr-2">
                                            <SiContentful />
                                        </span>
                                        Contentful
                                    </li>
                                </ul>
                            </div>

                            {/* Development Tools */}
                            <div className="bg-st_dark backdrop-blur-sm p-8 rounded-lg border border-primary/20 hover:border-primary/60 hover:bg-st_darkest transition-all duration-300 transform hover:-translate-y-2">
                                <div className="flex items-center mb-4">
                                    <span className="text-primary text-2xl mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                        </svg>
                                    </span>
                                    <h3 className="text-xl font-bold text-primary">Development Tools</h3>
                                </div>
                                <ul className="space-y-4">
                                    <li className="flex items-center text-st_white">
                                        <span className="text-amber-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-2zm5 0a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-2z" />
                                            </svg>
                                        </span>
                                        Git & GitHub
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-blue-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
                                            </svg>
                                        </span>
                                        VS Code
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-cyan-500 mr-2">
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
                                        <span className="text-purple-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
                                            </svg>
                                        </span>
                                        CI/CD Tools
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-pink-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                                            </svg>
                                        </span>
                                        AWS/Azure/GCP
                                    </li>
                                    <li className="flex items-center text-st_white">
                                        <span className="text-green-500 mr-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16">
                                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z" />
                                            </svg>
                                        </span>
                                        Vercel/Netlify
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background decoration for visual interest */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-primary_light rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Process */}
            <section className="bg-st_darkest py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center text-primary">Our Development Process</h2>

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
