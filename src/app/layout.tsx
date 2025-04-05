import { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { RootProvider } from './providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'McBride Technology Services | IT Support & Web Development',
    description: 'Professional IT support, web development, and freelance engineering services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
            <body className="font-sans">
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
