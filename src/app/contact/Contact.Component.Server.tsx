import React from 'react';
import HeroSection from '@/components/ui/HeroSection';

export default function ContactComponentServer() {
    return (
        <>
            <HeroSection
                title="Contact Us"
                description="Have questions or ready to discuss your project? Reach out to us using the form below or contact us directly."
                buttons={[]}
                backgroundClass="bg-primary_darkest"
                withAnimation={true}
            />

            <div className="bg-st_dark py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-st_dark p-8 rounded-lg shadow-lg">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-st_white mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="tech-input w-full"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-st_white mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="tech-input w-full"
                                            placeholder="Your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-st_white mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="tech-input w-full"
                                        placeholder="Subject"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-st_white mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="tech-input w-full"
                                        placeholder="Your message"
                                        required></textarea>
                                </div>

                                <div className="text-center">
                                    <button type="submit" className="btn-primary">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6 rounded-lg bg-st_dark shadow-md">
                                <h3 className="text-xl font-bold mb-2 text-primary">Email</h3>
                                <p className="text-st_white">contact@mcbridetechnology.com</p>
                            </div>

                            <div className="p-6 rounded-lg bg-st_dark shadow-md">
                                <h3 className="text-xl font-bold mb-2 text-primary">Phone</h3>
                                <p className="text-st_white">(555) 123-4567</p>
                            </div>

                            <div className="p-6 rounded-lg bg-st_dark shadow-md">
                                <h3 className="text-xl font-bold mb-2 text-primary">Address</h3>
                                <p className="text-st_white">
                                    123 Tech Lane
                                    <br />
                                    San Francisco, CA 94103
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
