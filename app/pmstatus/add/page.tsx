'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hospital, Tag, Microchip, Barcode, Calendar, PlusCircle, Home } from 'lucide-react';

const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export default function AddPM() {
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  const [filterMonth, setFilterMonth] = useState('');
  const [formData, setFormData] = useState({
    hospitalName: '',
    brand: '',
    model: '',
    systemSN: '',
    month: '01',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    setFormData({ hospitalName: '', brand: '', model: '', systemSN: '', month: '01' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Monthly P.M Add</h1>
              <p className="text-blue-100 mt-1">Add and manage your equipment records</p>
            </div>
            <div className="text-blue-100 text-sm md:text-base mt-2 md:mt-0">{currentDate}</div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="bg-indigo-50 rounded-lg p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-indigo-800">Filter Records</h3>
              <p className="text-sm text-indigo-600">Narrow down by specific month</p>
            </div>
            <select
              id="filterMonth"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="w-full md:w-64 bg-white border-0 rounded-lg shadow-sm px-4 py-2 text-indigo-900 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Months</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Hospital Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hospital className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    id="hospitalName"
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Hospital Name"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Brand"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Microchip className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter Model"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="systemSN" className="block text-sm font-medium text-gray-700">System S.N</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Barcode className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="text"
                    id="systemSN"
                    value={formData.systemSN}
                    onChange={(e) => setFormData({ ...formData, systemSN: e.target.value })}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter System S.N"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="text-gray-400" size={18} />
                  </div>
                  <select
                    id="month"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white"
                  >
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <PlusCircle size={20} className="mr-2" />
                Add Record
              </button>
            </div>
          </form>

          <div className="mt-10 flex justify-center">
            <Link
              href="/pmstatus"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            >
              <Home size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
