import React from 'react';
import { Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Button } from '@react-email/components';
import { KanbanIssue } from '@/db/schema';

type IssueTypeColors = {
    [key: string]: string;
};

const typeColors: IssueTypeColors = {
    bug: '#ef4444',
    feature: '#8b5cf6',
    improvement: '#3b82f6',
    task: '#6b7280',
};

type IssuePriorityColors = {
    [key: string]: string;
};

const priorityColors: IssuePriorityColors = {
    low: '#22c55e',
    medium: '#3b82f6',
    high: '#f97316',
    critical: '#ef4444',
};

export type KanbanIssueEmailProps = {
    issue: KanbanIssue;
    actionType: 'created' | 'updated' | 'statusChanged' | 'assigned' | 'commented';
    actionBy?: string;
    comment?: string;
    baseUrl: string;
};

export default function KanbanIssueEmail({ issue, actionType, actionBy, comment, baseUrl }: KanbanIssueEmailProps) {
    // Get subject line based on action type
    const getSubjectLine = () => {
        switch (actionType) {
            case 'created':
                return `New Kanban Issue: ${issue.title}`;
            case 'updated':
                return `Kanban Issue Updated: ${issue.title}`;
            case 'statusChanged':
                return `Kanban Issue Status Changed: ${issue.title} is now ${issue.status.replace('_', ' ')}`;
            case 'assigned':
                return `Kanban Issue Assigned: ${issue.title}`;
            case 'commented':
                return `New Comment on Kanban Issue: ${issue.title}`;
            default:
                return `Kanban Issue Update: ${issue.title}`;
        }
    };

    const issueUrl = `${baseUrl}/admin/issue?issue_id=${issue.uuid}`;

    return (
        <Html>
            <Head />
            <Preview>{getSubjectLine()}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>{getSubjectLine()}</Heading>

                    <Section style={issueHeader}>
                        <Text style={issueTitle}>{issue.title}</Text>

                        <div style={badgeContainer}>
                            <div
                                style={{
                                    ...badge,
                                    backgroundColor: typeColors[issue.type] || '#6b7280',
                                }}>
                                {issue.type}
                            </div>

                            <div
                                style={{
                                    ...badge,
                                    backgroundColor: priorityColors[issue.priority] || '#6b7280',
                                }}>
                                {issue.priority}
                            </div>

                            {issue.points && <div style={badge}>{issue.points} points</div>}
                        </div>
                    </Section>

                    <Section style={issueDetails}>
                        <Text style={subtitle}>Issue Details</Text>

                        <Text style={text}>
                            <strong>ID:</strong> {issue.id}
                            <br />
                            <strong>Status:</strong> {issue.status.replace('_', ' ')}
                            <br />
                            <strong>Assignee:</strong> {issue.assignee || 'Unassigned'}
                            <br />
                            <strong>Developer:</strong> {issue.developer || 'Unassigned'}
                            <br />
                        </Text>

                        <Hr style={hr} />

                        <Text style={subtitle}>Description</Text>
                        <Text style={description}>{issue.description}</Text>

                        {comment && (
                            <>
                                <Hr style={hr} />
                                <Text style={subtitle}>New Comment by {actionBy}</Text>
                                <Text style={commentStyle}>{comment}</Text>
                            </>
                        )}

                        <Section style={ctaContainer}>
                            <Button href={issueUrl} style={button}>
                                View Issue
                            </Button>
                        </Section>
                    </Section>

                    <Text style={footer}>This is an automated notification. Please do not reply to this email.</Text>
                </Container>
            </Body>
        </Html>
    );
}

// Define your styles as objects
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    padding: '20px 0',
} as const;

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '600px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
} as const;

const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25',
    textAlign: 'center' as const,
    margin: '20px 0',
};

const issueHeader = {
    backgroundColor: '#f8fafc',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '20px',
} as const;

const issueTitle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '10px',
} as const;

const badgeContainer = {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '8px',
    flexWrap: 'wrap' as const,
} as const;

const badge = {
    color: 'white',
    padding: '4px 10px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block',
    backgroundColor: '#6b7280',
} as const;

const issueDetails = {
    padding: '0 10px',
} as const;

const subtitle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px',
} as const;

const text = {
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: '24px',
    marginBottom: '16px',
} as const;

const description = {
    color: '#4b5563',
    fontSize: '14px',
    lineHeight: '24px',
    marginBottom: '16px',
    whiteSpace: 'pre-line' as const,
} as const;

const hr = {
    borderColor: '#e5e7eb',
    margin: '16px 0',
} as const;

const commentStyle = {
    backgroundColor: '#f9fafb',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#4b5563',
    borderLeft: '4px solid #3b82f6',
    marginBottom: '16px',
    whiteSpace: 'pre-line' as const,
} as const;

const ctaContainer = {
    textAlign: 'center' as const,
    marginTop: '24px',
    marginBottom: '24px',
} as const;

const button = {
    backgroundColor: '#3b82f6',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    padding: '12px 20px',
} as const;

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
    marginTop: '20px',
} as const;
