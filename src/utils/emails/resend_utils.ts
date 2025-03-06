import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailParams = {
    from: string;
    to: string[];
    subject: string;
    html: string;
};

export async function sendEmail({ from, to, subject, html }: SendEmailParams) {
    try {
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            html,
        });

        if (error) {
            console.error('Error sending email:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
