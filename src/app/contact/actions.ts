'use server';

import React from 'react';
import { render } from '@react-email/render';
import { sendEmail } from '@/utils/emails/resend_utils';
import ContactFormEmail from '@/utils/emails/templates/contactFormEmail';

type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    preferredContact: 'email' | 'phone';
    bestTime: string;
};

export async function sendContactFormEmail(formData: ContactFormData) {
    const contact_form_email_template = React.createElement(ContactFormEmail, formData);
    const email_html = render(contact_form_email_template);

    const admin_emails = [
        'torreysmith165@gmail.com',
        'Faint05@outlook.com',
        // any additional emails
    ];

    const user_email = formData.email;

    const email_to = [...admin_emails, user_email];

    try {
        for (const admin_email of admin_emails) {
            console.log(`Sending email to ${admin_email}`);
            await sendEmail({
                from: 'contact@mcbridetechnology.com',
                to: email_to,
                subject: `New Contact Form Submission: ${formData.subject}`,
                html: await email_html,
            });
        }
        return { success: true };
    } catch (error) {
        console.error('Error sending emails:', error);
        throw error;
    }
}
