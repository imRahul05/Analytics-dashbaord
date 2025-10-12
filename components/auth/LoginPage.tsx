
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (role: 'editor' | 'viewer') => void;
}

// Simple Logo SVG
const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'editor@example.com' && password === 'password') {
      onLogin('editor');
    } else if (email === 'viewer@example.com' && password === 'password') {
      onLogin('viewer');
    } else {
      setError('Invalid credentials. Please use one of the demo accounts.');
    }
  };
  
  const handleDemoLogin = (role: 'editor' | 'viewer') => {
      if (role === 'editor') {
          setEmail('editor@example.com');
          setPassword('password');
      } else {
          setEmail('viewer@example.com');
          setPassword('password');
      }
      setError('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl space-y-6">
            <div className="flex flex-col items-center space-y-2">
                <DashboardIcon />
                <h1 className="text-3xl font-bold text-center text-white">Analytics Dashboard</h1>
                <p className="text-center text-gray-400">Welcome back</p>
            </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
              </span>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-700/50 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="editor@example.com"
                required
              />
            </div>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 bg-gray-700/50 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="password"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
              Log In
            </button>
          </form>

          <div className="pt-4 border-t border-gray-700">
              <p className="text-center text-sm text-gray-400 mb-4">Click to use a demo account:</p>
              <div className="flex gap-4">
                  <div onClick={() => handleDemoLogin('editor')} className="cursor-pointer w-1/2 p-4 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-indigo-500 transition text-center">
                      <p className="font-bold text-white">Editor</p>
                      <p className="text-xs text-gray-400">Full access</p>
                  </div>
                  <div onClick={() => handleDemoLogin('viewer')} className="cursor-pointer w-1/2 p-4 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-indigo-500 transition text-center">
                      <p className="font-bold text-white">Viewer</p>
                      <p className="text-xs text-gray-400">Read-only</p>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
