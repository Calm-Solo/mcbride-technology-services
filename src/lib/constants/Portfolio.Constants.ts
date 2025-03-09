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
} from './PortfolioTags.Constants';

export interface PortfolioItemTag {
    name: string;
    textColor: string;
    textHoverColor: string;
    bgColor: string;
    bgHoverColor: string;
    icon: React.ReactNode;
    iconColor: string;
    iconHoverColor: string;
}

export interface PortfolioItem {
    title: string;
    description: string;
    image: string;
    link: string;
    tags: PortfolioItemTag[];
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
    {
        title: 'E The Finance Wiz',
        description: 'E The Finance Wiz is a platform that helps you manage your money and invest in the stock market.',
        image: '/portfolio/e-finance-wiz.png',
        link: 'https://www.efinancewiz.com/',
        tags: [REACT_TAG, NEXT_JS_TAG, TAILWIND_CSS_TAG, TYPE_SCRIPT_TAG, SHADCN_UI_TAG, FRAMER_MOTION_TAG],
    },
    {
        title: 'Captial City Staging',
        description: 'Captial City Staging is a platform that helps you stage your home for sale.',
        image: '/portfolio/capital-city-staging.png',
        link: 'https://www.capitalcitystaging.com/',
        tags: [REACT_TAG, NEXT_JS_TAG, TAILWIND_CSS_TAG, TYPE_SCRIPT_TAG, POSTGRES_TAG, DRIZZLE_TAG, FRAMER_MOTION_TAG],
    },
    {
        title: 'JWS Fine Art',
        description: 'JWS Fine Art is a platform that helps you buy and sell fine art.',
        image: '/portfolio/jws-fine-art.png',
        link: 'https://www.jwsfineart.com/',
        tags: [REACT_TAG, NEXT_JS_TAG, TAILWIND_CSS_TAG, TYPE_SCRIPT_TAG, POSTGRES_TAG, DRIZZLE_TAG],
    },
    {
        title: 'First Baptist Church of North Highlands',
        description: 'First Baptist Church of North Highlands helps community members connect with each other and the church.',
        image: '/portfolio/first-baptist-church.png',
        link: 'https://www.first-baptist-church.vercel.app/',
        tags: [REACT_TAG, NEXT_JS_TAG, TAILWIND_CSS_TAG, TYPE_SCRIPT_TAG, FRAMER_MOTION_TAG],
    },
    {
        title: 'Rust Wipes',
        description: 'Rust Wipes helps users find the best servers for the survival game Rust using specialized algorithms and filters.',
        image: '/portfolio/rust-wipes.png',
        link: 'https://www.rustwipes.net/',
        tags: [REACT_TAG, NEXT_JS_TAG, TAILWIND_CSS_TAG, TYPE_SCRIPT_TAG, POSTGRES_TAG, DRIZZLE_TAG, SELENIUM_TAG, PYTHON_TAG],
    },
    {
        title: 'Torrey Smith Developer Portfolio',
        description: "Torrey Smith's Developer Portfolio is a platform that showcases his work and skills as a developer.",
        image: '/portfolio/torrey-smith-dev.png',
        link: 'https://www.torreysmith.dev/',
        tags: [REACT_TAG, NEXT_JS_TAG, TAILWIND_CSS_TAG, TYPE_SCRIPT_TAG, FRAMER_MOTION_TAG],
    },
    {
        title: 'AI Spec Generator',
        description: 'AI Spec Generator is a platform that helps you generate AI specs for your project.',
        image: '/portfolio/ai-spec-gen.png',
        link: 'https://www.aispecgen.com/',
        tags: [REACT_TAG, NEXT_JS_TAG, TAILWIND_CSS_TAG, TYPE_SCRIPT_TAG, POSTGRES_TAG, DRIZZLE_TAG, FRAMER_MOTION_TAG],
    },
];
