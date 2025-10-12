import React from 'react';
import { WidgetType, WidgetConfig } from './types';

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
);
const TableIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const DocumentTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const CollectionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
);

export const WIDGET_DEFINITIONS: {
  type: WidgetType;
  name: string;
  description: string;
  // FIX: Changed JSX.Element to React.ReactElement to resolve namespace issue.
  icon: React.ReactElement;
  defaultConfig: WidgetConfig;
  defaultGrid: { w: number; h: number };
}[] = [
  {
    type: WidgetType.LineChart,
    name: 'Revenue Over Time',
    description: 'Displays revenue trends over a selected period.',
    icon: <ChartBarIcon />,
    defaultConfig: { title: 'Revenue Over Time' },
    defaultGrid: { w: 6, h: 8 },
  },
  {
    type: WidgetType.UsersTable,
    name: 'Users Table',
    description: 'A searchable and filterable table of users.',
    icon: <TableIcon />,
    defaultConfig: { title: 'Users' },
    defaultGrid: { w: 8, h: 9 },
  },
  {
    type: WidgetType.SimpleKpi,
    name: 'Simple KPI',
    description: 'A single key performance indicator.',
    icon: <CollectionIcon />,
    defaultConfig: { 
      title: 'New Users',
      metric: 'newUsers',
      description: 'Last 30 days',
    },
    defaultGrid: { w: 3, h: 4 },
  },
  {
    type: WidgetType.Notes,
    name: 'Notes',
    description: 'A markdown-enabled text block for notes.',
    icon: <DocumentTextIcon />,
    defaultConfig: {
      title: 'My Notes',
      content: '# Hello World\n\nThis is a *markdown* note.',
    },
    defaultGrid: { w: 4, h: 6 },
  },
];
