import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface TestimonialAuthor {
    name: string;
    handle?: string;
    avatar: string;
    title?: string;
    company?: string;
}

interface TestimonialCardProps {
    author: TestimonialAuthor;
    text: string;
    href?: string;
}

export function TestimonialCard({ author, text, href }: TestimonialCardProps) {
    const CardContent = () => (
        <div className="group/testimonial flex flex-col gap-4 rounded-xl border border-st_dark bg-st_darkest p-6 shadow-lg transition-all hover:bg-st_dark w-[280px] sm:w-[320px]">
            <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary">
                    <Image src={author.avatar} alt={author.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                    <p className="font-bold text-primary group-hover/testimonial:text-primary_dark">{author.name}</p>
                    {author.handle && <p className="text-sm text-st_lightest group-hover/testimonial:text-st_white">{author.handle}</p>}
                    {author.title && author.company && (
                        <p className="text-sm text-st_lightest group-hover/testimonial:text-st_white">
                            {author.title}, {author.company}
                        </p>
                    )}
                    {author.title && !author.company && (
                        <p className="text-sm text-st_lightest group-hover/testimonial:text-st_white">{author.title}</p>
                    )}
                </div>
            </div>

            <div>
                <p className="text-sm/relaxed text-st_lightest group-hover/testimonial:text-st_white">{text}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="group">
                <CardContent />
            </Link>
        );
    }

    return <CardContent />;
}
