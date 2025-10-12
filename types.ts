
import type { Layout } from 'react-grid-layout';

export enum WidgetType {
  LineChart = 'LineChart',
  UsersTable = 'UsersTable',
  SimpleKpi = 'SimpleKpi',
  Notes = 'Notes',
}

export interface WidgetConfig {
  title: string;
  [key: string]: any; 
}

export interface Widget {
  id: string;
  type: WidgetType;
  config: WidgetConfig;
  gridItem: Layout;
}

export interface DashboardState {
  id: string;
  name: string;
  widgets: Widget[];
}
