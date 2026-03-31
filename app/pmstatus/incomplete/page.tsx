'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Clock, AlertCircle, CheckCircle, Plus, Home, Hospital } from 'lucide-react';

interface IncompletePMRecord {
  id: number;
  hospital: string;
  hospitalLocation: string;
  brand: string;
  model: string;
  serialNumber: string;
  dueDate: string;
  dueDateInfo: string;
  status: 'Pending' | 'Overdue';
}

const initialData: IncompletePMRecord[] = [
  { id: 1, hospital: 'City General Hospital', hospitalLocation: 'New York, NY', brand: 'Brand X', model: 'Model Y', serialNumber: 'SN123456', dueDate: 'May 15, 2023', dueDateInfo: 'in 3 days', status: 'Pending' },
  { id: 2, hospital: 'Regional Medical Center', hospitalLocation: 'Boston, MA', brand: 'Brand A', model: 'Model B', serialNumber: 'SN654321', dueDate: 'Apr 28, 2023', dueDateInfo: '4 days overdue', status: 'Overdue' },
  { id: 3, hospital: 'University Hospital', hospitalLocation: 'Chicago, IL', brand: 'Brand Z', model: 'Model C', serialNumber: 'SN987654', dueDate: 'May 20, 2023', dueDateInfo: 'in 8 days', status: 'Pending' },
  { id: 4, hospital: 'Memorial Hospital', hospitalLocation: 'Houston, TX', brand: 'Philips', model: 'Affiniti 50', serialNumber: 'SN112233', dueDate: 'Apr 25, 2023', dueDateInfo: '7 days overdue', status: 'Overdue' },
];

export default function IncompletePM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const filteredRecords = initialData.filter(
    (record) =>
      record.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPending = () => {
    alert('Add to pending list functionality will go here');
  };

  const stats = [
    { label: 'Pending PMs', value: initialData.filter(r => r.status === 'Pending').length, color: 'border-yellow-500', bgColor: 'bg-yellow-100', textColor: 'text-yellow-600', icon: Clock },
    { label: 'Overdue', value: initialData.filter(r => r.status === 'Overdue').length, color: 'border-red-500', bgColor: 'bg-red-100', textColor: 'text-red-600', icon: AlertCircle },
    { label: 'Completed Today', value: 8, color: 'border-green-500', bgColor: 'bg-green-100', textColor: 'text-green-600', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-sky-700 to-sky-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="text-white" size={24} />
              <h1 className="text-xl font-bold text-white">Incomplete PM Dashboard</h1>
            </div>

            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-sky-200" size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by S.N or Hospital"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-sky-600 bg-opacity-30 text-white placeholder-sky-200 border border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center space-x-4 text-sky-100">
              <span className="hidden sm:inline">
                {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <span className="font-medium">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white rounded-lg shadow p-4 border-l-4 ${stat.color}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor} ${stat.textColor}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-y-auto max-h-[calc(100vh-340px)]">
            <table className="w-full">
              <thead className="bg-sky-50 text-sky-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Hospital</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Equipment</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">S.N</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Due Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center">
                            <Hospital className="text-sky-600" size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{record.hospital}</div>
                            <div className="text-sm text-gray-500">{record.hospitalLocation}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{record.brand}</div>
                        <div className="text-sm text-gray-500">{record.model}</div>
                      </td>
                      <td className="px-6 py-4 font-medium">{record.serialNumber}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{record.dueDate}</div>
                        <div className={`text-xs ${record.status === 'Overdue' ? 'text-red-500' : 'text-gray-500'}`}>
                          {record.dueDateInfo}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            record.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800 animate-pulse'
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={handleAddPending}
                          className="px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all ml-auto"
                        >
                          <Plus size={12} /> Add pending list
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Link
        href="/"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-700 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        <Home size={24} />
      </Link>
    </div>
  );
}
