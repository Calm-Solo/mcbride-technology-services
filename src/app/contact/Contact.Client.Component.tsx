'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { sendContactFormEmail } from './actions';

type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    preferredContact: 'email' | 'phone';
    bestTime: string;
};

const initialFormData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    bestTime: '',
};

export default function ContactComponent() {
    const [formData, setFormData] = useState<ContactFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await sendContactFormEmail(formData);
            setSubmitStatus('success');
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-st_darkest text-st_white">
            {/* Hero Section */}
            <section className="py-16 bg-primary_darkest">
                <div className="container mx-auto px-4 text-center group">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-st_white group-hover:text-gold_dark transition-colors">
                        Contact Us
                    </h1>
                    <p className="text-xl text-st_light max-w-3xl mx-auto group-hover:text-st_white transition-colors">
                        Have questions about your technology needs? Our team of experts is here to help. Schedule a consultation or reach
                        out with any questions.
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-12 bg-st">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-st_dark p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <Phone className="h-6 w-6 text-primary mr-3" />
                                <h3 className="text-xl font-bold text-primary_light">Phone</h3>
                            </div>
                            <p className="text-st_light mb-2">Main Office:</p>
                            <p className="text-st_white font-bold">(555) 123-4567</p>
                            <p className="text-st_light mt-4 mb-2">Support Line:</p>
                            <p className="text-st_white font-bold">(555) 987-6543</p>
                        </div>

                        <div className="bg-st_dark p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <Mail className="h-6 w-6 text-primary mr-3" />
                                <h3 className="text-xl font-bold text-primary_light">Email</h3>
                            </div>
                            <p className="text-st_light mb-2">General Inquiries:</p>
                            <p className="text-st_white font-bold">info@mcbridetechnology.com</p>
                            <p className="text-st_light mt-4 mb-2">Support:</p>
                            <p className="text-st_white font-bold">support@mcbridetechnology.com</p>
                        </div>

                        <div className="bg-st_dark p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <Clock className="h-6 w-6 text-primary mr-3" />
                                <h3 className="text-xl font-bold text-primary_light">Office Hours</h3>
                            </div>
                            <p className="text-st_light mb-2">Monday - Friday:</p>
                            <p className="text-st_white font-bold">9:00 AM - 5:00 PM EST</p>
                            <p className="text-st_light mt-4 mb-2">Saturday:</p>
                            <p className="text-st_white font-bold">10:00 AM - 2:00 PM EST</p>
                            <p className="text-st_light mt-4 mb-2">Sunday:</p>
                            <p className="text-st_white font-bold">Closed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12 bg-st_dark">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-center text-primary_light">Get in Touch</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-st_white mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your full name"
                                        className="w-full bg-st rounded-lg px-4 py-2 text-st_white focus:ring-2 focus:ring-primary outline-none placeholder:text-st_lightest"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-st_white mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter your email address"
                                        className="w-full bg-st rounded-lg px-4 py-2 text-st_white focus:ring-2 focus:ring-primary outline-none placeholder:text-st_lightest"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-st_white mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="Enter your phone number"
                                        className="w-full bg-st rounded-lg px-4 py-2 text-st_white focus:ring-2 focus:ring-primary outline-none placeholder:text-st_lightest"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-st_white mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="What is your inquiry about?"
                                        className="w-full bg-st rounded-lg px-4 py-2 text-st_white focus:ring-2 focus:ring-primary outline-none placeholder:text-st_lightest"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-st_white mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Please provide details about your inquiry..."
                                    className="w-full bg-st rounded-lg px-4 py-2 text-st_white focus:ring-2 focus:ring-primary outline-none resize-none placeholder:text-st_lightest"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-st_white mb-2">Preferred Contact Method</label>
                                    <div className="space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                value="email"
                                                checked={formData.preferredContact === 'email'}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, preferredContact: e.target.value as 'email' | 'phone' })
                                                }
                                                className="form-radio text-primary"
                                            />
                                            <span className="ml-2 text-st_white">Email</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                value="phone"
                                                checked={formData.preferredContact === 'phone'}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, preferredContact: e.target.value as 'email' | 'phone' })
                                                }
                                                className="form-radio text-primary"
                                            />
                                            <span className="ml-2 text-st_white">Phone</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="bestTime" className="block text-sm font-medium text-st_white mb-2">
                                        Best Time to Contact
                                    </label>
                                    <select
                                        id="bestTime"
                                        value={formData.bestTime}
                                        onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                                        className="w-full bg-st rounded-lg px-4 py-2 text-st_white focus:ring-2 focus:ring-primary outline-none placeholder:text-st_lightest">
                                        <option value="" className="text-st_lightest">
                                            Select a time
                                        </option>
                                        <option value="morning">Morning (9AM - 12PM)</option>
                                        <option value="afternoon">Afternoon (12PM - 4PM)</option>
                                        <option value="evening">Evening (4PM - 6PM)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-primary text-st_white px-8 py-3 rounded-lg flex items-center space-x-2 hover:bg-primary_light transition-colors ${
                                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}>
                                    <Send className="h-5 w-5" />
                                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                </button>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="text-green-400 text-center">
                                    Thank you for your message! We&apos;ll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="text-red-400 text-center">There was an error sending your message. Please try again.</div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-12 bg-st">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-st_dark p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <MapPin className="h-6 w-6 text-primary mr-3" />
                                <h3 className="text-xl font-bold text-primary_light">Our Location</h3>
                            </div>
                            <p className="text-st_light mb-4">
                                3626 Fair Oaks Blvd
                                <br />
                                Sacramento, CA 95864
                                <br />
                                United States
                            </p>
                            <div className="h-[400px] rounded-lg overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3118.8859670454483!2d-121.38387548431568!3d38.62006177961685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ada8b063e3d4f%3A0x76d8506766d55d78!2s3626%20Fair%20Oaks%20Blvd%2C%20Sacramento%2C%20CA%2095864!5e0!3m2!1sen!2sus!4v1627945432427!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    className="w-full h-full"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
