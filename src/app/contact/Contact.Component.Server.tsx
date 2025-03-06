import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import ContactComponent from './Contact.Client.Component';

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

            {/* Include the client component for the form and other interactive elements */}
            <ContactComponent />
        </>
    );
}
