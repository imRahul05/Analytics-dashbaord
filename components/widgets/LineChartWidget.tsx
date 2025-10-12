
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRevenueData, RevenueData } from '../../services/mockApiService';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Spinner from '../ui/Spinner';
import { WidgetConfig } from '../../types';

interface LineChartWidgetProps {
    config: WidgetConfig;
}

const LineChartWidget: React.FC<LineChartWidgetProps> = ({ config }) => {
    const { data, isLoading, isError, error } = useQuery<RevenueData, Error>({
        queryKey: ['revenueData'],
        queryFn: getRevenueData,
    });

    if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>;
    if (isError) return <div className="text-red-400">Error: {error.message}</div>;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value as number / 1000)}k`} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1F2937',
                        borderColor: '#4B5563',
                        color: '#E5E7EB',
                    }}
                />
                <Legend wrapperStyle={{fontSize: "12px"}} />
                <Line type="monotone" dataKey="revenue" stroke="#818CF8" strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartWidget;