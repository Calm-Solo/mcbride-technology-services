'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useKanbanStore } from '../Kanban.Store';
import { CalendarDays, BarChart, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function SprintSection() {
    const { selectedSprint, issues } = useKanbanStore();
    const [showBurndownChart, setShowBurndownChart] = useState(false);

    // Format date for display
    const formatDate = useCallback((dateString: string | Date | null) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }, []);

    // Calculate sprint metrics
    const sprintMetrics = useMemo(() => {
        if (!selectedSprint) return null;

        // Filter issues for this sprint
        const sprintIssues = issues.filter((issue) => issue.sprints && issue.sprints.includes(selectedSprint.uuid));

        if (sprintIssues.length === 0) return null;

        // Calculate metrics
        const totalPoints = sprintIssues.reduce((sum, issue) => sum + (issue.points || 0), 0);
        const completedPoints = sprintIssues
            .filter((issue) => issue.status === 'completed')
            .reduce((sum, issue) => sum + (issue.points || 0), 0);
        const inProgressPoints = sprintIssues
            .filter((issue) => ['in_progress', 'in_review'].includes(issue.status))
            .reduce((sum, issue) => sum + (issue.points || 0), 0);
        const notStartedPoints = sprintIssues
            .filter((issue) => ['backlog', 'groomed'].includes(issue.status))
            .reduce((sum, issue) => sum + (issue.points || 0), 0);

        // Calculate days left and elapsed percentage
        const currentDate = new Date();

        // Check if sprint dates exist
        if (!selectedSprint.start_date || !selectedSprint.end_date) {
            return {
                totalPoints: 0,
                completedPoints: 0,
                inProgressPoints: 0,
                notStartedPoints: 0,
                completion: 0,
                daysLeft: 0,
                idealCompletion: 0,
            };
        }

        const startDate = new Date(selectedSprint.start_date);
        const endDate = new Date(selectedSprint.end_date);

        const totalDuration = endDate.getTime() - startDate.getTime();
        const elapsedDuration = Math.min(currentDate.getTime() - startDate.getTime(), totalDuration);
        const idealCompletion = Math.round((elapsedDuration / totalDuration) * 100);

        const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));

        // Calculate completion percentage
        const completion = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

        return {
            totalPoints,
            completedPoints,
            inProgressPoints,
            notStartedPoints,
            completion,
            daysLeft,
            idealCompletion,
        };
    }, [selectedSprint, issues]);

    // Generate burndown chart data with proper actual line tracking
    const burndownData = useMemo(() => {
        if (!selectedSprint || !sprintMetrics) return { chartData: [], totalPoints: 0 };
        if (!selectedSprint.start_date || !selectedSprint.end_date) return { chartData: [], totalPoints: 0 };

        const startDate = new Date(selectedSprint.start_date);
        const endDate = new Date(selectedSprint.end_date);
        const today = new Date();

        // Reset time part for today to make comparisons easier
        const todayNoTime = new Date(today);
        todayNoTime.setHours(0, 0, 0, 0);

        const sprintDurationDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const sprintIssues = issues.filter((issue) => issue.sprints && issue.sprints.includes(selectedSprint.uuid));
        const totalPoints = sprintIssues.reduce((sum, issue) => sum + (issue.points || 0), 0);
        const idealPointsPerDay = totalPoints / sprintDurationDays;

        const chartData = [];
        let day = 0;

        const endDateValue = new Date(endDate);
        for (let currentDate = new Date(startDate); currentDate <= endDateValue; currentDate.setDate(currentDate.getDate() + 1)) {
            // Reset time part to avoid time-of-day comparison issues
            const currentDateNoTime = new Date(currentDate);
            currentDateNoTime.setHours(0, 0, 0, 0);

            // Check if current date is in the future
            const isFutureDate = currentDateNoTime > todayNoTime;

            // Calculate ideal points remaining for this day
            const daysSinceStart = day;
            const idealPointsRemaining = Math.max(0, totalPoints - daysSinceStart * idealPointsPerDay);

            // Calculate actual points remaining by looking at completed issues
            const completedPointsAtDate = sprintIssues
                .filter((issue) => {
                    // Only count completed issues with a completed_at timestamp
                    if (issue.status !== 'completed' || !issue.completed_at) return false;

                    // Parse the completed_at date and reset the time part
                    const completedDate = new Date(issue.completed_at);
                    completedDate.setHours(0, 0, 0, 0);

                    // Check if the issue was completed on or before the current date
                    return completedDate <= currentDateNoTime;
                })
                .reduce((sum, issue) => sum + (issue.points || 0), 0);

            // Only include actual data for dates up to today
            const actualPointsRemaining = isFutureDate ? null : totalPoints - completedPointsAtDate;

            chartData.push({
                date: new Date(currentDate),
                dateString: formatDate(currentDate),
                ideal: Math.round(idealPointsRemaining * 10) / 10,
                actual: actualPointsRemaining,
                day: day + 1,
            });

            day++;
        }

        return {
            chartData,
            totalPoints,
        };
    }, [selectedSprint, sprintMetrics, issues, formatDate]);

    if (!selectedSprint) return null;

    return (
        <div className="bg-st_dark rounded-lg shadow p-4 border border-st">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <CalendarDays size={18} className="text-primary_light" />
                    <h2 className="text-xl text-white font-semibold">{selectedSprint.title}</h2>
                    {selectedSprint.is_active && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">Active</span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowBurndownChart(true)}
                        className="text-st_light hover:text-primary border-st_light hover:border-primary">
                        <BarChart size={16} className="mr-2" />
                        Burndown Chart
                    </Button>
                </div>
            </div>

            {/* <div className="text-sm text-st_light mb-4">{selectedSprint.description}</div> */}

            <div className="space-y-4">
                {/* Sprint metrics */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="bg-st p-2 rounded border border-st_light w-[120px]">
                            <div className="text-xs text-st_lighter">Start</div>
                            <div className="text-sm text-white">{formatDate(selectedSprint.start_date)}</div>
                        </div>

                        <div className="bg-st p-2 rounded border border-st_light w-[120px]">
                            <div className="text-xs text-st_lighter">End</div>
                            <div className="text-sm text-white">{formatDate(selectedSprint.end_date)}</div>
                        </div>

                        <div className="bg-st p-2 rounded border border-st_light w-[120px]">
                            <div className="text-xs text-st_lighter">Days Left</div>
                            <div className="text-sm text-white">
                                {sprintMetrics?.daysLeft} {sprintMetrics?.daysLeft === 1 ? 'day' : 'days'}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="bg-st p-2 rounded border border-st_light w-[120px]">
                            <div className="text-xs text-st_lighter">Total Points</div>
                            <div className="text-sm text-white">{sprintMetrics?.totalPoints || 0}</div>
                        </div>

                        <div className="bg-st p-2 rounded border border-green-800/40 w-[120px]">
                            <div className="text-xs text-st_lighter">Completed</div>
                            <div className="text-sm text-green-400">{sprintMetrics?.completedPoints || 0}</div>
                        </div>

                        <div className="bg-st p-2 rounded border border-orange-800/40 w-[120px]">
                            <div className="text-xs text-st_lighter">In Progress</div>
                            <div className="text-sm text-orange-400">{sprintMetrics?.inProgressPoints || 0}</div>
                        </div>

                        <div className="bg-st p-2 rounded border border-red-800/40 w-[120px]">
                            <div className="text-xs text-st_lighter">Not Started</div>
                            <div className="text-sm text-red-400">{sprintMetrics?.notStartedPoints || 0}</div>
                        </div>
                    </div>
                </div>

                {sprintMetrics && sprintMetrics.totalPoints > 0 && (
                    <div>
                        <div className="w-full h-2 bg-st_light rounded-full relative">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-in-out"
                                style={{ width: `${sprintMetrics.completion}%` }}
                            />
                            {/* Ideal progress marker */}
                            <div
                                className="absolute top-0 z-10 flex flex-col items-center cursor-help group"
                                style={{
                                    left: `${sprintMetrics.idealCompletion}%`,
                                    transform: 'translateX(-50%)',
                                    marginTop: '-8px',
                                }}
                                title={`Ideal Progress: ${sprintMetrics.idealCompletion}% - Based on current sprint timeline`}>
                                <div className="h-4 w-1.5 bg-red-500 rounded-sm"></div>
                                <div className="h-2 w-1.5 bg-red-500 -mt-0.5 rounded-b-sm"></div>
                                {/* Simple tooltip using CSS only */}
                                <div className="absolute bottom-full mb-2 px-2 py-1 bg-st border border-st_light rounded text-xs text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 pointer-events-none">
                                    Ideal Progress: {sprintMetrics.idealCompletion}%
                                    <br />
                                    Based on {selectedSprint.end_date ? formatDate(selectedSprint.end_date) : 'sprint end date'}
                                </div>
                            </div>

                            {/* Actual progress marker */}
                            <div
                                className="absolute top-0 z-10 flex flex-col items-center cursor-help group"
                                style={{
                                    left: `${sprintMetrics.completion}%`,
                                    transform: 'translateX(-50%)',
                                    marginTop: '-8px',
                                }}
                                title={`Actual Progress: ${sprintMetrics.completion}%`}>
                                <div className="h-4 w-1.5 bg-green-500 rounded-sm"></div>
                                <div className="h-2 w-1.5 bg-green-500 -mt-0.5 rounded-b-sm"></div>
                                {/* Simple tooltip using CSS only */}
                                <div className="absolute bottom-full mb-2 px-2 py-1 bg-st border border-st_light rounded text-xs text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 pointer-events-none">
                                    Actual Progress: {sprintMetrics.completion}%
                                    <br />
                                    {sprintMetrics.completion >= sprintMetrics.idealCompletion ? (
                                        <span className="text-green-400">
                                            Ahead by {sprintMetrics.completion - sprintMetrics.idealCompletion}%
                                        </span>
                                    ) : (
                                        <span className="text-red-400">
                                            Behind by {sprintMetrics.idealCompletion - sprintMetrics.completion}%
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-st_lighter">
                            <div>
                                <span className="text-red-500">Ideal: {sprintMetrics.idealCompletion}%</span>
                            </div>
                            <div
                                className={`flex items-center ${sprintMetrics.completion >= sprintMetrics.idealCompletion ? 'text-green-400' : 'text-red-400'}`}>
                                <span>Actual: {sprintMetrics.completion}%</span>
                                {sprintMetrics.completion > sprintMetrics.idealCompletion ? (
                                    <span className="inline-flex items-center ml-1" title="Ahead of schedule">
                                        <ArrowUp size={12} />
                                        <span className="ml-0.5">+{sprintMetrics.completion - sprintMetrics.idealCompletion}%</span>
                                    </span>
                                ) : sprintMetrics.completion < sprintMetrics.idealCompletion ? (
                                    <span className="inline-flex items-center ml-1" title="Behind schedule">
                                        <ArrowDown size={12} />
                                        <span className="ml-0.5">{sprintMetrics.completion - sprintMetrics.idealCompletion}%</span>
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Burndown Chart Modal */}
            <Dialog open={showBurndownChart} onOpenChange={setShowBurndownChart}>
                <DialogContent className="bg-st_dark border-st_light text-white max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl text-primary_light">Burndown Chart: {selectedSprint.title}</DialogTitle>
                    </DialogHeader>

                    <div className="mb-4">
                        <p className="text-st_lighter text-sm mb-2">Total Points: {burndownData.totalPoints}</p>
                        <p className="text-st_lighter text-sm">
                            Sprint: {formatDate(selectedSprint.start_date)} - {formatDate(selectedSprint.end_date)}
                        </p>
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

                                            return [
                                                <span key="value" style={{ color: isAheadOfSchedule ? '#4ade80' : '#ef4444' }}>
                                                    {value}
                                                </span>,
                                                'Actual Points Left',
                                            ];
                                        }
                                        return [value, name];
                                    }}
                                    labelFormatter={(label) => `Day: ${label}`}
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
                        represents a consistent pace from start to finish.
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
}
