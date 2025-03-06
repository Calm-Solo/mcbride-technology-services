import React from 'react';
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components';

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
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
} as const;

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
} as const;

const h1 = {
    color: '#1f2937',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25',
    marginBottom: '24px',
    textAlign: 'center',
} as const;

const text = {
    color: '#374151',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
} as const;

const section = {
    padding: '24px',
} as const;

const sectionTitle = {
    color: '#1f2937',
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.25',
    marginBottom: '16px',
} as const;

const details = {
    color: '#374151',
    fontSize: '14px',
    lineHeight: '24px',
    marginBottom: '4px',
} as const;

const hr = {
    borderColor: '#e5e7eb',
    margin: '16px 0',
} as const;

const footer = {
    color: '#9ca3af',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
    marginTop: '32px',
} as const;
