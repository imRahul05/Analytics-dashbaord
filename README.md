
# React Analytics Dashboard

A highly customizable and interactive analytics dashboard application built with modern web technologies including React, TypeScript, and Tailwind CSS. This project demonstrates a modular architecture for building dynamic dashboards with features like role-based access, draggable and resizable widgets, and persistent state management.

## ✨ Features

- **Role-Based Authentication**: Simple login system with two distinct roles:
  - **Editor**: Full access to add, remove, move, resize, and duplicate widgets.
  - **Viewer**: Read-only access to view the dashboard and interact with widget data.
- **Dynamic Grid System**: Widgets are arranged on a responsive grid using `react-grid-layout`, allowing editors to fully customize the layout.
- **Multiple Dashboards**: Users can create and switch between multiple dashboard instances (e.g., "My Dashboard", "Marketing").
- **Rich Widget Library**: A collection of pre-built widgets for common analytics use-cases:
  - **Line Chart**: Visualizes time-series data (e.g., Revenue Over Time).
  - **Data Table**: Displays, filters, and searches tabular data (e.g., Users Table).
  - **KPI Card**: Shows a key performance indicator with its trend.
  - **Notes**: A simple markdown-enabled text widget for annotations.
- **State Management with Undo/Redo**: Global state is managed by Zustand, featuring a history implementation for undoing and redoing layout and widget changes.
- **Persistent State**: The entire dashboard state (widgets, layouts, active dashboard) is automatically saved to the browser's `localStorage`.
- **Asynchronous Data Fetching**: Widgets fetch their data independently using TanStack React Query, which provides caching, automatic refetching, and a clean separation of concerns.
- **Modular & Scalable**: The component structure is designed to be easily extensible, allowing for the simple addition of new widgets and features.

---

## 🛠️ Tech Stack

- **Frontend Library**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with Immer for immutability)
- **Data Fetching**: TanStack React Query
- **Grid Layout**: React Grid Layout
- **Icons**: Inline SVG
- **Module Loading**: ES Modules with Import Maps (no build step required)

---

## 📂 Project Structure

The project follows a feature-based directory structure, making it easy to locate and work on different parts of the application.

```
/
├── components/
│   ├── auth/
│   │   └── LoginPage.tsx       # Handles user authentication.
│   ├── dashboard/
│   │   ├── AddWidgetPanel.tsx  # Modal for adding new widgets.
│   │   ├── Dashboard.tsx       # Main grid layout container.
│   │   ├── Header.tsx          # Top navigation bar with controls.
│   │   └── Widget.tsx          # Generic wrapper for all widgets.
│   ├── ui/
│   │   ├── ErrorBoundary.tsx   # Catches rendering errors in widgets.
│   │   ├── Modal.tsx           # Reusable modal component.
│   │   └── Spinner.tsx         # Loading indicator.
│   └── widgets/
│       ├── KpiWidget.tsx       # KPI card component.
│       ├── LineChartWidget.tsx # Line chart component.
│       ├── NotesWidget.tsx     # Markdown notes component.
│       └── UsersTableWidget.tsx# Users table component.
├── services/
│   └── mockApiService.ts       # Simulates a backend API for data fetching.
├── store/
│   └── dashboardStore.ts       # Zustand store for global state.
├── App.tsx                     # Root component, manages auth state.
├── constants.tsx               # App-wide constants (e.g., widget definitions).
├── index.html                  # The main HTML file with import maps.
├── index.tsx                   # Application entry point.
├── metadata.json               # Project metadata.
├── types.ts                    # TypeScript type definitions.
└── README.md                   # This file.
```

---

## ⚙️ Core Concepts Explained

#### Authentication (`LoginPage.tsx`, `App.tsx`)

- Authentication is managed via `localStorage`. A session object containing the user's role (`editor` or `viewer`) is stored upon successful login.
- The root `App` component checks for this session to decide whether to render the `LoginPage` or the `Dashboard`.
- The user's role is passed down to the `Dashboard` component to conditionally enable or disable editing features.

#### State Management (`dashboardStore.ts`)

- **Zustand** is used for a minimal, hook-based state management solution.
- The store holds all dashboards, the ID of the active dashboard, and a history object for undo/redo.
- **Immer** is integrated to allow for simple, mutation-like syntax for updating state immutably.
- The **`persist` middleware** automatically saves the `dashboards` and `activeDashboardId` to `localStorage` and rehydrates the state on page load.
- The **history mechanism** tracks changes to the `dashboards` array. Any action that modifies the dashboards (e.g., `updateLayout`, `addWidget`) creates a new entry in the `past` state, enabling undo functionality.

#### Dashboard & Widgets (`Dashboard.tsx`, `Widget.tsx`)

- `Dashboard.tsx` is the central piece that fetches the active dashboard's configuration from the Zustand store.
- It uses **`react-grid-layout`** to render the widgets. The layout is derived from the `gridItem` property of each widget in the store.
- When an editor drags or resizes a widget, `react-grid-layout`'s `onLayoutChange` callback is fired, which dispatches an action to update the store.
- The generic `Widget.tsx` component acts as a wrapper. It provides a consistent header with a title and action buttons (Duplicate, Remove) for editors. It also contains the `drag-handle` class required by the grid library.
- Specific widget components (e.g., `LineChartWidget`) are dynamically rendered inside the `Widget` wrapper using `React.createElement` and a mapping defined in `Dashboard.tsx`.

---

## 🚀 How to Run Locally

This project is configured to run directly in the browser without a build step (like Vite or Webpack) or a package manager (like npm). It uses an **import map** in `index.html` to load dependencies from a CDN.

#### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- A local web server. If you have Python installed, you can use its built-in server. Alternatively, you can use a VS Code extension like **Live Server**.

#### Steps

1.  **Download/Clone Files**: Ensure you have all the project files (`index.html`, `.tsx` files, etc.) in a single directory, preserving the folder structure.

2.  **Start a Local Server**:
    - Open your terminal or command prompt.
    - Navigate into the project's root directory.
    - If you have Python 3, run the following command:
      ```bash
      python -m http.server
      ```
    - This will start a server, typically on port 8000.

3.  **Open in Browser**:
    - Open your web browser and navigate to `http://localhost:8000`.
    - The `index.html` file will be served, and the application will load.

---

##  användning

1.  **Login**:
    The application will present a login screen. Use one of the following credentials:
    - **Editor Role**:
      - **Email**: `editor@example.com`
      - **Password**: `password`
    - **Viewer Role**:
      - **Email**: `viewer@example.com`
      - **Password**: `password`

2.  **Interacting with the Dashboard**:
    - **As an Editor**:
      - Click and drag widget headers to move them.
      - Click and drag the bottom-right corner of a widget to resize it.
      - Use the icons in the widget header to duplicate or remove it.
      - Click the "Add Widget" button in the header to open a panel of available widgets.
      - Use the "Undo" and "Redo" buttons to revert or re-apply changes.
    - **As a Viewer**:
      - You can view all widgets and interact with their internal content (e.g., tooltips on charts, filters on tables), but you cannot change the dashboard layout.

