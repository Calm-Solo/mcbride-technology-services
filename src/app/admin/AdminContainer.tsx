'use client';

import React from 'react';
import Link from 'next/link';
import UsersTab from './_tabs/Users.Component';

interface AdminContainerProps {
    // We keep the interface property for backward compatibility
    // but we don't actually use it
    initialTab?: string;
}

export default function AdminContainer({} /* initialTab is not used */ : AdminContainerProps) {
    return (
        <div className="flex flex-col w-full h-full items-center p-8 gap-8 overflow-y-auto">
            <div className="flex flex-col w-full h-fit max-w-7xl p-6 gap-4 border shadow-lg rounded-lg bg-st_darkest text-st_white">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                    <Link href="/" className="text-primary hover:text-primary_light transition-colors text-sm font-medium">
                        Back to Home
                    </Link>
                </div>

                {/* Single tab - Users */}
                <div className="flex flex-row gap-2 w-full rounded-lg px-1 pl-0 items-center justify-start">
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium border border-primary text-primary shadow-sm">
                        Users
                    </div>
                </div>

                {/* User tab content */}
                <div className="mt-2">
                    <UsersTab />
                </div>
            </div>
        </div>
    );
}
