import React, { ReactNode } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar/Navbar';
import ClientProviders from '@/components/layout/ClientProviders';

type PageLayoutProps = {
    children: ReactNode;
    page: string;
};

/**
 * PageLayout component that wraps all pages
 * Includes the navbar and main content with consistent styling
 */
export default function PageLayout({ children, page }: PageLayoutProps) {
    return (
        <div className="h-[100dvh] overflow-hidden flex flex-col bg-st_darkest text-st_white">
            <ClientProviders>
                <Navbar page={page} />
                <main className="h-[calc(100dvh-50px)] overflow-y-auto">
                    {children}
                    <footer className="bg-st_darkest py-8 group/footer">
                        <div className="container mx-auto px-4">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-primary_light mb-4">McBride Technology Services</h3>
                                <p className="text-sm text-st_lightest group-hover/footer:text-st_white mb-4">
                                    © {new Date().getFullYear()} McBride Technology Services. All rights reserved.
                                </p>
                                <div className="flex justify-center space-x-6">
                                    <Link href="/privacy" className="text-sm text-primary hover:text-primary_light transition-colors">
                                        Privacy Policy
                                    </Link>
                                    <Link href="/terms" className="text-sm text-primary hover:text-primary_light transition-colors">
                                        Terms of Use
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </footer>
                </main>
            </ClientProviders>
        </div>
    );
}
