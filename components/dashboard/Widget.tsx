
import React from 'react';
import useDashboardStore from '../../store/dashboardStore';
import { Widget as WidgetType } from '../../types';

interface WidgetProps {
  widget: WidgetType;
  children: React.ReactNode;
  isEditor: boolean;
}

const Widget: React.FC<WidgetProps> = ({ widget, children, isEditor }) => {
  const { removeWidget, duplicateWidget } = useDashboardStore();
  
  const iconClasses = "w-4 h-4 text-gray-400 hover:text-white transition-colors";

  return (
    <div className="flex flex-col h-full">
      <header className="drag-handle p-3 flex items-center justify-between border-b border-gray-700 cursor-move">
        <h2 className="font-bold text-sm truncate">{widget.config.title}</h2>
        {isEditor && (
          <div className="flex items-center gap-2">
            <button onClick={() => duplicateWidget(widget.id)} title="Duplicate Widget" className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
            <button onClick={() => removeWidget(widget.id)} title="Remove Widget" className="p-1">
             <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        )}
      </header>
      <div className="flex-grow p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Widget;
