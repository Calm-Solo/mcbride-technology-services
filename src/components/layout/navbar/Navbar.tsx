'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navbarMenuList } from '@/lib/menuList';
import NavbarItems from '@/components/layout/navbar/NavbarItems';
import { Menu } from 'lucide-react';

interface NavbarProps {
    page: string;
}

export default function Navbar({ page }: NavbarProps) {
    return (
        <nav className="bg-st_dark shadow-md text-white">
            <div className="w-full flex justify-between items-center h-[60px] relative">
                {/* Mobile Logo */}
                <Link href="/" className="flex md:hidden pl-4">
                    <div className="flex items-center flex-row gap-4">
                        <Image src="/m-logo-no-bg.png" alt="McBride Technology Services Logo" width={40} height={40} />
                        <h1 className="text-2xl font-bold">McBride Technology</h1>
                    </div>
                </Link>

                {/* Desktop Menu with Logo in Center */}
                <div className="w-full hidden md:block px-8">
                    {/* Absolutely positioned center logo to ensure true centering */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <Link href="/" className="flex items-center justify-center gap-2">
                            <Image src="/m-logo-no-bg.png" alt="McBride Technology Services Logo" width={40} height={40} />
                            <span className="text-xl font-bold hidden lg:block">McBride Technology Services</span>
                        </Link>
                    </div>

                    {/* Menu Container with space for the centered logo */}
                    <div className="flex justify-between items-center">
                        {/* Left Menu */}
                        <div className="flex space-x-6">
                            <NavbarItems items={navbarMenuList.slice(0, Math.ceil(navbarMenuList.length / 2))} page={page} />
                        </div>

                        {/* Invisible spacer for the center logo */}
                        <div className="invisible">
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-[40px] h-[40px]"></div>
                                <span className="text-xl font-bold hidden lg:block whitespace-nowrap">McBride Technology Services</span>
                            </div>
                        </div>

                        {/* Right Menu */}
                        <div className="flex space-x-6">
                            <NavbarItems items={navbarMenuList.slice(Math.ceil(navbarMenuList.length / 2))} page={page} />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Container - Using group for hover functionality */}
                <div className="group md:hidden relative">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white h-[60px] w-[60px] flex items-center justify-center hover:bg-primary_light transition-colors"
                        aria-label="Menu">
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Mobile Menu Overlay */}
                    <div className="absolute right-0 top-full w-48 bg-primary_darkest shadow-lg rounded-bl-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="py-4 px-4">
                            <div className="flex flex-col space-y-4">
                                <NavbarItems items={navbarMenuList} page={page} isMobile={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
