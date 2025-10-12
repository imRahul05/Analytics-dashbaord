
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getKpiData, KpiData } from '../../services/mockApiService';
import Spinner from '../ui/Spinner';
import { WidgetConfig } from '../../types';

interface KpiWidgetProps {
  config: WidgetConfig;
}

const KpiWidget: React.FC<KpiWidgetProps> = ({ config }) => {
  const { metric, description } = config;
  
  const { data, isLoading, isError, error } = useQuery<KpiData, Error>({
    queryKey: ['kpiData'],
    queryFn: getKpiData,
    staleTime: 5 * 60 * 1000 // Cache for 5 mins
  });

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>;
  if (isError) return <div className="text-red-400">Error: {error.message}</div>;

  const kpi = data ? data[metric as keyof KpiData] : null;

  if (!kpi) return <div className="text-yellow-400">Metric '{metric}' not found.</div>;

  const isPositive = kpi.change >= 0;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <p className="text-gray-400 text-sm">{description}</p>
        <p className="text-4xl font-bold text-white mt-2">{kpi.value.toLocaleString()}</p>
      </div>
      <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )}
        <span>{Math.abs(kpi.change)}%</span>
      </div>
    </div>
  );
};

export default KpiWidget;