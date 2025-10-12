
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsersData, UsersData } from '../../services/mockApiService';
import Spinner from '../ui/Spinner';
import { WidgetConfig } from '../../types';

interface UsersTableWidgetProps {
    config: WidgetConfig;
}

const UsersTableWidget: React.FC<UsersTableWidgetProps> = ({ config }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const { data, isLoading, isError, error } = useQuery<UsersData, Error>({
    queryKey: ['usersData'],
    queryFn: getUsersData,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  if (isLoading) return <div className="flex items-center justify-center h-full"><Spinner /></div>;
  if (isError) return <div className="text-red-400">Error: {error.message}</div>;

  // FIX: Explicitly setting the generic type for `Set` to `<string>` helps TypeScript correctly
  // infer the array type, resolving the 'unknown' type error for the mapped options.
  const statuses = ['All', ...new Set<string>(data?.map(u => u.status) || [])];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3">Name</th>
              <th scope="col" className="px-4 py-3">Email</th>
              <th scope="col" className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(user => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-600">
                <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-900 text-green-300' :
                    user.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>{user.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && <p className="text-center p-4 text-gray-500">No users found.</p>}
      </div>
    </div>
  );
};

export default UsersTableWidget;
