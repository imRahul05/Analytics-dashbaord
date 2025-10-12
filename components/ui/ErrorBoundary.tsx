import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// FIX: Changed `React.Component` to the named import `Component` to correctly establish inheritance and make `this.props` available.
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-900 text-red-200 rounded-lg h-full flex flex-col items-center justify-center">
            <h2 className="font-bold">Widget Error</h2>
            <p className="text-sm">Something went wrong with this widget.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
