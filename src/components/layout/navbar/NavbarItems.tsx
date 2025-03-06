'use client';

import React from 'react';
import Link from 'next/link';

type NavbarItemType = [string, string, string];

interface NavbarItemsProps {
    items: NavbarItemType[];
    page: string;
    isMobile?: boolean;
}

/**
 * NavbarItems component to display navigation links
 */
export default function NavbarItems({ items, page, isMobile = false }: NavbarItemsProps) {
    return (
        <>
            {items.map(([menuClassName, menuFullName, href]) => {
                // Extract the final part of the path for comparison
                const currentPath = page.split('/').pop() || '';
                let menuPath = href.split('/').pop() || '';

                if (menuPath === '') {
                    menuPath = 'home';
                }

                const isCurrentPage = currentPath === menuPath || (menuPath.includes('?') && menuPath.split('?')[0] === currentPath);

                return (
                    <div
                        key={menuClassName}
                        className={`cursor-pointer items-center justify-center ${
                            isCurrentPage ? 'text-primary' : 'text-st_white hover:text-primary'
                        } ${isMobile ? 'py-2' : ''}`}>
                        <Link href={href}>{menuFullName}</Link>
                    </div>
                );
            })}
        </>
    );
}
