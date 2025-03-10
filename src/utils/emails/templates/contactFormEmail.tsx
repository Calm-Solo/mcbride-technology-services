import React from 'react';
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components';

// Define color variables based on tailwind.config.ts
const colors = {
    primary: '#57cc99',
    primary_light: '#80ed99',
    primary_lightest: '#c7f9cc',
    st_dark: '#1F2937',
    st: '#374151',
    st_lightest: '#6B7280',
    st_white: '#F9FAFB',
    white: '#ffffff',
};

type ContactFormEmailProps = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    preferredContact: 'email' | 'phone';
    bestTime: string;
};

export default function ContactFormEmail({ name, email, phone, subject, message, preferredContact, bestTime }: ContactFormEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>New Contact Form Submission from {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Contact Form Submission</Heading>
                    <Text style={text}>You have received a new contact form submission from your website.</Text>

                    <Section style={section}>
                        <Text style={sectionTitle}>Contact Details:</Text>
                        <Text style={details}>Name: {name}</Text>
                        <Text style={details}>Email: {email}</Text>
                        <Text style={details}>Phone: {phone || 'Not provided'}</Text>
                        <Text style={details}>Subject: {subject}</Text>
                        <Text style={details}>Preferred Contact Method: {preferredContact}</Text>
                        <Text style={details}>Best Time to Contact: {bestTime || 'Not specified'}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Text style={sectionTitle}>Message:</Text>
                        <Text style={details}>{message}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>This is an automated email from McBride Technology Services contact form.</Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: colors.st_dark,
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
} as const;

const container = {
    backgroundColor: colors.st,
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
} as const;

const h1 = {
    color: colors.primary,
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25',
    marginBottom: '24px',
    textAlign: 'center',
} as const;

const text = {
    color: colors.st_white,
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
} as const;

const section = {
    padding: '24px',
    backgroundColor: colors.st_dark,
    borderRadius: '6px',
    margin: '16px 0',
    borderLeft: `3px solid ${colors.primary}`,
} as const;

const sectionTitle = {
    color: colors.primary,
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.25',
    marginBottom: '16px',
} as const;

const details = {
    color: colors.st_white,
    fontSize: '14px',
    lineHeight: '24px',
    marginBottom: '4px',
} as const;

const hr = {
    borderColor: colors.primary,
    margin: '16px 0',
} as const;

const footer = {
    color: colors.st_lightest,
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
    marginTop: '32px',
} as const;
