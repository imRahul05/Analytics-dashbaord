
import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Layout } from 'react-grid-layout';
import type { DashboardState, Widget, WidgetType, WidgetConfig } from '../types';
import { WIDGET_DEFINITIONS } from '../constants';
import { v4 as uuidv4 } from 'uuid';

interface History<T> {
  past: T[];
  present: T;
  future: T[];
}

interface AppState {
  dashboards: DashboardState[];
  activeDashboardId: string | null;
  history: History<DashboardState[]>;
  isInitialized: boolean;
}

interface AppActions {
  setActiveDashboard: (id: string) => void;
  setInitialState: () => void;
  undo: () => void;
  redo: () => void;
  updateLayout: (newLayout: Layout[]) => void;
  addWidget: (type: WidgetType) => void;
  removeWidget: (id: string) => void;
  updateWidgetConfig: (id: string, newConfig: WidgetConfig) => void;
  duplicateWidget: (id: string) => void;
}

const emptyState: DashboardState[] = [
  { id: 'default', name: 'My Dashboard', widgets: [] },
  { id: 'marketing', name: 'Marketing', widgets: [] },
];

const useDashboardStore = create<AppState & AppActions>()(
  persist(
    (set, get) => {
      const updateHistory = (newPresent: DashboardState[]) => {
        set(produce((draft: AppState) => {
          const previousPresent = draft.history.present;
          if (JSON.stringify(previousPresent) !== JSON.stringify(newPresent)) {
            draft.history.past.push(previousPresent);
            if (draft.history.past.length > 10) {
              draft.history.past.shift();
            }
            draft.history.present = newPresent;
            draft.history.future = [];
            draft.dashboards = newPresent;
          }
        }));
      };

      return {
        dashboards: [],
        activeDashboardId: null,
        history: {
          past: [],
          present: [],
          future: [],
        },
        isInitialized: false,

        setInitialState: () => {
          if (!get().isInitialized) {
            set({
              dashboards: emptyState,
              activeDashboardId: emptyState[0].id,
              history: { past: [], present: emptyState, future: [] },
              isInitialized: true
            });
          }
        },

        setActiveDashboard: (id) => set({ activeDashboardId: id }),

        undo: () => {
          set(produce((draft: AppState) => {
            const { past, present, future } = draft.history;
            if (past.length > 0) {
              const previous = past.pop()!;
              future.unshift(present);
              draft.history.present = previous;
              draft.dashboards = previous;
              draft.activeDashboardId = previous.find(d => d.id === get().activeDashboardId)?.id || previous[0].id;
            }
          }));
        },

        redo: () => {
          set(produce((draft: AppState) => {
            const { past, present, future } = draft.history;
            if (future.length > 0) {
              const next = future.shift()!;
              past.push(present);
              draft.history.present = next;
              draft.dashboards = next;
              draft.activeDashboardId = next.find(d => d.id === get().activeDashboardId)?.id || next[0].id;
            }
          }));
        },
        
        updateLayout: (newLayout) => {
            const newDashboards = produce(get().history.present, (draft) => {
                const dashboard = draft.find(d => d.id === get().activeDashboardId);
                if(dashboard) {
                    dashboard.widgets.forEach(widget => {
                        const layoutItem = newLayout.find(l => l.i === widget.id);
                        if(layoutItem) {
                            widget.gridItem = layoutItem;
                        }
                    });
                }
            });
            updateHistory(newDashboards);
        },

        addWidget: (type) => {
            const widgetDef = WIDGET_DEFINITIONS.find(w => w.type === type);
            if (!widgetDef) return;

            const newWidget: Widget = {
                id: uuidv4(),
                type: widgetDef.type,
                config: widgetDef.defaultConfig,
                gridItem: {
                    i: uuidv4(),
                    x: 0,
                    y: Infinity, // This will stack the new widget at the bottom
                    w: widgetDef.defaultGrid.w,
                    h: widgetDef.defaultGrid.h,
                }
            };
            newWidget.gridItem.i = newWidget.id;

            const newDashboards = produce(get().history.present, (draft) => {
                const dashboard = draft.find(d => d.id === get().activeDashboardId);
                if(dashboard) {
                    dashboard.widgets.push(newWidget);
                }
            });
            updateHistory(newDashboards);
        },
        
        removeWidget: (id) => {
            const newDashboards = produce(get().history.present, (draft) => {
                const dashboard = draft.find(d => d.id === get().activeDashboardId);
                if(dashboard) {
                    dashboard.widgets = dashboard.widgets.filter(w => w.id !== id);
                }
            });
            updateHistory(newDashboards);
        },
        
        updateWidgetConfig: (id, newConfig) => {
            const newDashboards = produce(get().history.present, (draft) => {
                const dashboard = draft.find(d => d.id === get().activeDashboardId);
                if(dashboard) {
                    const widget = dashboard.widgets.find(w => w.id === id);
                    if(widget) {
                        widget.config = newConfig;
                    }
                }
            });
            updateHistory(newDashboards);
        },
        
        duplicateWidget: (id) => {
            const newDashboards = produce(get().history.present, (draft) => {
                const dashboard = draft.find(d => d.id === get().activeDashboardId);
                if(dashboard) {
                    const widgetToDuplicate = dashboard.widgets.find(w => w.id === id);
                    if(widgetToDuplicate) {
                        const newId = uuidv4();
                        const newWidget: Widget = {
                            ...widgetToDuplicate,
                            id: newId,
                            gridItem: {
                                ...widgetToDuplicate.gridItem,
                                i: newId,
                                y: Infinity // stack it
                            }
                        };
                        dashboard.widgets.push(newWidget);
                    }
                }
            });
            updateHistory(newDashboards);
        }
      };
    },
    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrate: (state) => {
        if (state) {
            state.history = {
              past: [],
              present: state.dashboards,
              future: []
            };
            state.isInitialized = true;
        }
      },
      partialize: (state) => ({
        dashboards: state.dashboards,
        activeDashboardId: state.activeDashboardId
      }),
    }
  )
);

export default useDashboardStore;
