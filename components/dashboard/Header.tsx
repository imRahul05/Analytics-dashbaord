
import React from 'react';
import useDashboardStore from '../../store/dashboardStore';

interface HeaderProps {
  onLogout: () => void;
  onAddWidget: () => void;
  isEditor: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onAddWidget, isEditor }) => {
  const { 
    dashboards, 
    activeDashboardId, 
    setActiveDashboard,
    undo,
    redo,
    history
  } = useDashboardStore();

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return (
    <header className="bg-gray-800 shadow-md p-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <select
          value={activeDashboardId || ''}
          onChange={(e) => setActiveDashboard(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
        >
          {dashboards.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        {isEditor && (
          <>
            <button
              onClick={undo}
              disabled={!canUndo}
              className="px-3 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Undo
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="px-3 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Redo
            </button>
            <button
              onClick={onAddWidget}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add Widget
            </button>
          </>
        )}
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
