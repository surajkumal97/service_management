'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle, Home } from 'lucide-react';

interface PMRecord {
  id: number;
  hospital: string;
  hospitalLocation: string;
  brand: string;
  model: string;
  serialNumber: string;
  completedDate: string;
}

const initialData: PMRecord[] = [
  { id: 1, hospital: 'Hospital A', hospitalLocation: 'New York, NY', brand: 'Brand X', model: 'Model 123', serialNumber: 'SN456', completedDate: '2024-03-15' },
  { id: 2, hospital: 'Hospital B', hospitalLocation: 'Boston, MA', brand: 'Brand Y', model: 'Model 789', serialNumber: 'SN101', completedDate: '2024-03-14' },
  { id: 3, hospital: 'Hospital C', hospitalLocation: 'Chicago, IL', brand: 'Brand Z', model: 'Model 1011', serialNumber: 'SN1213', completedDate: '2024-03-13' },
  { id: 4, hospital: 'Hospital D', hospitalLocation: 'Los Angeles, CA', brand: 'Philips', model: 'Affiniti 30', serialNumber: 'SN1415', completedDate: '2024-03-12' },
  { id: 5, hospital: 'Hospital E', hospitalLocation: 'Houston, TX', brand: 'GE', model: 'Logiq S8', serialNumber: 'SN1617', completedDate: '2024-03-11' },
];

export default function PMDone() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

  const filteredRecords = initialData.filter(
    (record) =>
      record.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              PM Done Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Preventive Maintenance Tracking System</p>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">Today is</div>
            <div className="font-semibold text-gray-700">{currentDate}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by hospital, brand, model or S.N..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        <div className="rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    System S.N
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.hospital}</div>
                        <div className="text-sm text-gray-500">{record.hospitalLocation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.brand}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{record.model}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{record.serialNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.completedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
      >
        <Home size={24} />
      </Link>
    </div>
  );
}
