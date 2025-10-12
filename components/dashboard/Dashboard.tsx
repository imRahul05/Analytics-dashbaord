
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import useDashboardStore from '../../store/dashboardStore';
import Header from './Header';
import Widget from './Widget';
import Spinner from '../ui/Spinner';
import ErrorBoundary from '../ui/ErrorBoundary';
import AddWidgetPanel from './AddWidgetPanel';

const ReactGridLayout = WidthProvider(RGL);

const LineChartWidget = React.lazy(() => import('../widgets/LineChartWidget'));
const UsersTableWidget = React.lazy(() => import('../widgets/UsersTableWidget'));
const KpiWidget = React.lazy(() => import('../widgets/KpiWidget'));
const NotesWidget = React.lazy(() => import('../widgets/NotesWidget'));

const WIDGET_MAP = {
  LineChart: LineChartWidget,
  UsersTable: UsersTableWidget,
  SimpleKpi: KpiWidget,
  Notes: NotesWidget,
};

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { 
    dashboards, 
    activeDashboardId, 
    updateLayout, 
    setInitialState,
    isInitialized
  } = useDashboardStore();
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);

  useEffect(() => {
    // onRehydrate from persist middleware handles loading from localStorage,
    // this ensures we have a default state if localStorage is empty.
    if (!isInitialized) {
      setInitialState();
    }
  }, [setInitialState, isInitialized]);
  
  const activeDashboard = useMemo(() => 
    dashboards.find(d => d.id === activeDashboardId),
    [dashboards, activeDashboardId]
  );
  
  const layout = useMemo(() => 
    activeDashboard?.widgets.map(w => w.gridItem) || [],
    [activeDashboard]
  );

  const [role, setRole] = useState<'editor' | 'viewer'>('viewer');

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('dashboard-session') || '{}');
    setRole(session.role || 'viewer');
  }, []);

  if (!activeDashboard) {
    return <div className="flex items-center justify-center h-screen"><Spinner /></div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header 
        onLogout={onLogout} 
        onAddWidget={() => setIsAddPanelOpen(true)} 
        isEditor={role === 'editor'} 
      />
      <main className="flex-grow p-4 overflow-auto">
        <ReactGridLayout
          className="layout"
          layout={layout}
          onLayoutChange={updateLayout}
          cols={12}
          rowHeight={30}
          isDraggable={role === 'editor'}
          isResizable={role === 'editor'}
          draggableHandle=".drag-handle"
        >
          {activeDashboard.widgets.map(widget => (
            <div key={widget.id} data-grid={widget.gridItem} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <ErrorBoundary>
                <Widget widget={widget} isEditor={role === 'editor'}>
                  <Suspense fallback={<div className="flex items-center justify-center h-full"><Spinner /></div>}>
                    {React.createElement(WIDGET_MAP[widget.type], { config: widget.config, updateConfig: () => {} })}
                  </Suspense>
                </Widget>
              </ErrorBoundary>
            </div>
          ))}
        </ReactGridLayout>
      </main>
      <AddWidgetPanel isOpen={isAddPanelOpen} onClose={() => setIsAddPanelOpen(false)} />
    </div>
  );
};

export default Dashboard;