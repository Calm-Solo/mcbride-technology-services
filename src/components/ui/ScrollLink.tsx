'use client';

import React from 'react';

interface ScrollLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    offset?: number; // Optional offset from the top of the target element
}

export default function ScrollLink({ href, children, className = '', offset = 0 }: ScrollLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        // Extract the target ID from the href
        const targetId = href.startsWith('#') ? href.substring(1) : href;

        // Find the target element
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Get the target's position
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

            // Scroll to the target with smooth behavior
            window.scrollTo({
                top: targetPosition - offset,
                behavior: 'smooth',
            });
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
