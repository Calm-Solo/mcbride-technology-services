import { cn } from '@/lib/utils';
import { TestimonialCard, TestimonialAuthor } from '@/components/ui/testimonial-card';

interface TestimonialsSectionProps {
    title: string;
    description: string;
    testimonials: Array<{
        author: TestimonialAuthor;
        text: string;
        href?: string;
    }>;
    className?: string;
}

export function TestimonialsSection({ title, description, testimonials, className }: TestimonialsSectionProps) {
    return (
        <section className={cn('text-foreground', 'py-12 sm:py-24 md:py-32 px-0', className)}>
            <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
                <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
                    <h2 className="w-full text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight text-primary">{title}</h2>
                    <p className="text-md w-full font-medium text-st_lightest sm:text-xl">{description}</p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="flex w-full group">
                        <div className="animate-marquee flex shrink-0 items-center gap-6 group-hover:[animation-play-state:paused]">
                            {[...Array(2)].map((_, setIndex) =>
                                testimonials.map((testimonial, i) => (
                                    <div key={`${setIndex}-${i}`} className="w-[320px] flex-shrink-0">
                                        <TestimonialCard {...testimonial} />
                                    </div>
                                ))
                            )}
                        </div>
                        <div
                            className="animate-marquee flex shrink-0 items-center gap-6 group-hover:[animation-play-state:paused]"
                            aria-hidden="true">
                            {[...Array(2)].map((_, setIndex) =>
                                testimonials.map((testimonial, i) => (
                                    <div key={`duplicate-${setIndex}-${i}`} className="w-[320px] flex-shrink-0">
                                        <TestimonialCard {...testimonial} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-st_darkest" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-st_darkest" />
                </div>
            </div>
        </section>
    );
}
