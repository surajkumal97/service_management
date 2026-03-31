'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Clock, CheckCircle, Home, AlertCircle } from 'lucide-react';

interface PMRecord {
  id: number;
  hospital: string;
  brand: string;
  model: string;
  serialNumber: string;
  dueDate: string;
  status: 'Pending' | 'Overdue';
}

const initialData: PMRecord[] = [
  { id: 1, hospital: 'Example Hospital', brand: 'Brand X', model: 'Model Y', serialNumber: 'SN123456', dueDate: '2024-04-01', status: 'Pending' },
  { id: 2, hospital: 'Another Hospital', brand: 'Brand A', model: 'Model B', serialNumber: 'SN654321', dueDate: '2024-04-02', status: 'Overdue' },
  { id: 3, hospital: 'City General Hospital', brand: 'Philips', model: 'Affiniti 30', serialNumber: 'SN789012', dueDate: '2024-04-05', status: 'Pending' },
  { id: 4, hospital: 'Regional Medical Center', brand: 'GE', model: 'Logiq S8', serialNumber: 'SN345678', dueDate: '2024-04-03', status: 'Overdue' },
];

export default function PendingPM() {
  const [records, setRecords] = useState<PMRecord[]>(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const filteredRecords = records.filter(
    (record) =>
      record.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompletePM = (id: number) => {
    setRecords(records.filter((record) => record.id !== id));
    alert('PM marked as completed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex items-center">
              <Clock className="text-white mr-2" size={24} />
              <h1 className="text-xl font-bold text-white">Pending PM</h1>
            </div>

            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-300" size={16} />
              </div>
              <input
                type="text"
                placeholder="Search S.N or Hospital"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-1 text-sm border border-blue-400 rounded-md bg-blue-500 bg-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:bg-blue-600 focus:bg-opacity-30"
              />
            </div>

            <div className="text-white flex items-center text-sm">
              <span className="hidden sm:inline mr-3">
                {currentTime.toLocaleDateString()}
              </span>
              <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-100 text-blue-800 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">Hospital</th>
                  <th className="px-4 py-2 text-left">Brand</th>
                  <th className="px-4 py-2 text-left">Model</th>
                  <th className="px-4 py-2 text-left">S.N</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{record.hospital}</td>
                      <td className="px-4 py-2">{record.brand}</td>
                      <td className="px-4 py-2">{record.model}</td>
                      <td className="px-4 py-2 font-medium">{record.serialNumber}</td>
                      <td className="px-4 py-2">{record.dueDate}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 inline-flex text-xs rounded-full ${
                            record.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {record.status === 'Pending' ? (
                            <Clock size={12} className="mr-1" />
                          ) : (
                            <AlertCircle size={12} className="mr-1" />
                          )}
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleCompletePM(record.id)}
                          className="px-2 py-1 rounded text-xs flex items-center gap-1 bg-green-100 text-green-600 hover:bg-green-200 transition-all"
                        >
                          <CheckCircle size={12} /> Complete PM
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
        className="fixed bottom-4 right-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all"
      >
        <Home size={20} />
      </Link>
    </div>
  );
}
