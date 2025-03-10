import React from 'react';
import HeroSection from '@/components/ui/HeroSection';

export default function ContactComponentServer() {
    return (
        <div className="bg-st_darkest text-st_white">
            {/* Hero Section with Wavy Background */}
            <HeroSection
                title="Contact Us"
                description="We're here to help with all your technology needs. Reach out to us today."
                buttons={[
                    {
                        text: 'Call Us',
                        link: 'tel:9162697703',
                        iconName: 'Phone',
                        iconPosition: 'left',
                        textColor: 'primary',
                        textHoverColor: 'st_darkest',
                        bgHoverColor: 'primary',
                        borderColor: 'primary',
                    },
                    {
                        text: 'Email Us',
                        link: 'mailto:mdrservices916@gmail.com',
                        iconName: 'Mail',
                        iconPosition: 'left',
                        textColor: 'primary',
                        textHoverColor: 'st_darkest',
                        bgHoverColor: 'primary',
                        borderColor: 'primary',
                    },
                ]}
                backgroundType="wavy"
                contentBgOpacity={0.7}
                glowColor="primary"
                glowSize="100px"
                wavyBlur={8}
                wavySpeed="fast"
                wavyWaveWidth={60}
                wavyWaveOpacity={0.6}
                wavyVerticalOffset={25}
            />
        </div>
    );
}
