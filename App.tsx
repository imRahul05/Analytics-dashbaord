
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const session = localStorage.getItem('dashboard-session');
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (role: 'editor' | 'viewer') => {
    localStorage.setItem('dashboard-session', JSON.stringify({ loggedIn: true, role }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('dashboard-session');
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
        {isAuthenticated ? (
          <Dashboard onLogout={handleLogout} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;