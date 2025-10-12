
import React from 'react';
import useDashboardStore from '../../store/dashboardStore';
import Modal from '../ui/Modal';
import { WIDGET_DEFINITIONS } from '../../constants';
import { WidgetType } from '../../types';

interface AddWidgetPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddWidgetPanel: React.FC<AddWidgetPanelProps> = ({ isOpen, onClose }) => {
  const { addWidget } = useDashboardStore();

  const handleAddWidget = (type: WidgetType) => {
    addWidget(type);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add a new widget">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WIDGET_DEFINITIONS.map((def) => (
          <button
            key={def.type}
            onClick={() => handleAddWidget(def.type)}
            className="flex flex-col items-start p-4 bg-gray-700 rounded-lg hover:bg-gray-600 text-left transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-indigo-400">{def.icon}</div>
              <h3 className="font-bold text-white">{def.name}</h3>
            </div>
            <p className="text-sm text-gray-400">{def.description}</p>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default AddWidgetPanel;
