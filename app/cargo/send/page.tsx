'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Truck, Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface CargoItem {
  id: number;
  goodsName: string;
  transport: string;
  date: string;
  sendBy: string;
  weight: string;
  cargoSN: string;
}

const CargoSend = () => {
  const [cargoData, setCargoData] = useState<CargoItem[]>([
    { id: 1, goodsName: 'Medical Equipment', transport: 'Road', date: '2024-03-15', sendBy: 'John Doe', weight: '150', cargoSN: 'CS001' },
    { id: 2, goodsName: 'Spare Parts', transport: 'Air', date: '2024-03-14', sendBy: 'Jane Smith', weight: '45', cargoSN: 'CS002' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [formData, setFormData] = useState({
    goodsName: '',
    transport: 'Road',
    date: new Date().toISOString().split('T')[0],
    sendBy: '',
    weight: '',
    cargoSN: ''
  });

  const filteredData = cargoData.filter(item =>
    item.goodsName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cargoSN.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleAdd = () => {
    if (!formData.goodsName || !formData.date || !formData.sendBy || !formData.weight || !formData.cargoSN) {
      alert('Please fill all required fields');
      return;
    }
    const newItem: CargoItem = {
      id: Date.now(),
      ...formData
    };
    setCargoData([newItem, ...cargoData]);
    setFormData({ goodsName: '', transport: 'Road', date: new Date().toISOString().split('T')[0], sendBy: '', weight: '', cargoSN: '' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this cargo record?')) {
      setCargoData(cargoData.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Truck className="w-8 h-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">Cargo Management</h1>
            </div>
            <div className="text-blue-100">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Goods Name or Cargo Serial Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Cargo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goods Name</label>
              <input
                type="text"
                value={formData.goodsName}
                onChange={(e) => setFormData({ ...formData, goodsName: e.target.value })}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Goods Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transport</label>
              <select
                value={formData.transport}
                onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Road">Road</option>
                <option value="Air">Air</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Send By</label>
              <input
                type="text"
                value={formData.sendBy}
                onChange={(e) => setFormData({ ...formData, sendBy: e.target.value })}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Sender"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cargo S/N</label>
              <input
                type="text"
                value={formData.cargoSN}
                onChange={(e) => setFormData({ ...formData, cargoSN: e.target.value })}
                className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Serial Number"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Cargo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Goods Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Transport</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Sender</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Weight (kg)</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Cargo S/N</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">{startIndex + index + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.goodsName}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.transport}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.sendBy}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.weight}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.cargoSN}</td>
                    <td className="px-4 py-3 whitespace-nowrap space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-2 sm:mb-0">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{endIndex}</span> of <span className="font-medium">{filteredData.length}</span> results
            </p>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={endIndex >= filteredData.length}
                className="px-3 py-1 border border-gray-300 rounded bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Link
        href="/cargo"
        className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
      >
        <Home className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default CargoSend;
