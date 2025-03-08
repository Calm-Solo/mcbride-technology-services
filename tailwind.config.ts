import type { Config } from 'tailwindcss';
import typographyPlugin from '@tailwindcss/typography';
import animatePlugin from 'tailwindcss-animate';

// Primary Colors: https://coolors.co/22577a-38a3a5-57cc99-80ed99-c7f9cc
// Gold Colors: https://coolors.co/c68d38-e7a94b-5f4c68
// Stone Colors: https://coolors.co/0c0a09-1c1917-292524-57534e-78716c-f5f5f4

const config: Config = {
    darkMode: ['class'],
    content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
            colors: {
                primary_darkest: '#22577a', // Lapis Lazuli
                primary_dark: '#38a3a5', // Verdigris
                primary: '#57cc99', // Emerald
                primary_light: '#80ed99', // Aquamarine
                primary_lightest: '#c7f9cc', // Mint

                gold_dark: '#B88A44', // Dark gold
                gold: '#E7A94B', // Gold
                gold_light: '#F2C777', // Light gold

                st_darkest: '#111827', // Dark slate
                st_dark: '#1F2937', // Slate
                st: '#374151', // Medium slate
                st_light: '#4B5563', // Light slate
                st_lightest: '#6B7280', // Lightest slate
                st_white: '#F9FAFB', // Off-white

                white: '#ffffff',
                link: '#3B82F6', // Blue
                visited: '#8B5CF6', // Purple

                success: '#10B981', // Green
                warning: '#F59E0B', // Amber
                danger: '#EF4444', // Red
            },
            screens: {
                'md-nav': '841px',
                xs: '400px',
                xxs: '315px',
            },
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
                meteor: {
                    '0%': {
                        transform: 'rotate(215deg) translateX(0)',
                        opacity: '1',
                    },
                    '70%': {
                        opacity: '1',
                    },
                    '100%': {
                        transform: 'rotate(215deg) translateX(-500px)',
                        opacity: '0',
                    },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(calc(-100% - var(--gap)))' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 1s forwards',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'meteor-effect': 'meteor 5s linear infinite',
                marquee: 'marquee var(--duration) linear infinite',
            },
            borderRadius: {
                '6xl': '3rem',
                '12xl': '6rem',
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            rotate: {
                'y-8': 'rotateY(8deg)',
                'y-minus-8': 'rotateY(-8deg)',
            },
            maxWidth: {
                container: '1200px',
            },
        },
    },
    mode: 'jit',
    plugins: [typographyPlugin, animatePlugin],
};

export default config;
