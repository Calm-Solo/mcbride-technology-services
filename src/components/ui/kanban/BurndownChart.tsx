'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { KanbanSprint, KanbanIssue } from '@/db/schema';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

interface BurndownChartProps {
    isOpen: boolean;
    onClose: () => void;
    sprint: KanbanSprint;
    issues: KanbanIssue[];
}

export const BurndownChart: React.FC<BurndownChartProps> = ({ isOpen, onClose, sprint, issues }) => {
    if (!isOpen || !sprint) return null;

    const formatDate = (dateString: string | Date) => {
        // Create date object from the string, treating it as UTC
        const date = new Date(dateString);
        // Format with PST timezone
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            timeZone: 'America/Los_Angeles',
        });
    };

    // Format date for chart display
    const formatDateTime = (dateString: string | Date | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Los_Angeles', // PST timezone
        });
    };

    // Convert UTC date to PST
    const convertToPST = (utcDate: Date): Date => {
        return new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    };

    // Get current time in PST
    const getNowInPST = (): Date => {
        const now = new Date();
        return convertToPST(now);
    };

    const generateBurndownData = () => {
        // Add null checks for sprint.start_date and sprint.end_date
        if (!sprint || !sprint.start_date || !sprint.end_date) {
            return null;
        }

        // Create dates from UTC and convert to PST for display and calculations
        const startDate = new Date(sprint.start_date);
        const endDate = new Date(sprint.end_date);

        // Get current time in PST
        const pstNow = getNowInPST();

        // Calculate total sprint duration in hours (both dates are in UTC, so calculation is valid)
        const sprintDurationHours = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));

        // Ensure we're only using issues in the current sprint
        const sprintIssues = issues.filter((issue) => issue.sprints && issue.sprints.includes(sprint.uuid));

        // Log sprint issues for debugging
        console.log(
            'Sprint Issues:',
            sprintIssues.map((i) => ({
                id: i.id,
                title: i.title,
                points: i.points,
                status: i.status,
            }))
        );

        // Calculate the total points for all sprint issues
        const totalPoints = sprintIssues.reduce((sum, issue) => sum + (issue.points || 0), 0);

        // Check how many points are currently completed
        const currentCompletedPoints = sprintIssues
            .filter((issue) => issue.status === 'completed')
            .reduce((sum, issue) => sum + (issue.points || 0), 0);

        // Calculate in progress and not started points
        const currentInProgressPoints = sprintIssues
            .filter((issue) => issue.status === 'in_progress')
            .reduce((sum, issue) => sum + (issue.points || 0), 0);

        const currentNotStartedPoints = sprintIssues
            .filter((issue) => issue.status !== 'completed' && issue.status !== 'in_progress')
            .reduce((sum, issue) => sum + (issue.points || 0), 0);

        // Log current sprint point distribution
        console.log('Current Sprint Points:', {
            total: totalPoints,
            completed: currentCompletedPoints,
            inProgress: currentInProgressPoints,
            notStarted: currentNotStartedPoints,
            remaining: currentInProgressPoints + currentNotStartedPoints,
        });

        // Calculate ideal points burndown per hour
        const idealPointsPerHour = totalPoints / sprintDurationHours;

        const chartData = [];

        // Create data points for each day (but calculate using hours)
        // Clone endDate to avoid modifying the original
        const endDateValue = new Date(endDate.getTime());

        // Clone startDate to avoid modifying the original
        for (let currentDate = new Date(startDate.getTime()); currentDate <= endDateValue; currentDate.setDate(currentDate.getDate() + 1)) {
            // Calculate hours since start for this data point (both in UTC so calculation is valid)
            const hoursSinceStart = Math.max(0, Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)));

            // Calculate ideal points remaining at this hour
            const idealPointsRemaining = Math.max(0, totalPoints - hoursSinceStart * idealPointsPerHour);

            // Check if current date is in the future compared to now (convert to PST for comparison)
            const currentDatePST = convertToPST(currentDate);
            const isFutureDate = currentDatePST > pstNow;

            // Calculate completed points at this date
            const completedPointsAtDate = sprintIssues
                .filter((issue) => {
                    // Only count completed issues with a completed_at timestamp
                    if (issue.status !== 'completed' || !issue.completed_at) return false;

                    // Parse the completed_at date treating it as UTC
                    const completedDate = new Date(issue.completed_at);

                    // Check if the issue was completed on or before the current date
                    // (both dates are in UTC, so comparison is valid)
                    return completedDate <= currentDate;
                })
                .reduce((sum, issue) => sum + (issue.points || 0), 0);

            // For the current date (or dates very close to now), use the actual current completion status
            // rather than just the completed_at timestamp
            let actualPointsRemaining;

            if (isFutureDate) {
                // Future dates have no actual data
                actualPointsRemaining = null;
            } else if (Math.abs(currentDate.getTime() - new Date().getTime()) < 24 * 60 * 60 * 1000) {
                // For today or very recent dates, use the current actual status
                actualPointsRemaining = totalPoints - currentCompletedPoints;
            } else {
                // For past dates, use historical completion data
                actualPointsRemaining = totalPoints - completedPointsAtDate;
            }

            chartData.push({
                date: currentDate,
                dateString: formatDate(currentDate),
                hourString: formatDateTime(currentDate),
                ideal: Math.round(idealPointsRemaining * 10) / 10,
                actual: actualPointsRemaining,
                hoursSinceStart: hoursSinceStart,
            });
        }

        return {
            chartData,
            totalPoints,
            sprintDurationHours,
            currentCompletedPoints,
            currentInProgressPoints,
            currentNotStartedPoints,
            currentRemainingPoints: currentInProgressPoints + currentNotStartedPoints,
        };
    };

    const burndownData = generateBurndownData();

    if (!burndownData) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-st_dark rounded-lg border border-st_light w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl text-primary_light font-medium">Burndown Chart: {sprint.title}</h2>
                        <Button variant="ghost" size="sm" onClick={onClose} className="text-st_light hover:text-white">
                            <X size={20} />
                        </Button>
                    </div>

                    <div className="mb-4">
                        <p className="text-st_lighter text-sm mb-2">Total Points: {burndownData.totalPoints}</p>
                        <p className="text-st_lighter text-sm">
                            Sprint: {formatDateTime(sprint.start_date)} - {formatDateTime(sprint.end_date)} (PST)
                        </p>
                        <p className="text-st_lighter text-sm">Duration: {burndownData.sprintDurationHours} hours</p>

                        <div className="mt-4 bg-st rounded-lg p-3 flex flex-col space-y-1">
                            <p className="text-white text-sm font-medium">Current Sprint Status:</p>
                            <div className="grid grid-cols-4 gap-2 text-xs">
                                <div>
                                    <span className="text-st_lighter">Completed:</span>
                                    <span className="text-green-400 ml-1">{burndownData.currentCompletedPoints} pts</span>
                                </div>
                                <div>
                                    <span className="text-st_lighter">In Progress:</span>
                                    <span className="text-orange-400 ml-1">{burndownData.currentInProgressPoints} pts</span>
                                </div>
                                <div>
                                    <span className="text-st_lighter">Not Started:</span>
                                    <span className="text-red-400 ml-1">{burndownData.currentNotStartedPoints} pts</span>
                                </div>
                                <div>
                                    <span className="text-st_lighter">Remaining:</span>
                                    <span className="text-primary ml-1">{burndownData.currentRemainingPoints} pts</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[400px] w-full bg-st rounded-lg p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={burndownData.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="dateString" stroke="#a8a29e" tick={{ fill: '#a8a29e', fontSize: 12 }} />
                                <YAxis
                                    stroke="#a8a29e"
                                    tick={{ fill: '#a8a29e', fontSize: 12 }}
                                    domain={[0, burndownData.totalPoints]}
                                    label={{
                                        value: 'Points Remaining',
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { textAnchor: 'middle', fill: '#a8a29e', fontSize: 12 },
                                    }}
                                />
                                <RechartsTooltip
                                    contentStyle={{
                                        backgroundColor: '#292524',
                                        borderColor: '#737373',
                                        color: 'white',
                                    }}
                                    labelStyle={{ color: 'white' }}
                                    formatter={(value, name, props) => {
                                        if (name === 'Ideal Burndown') {
                                            return [value, 'Ideal Points Left'];
                                        }
                                        if (name === 'Actual Burndown' && value !== null) {
                                            const dataPoint = props.payload;
                                            const isAheadOfSchedule = value <= dataPoint.ideal;
                                            const diff = Math.abs(Number(value) - Number(dataPoint.ideal)).toFixed(1);

                                            return [
                                                <div key="value">
                                                    <span style={{ color: isAheadOfSchedule ? '#4ade80' : '#ef4444' }}>{value}</span>
                                                    <span
                                                        style={{
                                                            fontSize: '10px',
                                                            marginLeft: '4px',
                                                            color: isAheadOfSchedule ? '#4ade80' : '#ef4444',
                                                        }}>
                                                        ({isAheadOfSchedule ? diff + ' pts ahead' : diff + ' pts behind'})
                                                    </span>
                                                </div>,
                                                'Actual Points Left',
                                            ];
                                        }
                                        return [value, name];
                                    }}
                                    labelFormatter={(label, payload) => {
                                        if (payload && payload.length > 0) {
                                            return payload[0].payload.hourString + ' (PST)';
                                        }
                                        return label;
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="line"
                                    wrapperStyle={{ fontSize: 12, color: '#a8a29e' }}
                                />
                                <Line
                                    type="linear"
                                    dataKey="ideal"
                                    stroke="#70c0d7"
                                    strokeWidth={2}
                                    name="Ideal Burndown"
                                    strokeDasharray="5 5"
                                    dot={false}
                                    isAnimationActive={false}
                                />
                                <Line
                                    type="linear"
                                    dataKey="actual"
                                    stroke="#51b3ce"
                                    strokeWidth={3}
                                    name="Actual Burndown"
                                    connectNulls={true}
                                    activeDot={{ r: 6, fill: '#51b3ce', stroke: 'white' }}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <p className="text-sm text-st_lighter mt-4">
                        The burndown chart shows the rate at which work is completed and how much work remains to be done. The ideal line
                        represents a consistent pace from start to finish, calculated hourly (PST timezone).
                    </p>
                </div>
            </div>
        </div>
    );
};
