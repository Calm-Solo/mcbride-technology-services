import { PortfolioItemTag } from './Portfolio.Constants';

import { RiNextjsFill } from 'react-icons/ri';
import { FaReact } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { SiShadcnui } from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { BiLogoPostgresql } from 'react-icons/bi';
import { FaPython } from 'react-icons/fa';
import { SiSelenium } from 'react-icons/si';
import { SiDrizzle } from 'react-icons/si';

export const REACT_TAG: PortfolioItemTag = {
    name: 'React',
    textColor: 'text-st_dark',
    textHoverColor: 'hover:text-cyan-500',
    bgColor: 'bg-cyan-500',
    bgHoverColor: 'hover:bg-st_light',
    icon: <FaReact />,
    iconColor: 'text-st_dark',
    iconHoverColor: 'group-hover:text-cyan-500',
};

export const NEXT_JS_TAG: PortfolioItemTag = {
    name: 'Next.js',
    textColor: 'text-st_dark',
    textHoverColor: 'hover:text-st_dark',
    bgColor: 'bg-st_lightest',
    bgHoverColor: 'hover:bg-st_light',
    icon: <RiNextjsFill />,
    iconColor: 'text-st_dark',
    iconHoverColor: 'group-hover:text-st_dark',
};

export const TAILWIND_CSS_TAG: PortfolioItemTag = {
    name: 'Tailwind CSS',
    textColor: 'text-st_dark',
    textHoverColor: 'hover:text-cyan-700',
    bgColor: 'bg-cyan-700',
    bgHoverColor: 'hover:bg-st_light',
    icon: <SiTailwindcss />,
    iconColor: 'text-st_dark',
    iconHoverColor: 'group-hover:text-cyan-700',
};

export const TYPE_SCRIPT_TAG: PortfolioItemTag = {
    name: 'TypeScript',
    textColor: 'text-st_white',
    textHoverColor: 'hover:text-st_white',
    bgColor: 'bg-blue-900',
    bgHoverColor: 'hover:bg-st_light',
    icon: <SiTypescript />,
    iconColor: 'text-st_white',
    iconHoverColor: 'group-hover:text-blue-900',
};

export const SHADCN_UI_TAG: PortfolioItemTag = {
    name: 'Shadcn UI',
    textColor: 'text-st_darkest',
    textHoverColor: 'hover:text-st_dark',
    bgColor: 'bg-st_lightest',
    bgHoverColor: 'hover:bg-st_light',
    icon: <SiShadcnui />,
    iconColor: 'text-st_darkest',
    iconHoverColor: 'group-hover:text-st_darkest',
};

export const FRAMER_MOTION_TAG: PortfolioItemTag = {
    name: 'Framer Motion',
    textColor: 'text-st_dark',
    textHoverColor: 'hover:text-yellow-500',
    bgColor: 'bg-yellow-500',
    bgHoverColor: 'hover:bg-st_light',
    icon: <TbBrandFramerMotion />,
    iconColor: 'text-st_dark',
    iconHoverColor: 'group-hover:text-yellow-500',
};

export const POSTGRES_TAG: PortfolioItemTag = {
    name: 'PostgreSQL',
    textColor: 'text-st_dark',
    textHoverColor: 'hover:text-blue-500',
    bgColor: 'bg-blue-500',
    bgHoverColor: 'hover:bg-st_light',
    icon: <BiLogoPostgresql />,
    iconColor: 'text-st_dark',
    iconHoverColor: 'group-hover:text-blue-500',
};

export const PYTHON_TAG: PortfolioItemTag = {
    name: 'Python',
    textColor: 'text-st_dark',
    textHoverColor: 'hover:text-yellow-600',
    bgColor: 'bg-yellow-600',
    bgHoverColor: 'hover:bg-st_light',
    icon: <FaPython />,
    iconColor: 'text-st_dark',
    iconHoverColor: 'group-hover:text-yellow-600',
};

export const SELENIUM_TAG: PortfolioItemTag = {
    name: 'Selenium',
    textColor: 'text-st_dark',
    textHoverColor: 'hover:text-red-500',
    bgColor: 'bg-red-500',
    bgHoverColor: 'hover:bg-st_light',
    icon: <SiSelenium />,
    iconColor: 'text-st_dark',
    iconHoverColor: 'group-hover:text-red-500',
};

export const DRIZZLE_TAG: PortfolioItemTag = {
    name: 'Drizzle',
    textColor: 'text-st_dark',
    textHoverColor: 'hover:text-yellow-500',
    bgColor: 'bg-yellow-500',
    bgHoverColor: 'hover:bg-st_light',
    icon: <SiDrizzle />,
    iconColor: 'text-st_dark',
    iconHoverColor: 'group-hover:text-yellow-500',
};
