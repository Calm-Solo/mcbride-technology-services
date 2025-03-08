import { TestimonialAuthor } from '@/components/ui/testimonial-card';

export interface Testimonial {
    author: TestimonialAuthor;
    text: string;
    href?: string;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        author: {
            name: 'Michael Johnson',
            title: 'CTO',
            company: 'TechVision Solutions',
            avatar: '/testimonials/testimonial-1.png',
        },
        text: "McBride Technology Services transformed our IT infrastructure completely. Their team's expertise saved us countless hours and significantly improved our system performance.",
    },
    {
        author: {
            name: 'Sophia Chen',
            title: 'VP of Operations',
            company: 'Global Innovations',
            avatar: '/testimonials/testimonial-2.png',
        },
        text: "We've been working with McBride for over 3 years now. Their cybersecurity solutions have protected our data through multiple potential threats. Absolutely top-notch service.",
    },
    {
        author: {
            name: 'David Rodriguez',
            title: 'IT Director',
            company: 'Nexus Enterprise',
            avatar: '/testimonials/testimonial-3.png',
        },
        text: "The cloud migration support from McBride was flawless. They guided us through every step and ensured zero downtime during the transition. Couldn't be happier!",
    },
    {
        author: {
            name: 'Emma Wilson',
            title: 'CEO',
            company: 'Wilson Enterprises',
            avatar: '/testimonials/testimonial-4.png',
        },
        text: "As a growing business, we needed scalable IT solutions. McBride not only provided exactly what we needed but anticipated future requirements we hadn't even considered.",
    },
    {
        author: {
            name: 'James Thompson',
            title: 'Systems Administrator',
            company: 'Quantum Data',
            avatar: '/testimonials/testimonial-5.png',
        },
        text: 'The 24/7 support from McBride has been a game-changer for our operations. Any issue, day or night, is resolved promptly and professionally.',
    },
    {
        author: {
            name: 'Olivia Martinez',
            title: 'CIO',
            company: 'Elevate Technologies',
            avatar: '/testimonials/testimonial-6.png',
        },
        text: "McBride's managed IT services have reduced our operational costs by 30% while improving service quality. Their team feels like an extension of our own.",
    },
    {
        author: {
            name: 'Robert Kim',
            title: 'Director of Security',
            company: 'SecureNet Solutions',
            avatar: '/testimonials/testimonial-7.png',
        },
        text: 'The security audit conducted by McBride revealed vulnerabilities we had no idea existed. Their remediation plan was comprehensive and implemented flawlessly.',
    },
    {
        author: {
            name: 'Sarah Johnson',
            title: 'Head of Digital Transformation',
            company: 'Innovation First',
            avatar: '/testimonials/testimonial-8.png',
        },
        text: 'Working with McBride on our digital transformation initiative exceeded all expectations. Their technical expertise combined with business acumen made all the difference.',
    },
];
