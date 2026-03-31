'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Laptop, Search, Plus, Eye, Edit, ChevronLeft, ChevronRight, Home, X } from 'lucide-react';

interface Equipment {
  id: number;
  hospital: string;
  equipmentId: string;
  serialNo: string;
  model: string;
  modality: string;
  installationDate: string;
}

const EquipmentList = () => {
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([
    { id: 1, hospital: "Chitwan Medical College", equipmentId: "1234", serialNo: "Qrtt123445", model: "Vistal120", modality: "Monitor", installationDate: "2023-01-15" },
    { id: 2, hospital: "Chitwan Medical College", equipmentId: "Q4567", serialNo: "VS354748", model: "True Lite", modality: "OT Light", installationDate: "2023-02-20" },
    { id: 3, hospital: "Bharatpur Hospital", equipmentId: "7890", serialNo: "XT987654", model: "UltraScan Pro", modality: "Ultrasound", installationDate: "2023-03-10" },
    { id: 4, hospital: "Bharatpur Hospital", equipmentId: "3456", serialNo: "DR123456", model: "X-Ray 2000", modality: "X-Ray", installationDate: "2023-04-05" },
    { id: 5, hospital: "Kathmandu Medical Center", equipmentId: "5678", serialNo: "VT654321", model: "VentiCare", modality: "Ventilator", installationDate: "2023-05-12" },
    { id: 6, hospital: "Kathmandu Medical Center", equipmentId: "9012", serialNo: "MN876543", model: "Vistal240", modality: "Monitor", installationDate: "2023-06-18" },
    { id: 7, hospital: "Pokhara General Hospital", equipmentId: "2345", serialNo: "TL987654", model: "Bright Lite", modality: "OT Light", installationDate: "2023-07-22" },
    { id: 8, hospital: "Pokhara General Hospital", equipmentId: "6789", serialNo: "US123456", model: "ScanMaster", modality: "Ultrasound", installationDate: "2023-08-30" },
    { id: 9, hospital: "Nepal Medical College", equipmentId: "0123", serialNo: "XR654321", model: "X-Ray Pro", modality: "X-Ray", installationDate: "2023-09-14" },
    { id: 10, hospital: "Nepal Medical College", equipmentId: "4567", serialNo: "VT123456", model: "AirFlow", modality: "Ventilator", installationDate: "2023-10-05" },
    { id: 11, hospital: "Bir Hospital", equipmentId: "8901", serialNo: "MN654321", model: "CareView", modality: "Monitor", installationDate: "2023-11-11" },
    { id: 12, hospital: "Bir Hospital", equipmentId: "2345", serialNo: "LT987654", model: "Surgical Light", modality: "OT Light", installationDate: "2023-12-25" },
    { id: 13, hospital: "Research Lab", equipmentId: "LAB001", serialNo: "LB123456", model: "Centrifuge X", modality: "Lab Equipment", installationDate: "2024-01-10" },
    { id: 14, hospital: "Research Lab", equipmentId: "LAB002", serialNo: "LB654321", model: "Microscope Pro", modality: "Lab Equipment", installationDate: "2024-02-15" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [modalityFilter, setModalityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    hospital: '',
    equipmentId: '',
    serialNo: '',
    model: '',
    modality: '',
    installationDate: new Date().toISOString().split('T')[0]
  });

  const modalities = ['Monitor', 'OT Light', 'Ventilator', 'Ultrasound', 'X-Ray', 'Lab Equipment'];

  const filteredData = equipmentData.filter(item => {
    const matchesSearch =
      item.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.modality.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesModality = modalityFilter === '' || item.modality === modalityFilter;

    return matchesSearch && matchesModality;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const formatDisplayDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    const newEquipment: Equipment = {
      id: equipmentData.length + 1,
      ...formData
    };
    setEquipmentData([newEquipment, ...equipmentData]);
    setShowModal(false);
    setFormData({ hospital: '', equipmentId: '', serialNo: '', model: '', modality: '', installationDate: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Laptop className="w-8 h-8 text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">Equipment Inventory</h1>
            </div>
            <div className="text-indigo-100">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search equipment..."
              />
            </div>
            <select
              value={modalityFilter}
              onChange={(e) => setModalityFilter(e.target.value)}
              className="block w-full sm:w-40 pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Modalities</option>
              {modalities.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow flex items-center whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Equipment
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="overflow-x-auto max-h-96">
            <table className="w-full">
              <thead className="bg-indigo-100 text-indigo-800 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Hospital</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Equipment ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Serial No.</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Model</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Modality</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Installation Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">{item.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{item.hospital}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.equipmentId}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.serialNo}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.model}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.modality}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDisplayDate(item.installationDate)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-white border-t border-gray-200 rounded-b-xl">
          <p className="text-sm text-gray-700 mb-2 sm:mb-0">
            Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{endIndex}</span> of <span className="font-medium">{filteredData.length}</span> results
          </p>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={endIndex >= filteredData.length}
              className="px-3 py-1 border border-gray-300 rounded bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <div className="flex justify-center py-4">
        <Link href="/">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all duration-200">
            <Home className="text-xl" />
          </div>
        </Link>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Equipment</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddEquipment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
                <input
                  type="text"
                  required
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter hospital name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment ID</label>
                <input
                  type="text"
                  required
                  value={formData.equipmentId}
                  onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
                  className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter equipment ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                <input
                  type="text"
                  required
                  value={formData.serialNo}
                  onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                  className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter serial number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter model"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modality</label>
                <select
                  required
                  value={formData.modality}
                  onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                  className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select modality</option>
                  {modalities.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Installation Date</label>
                <input
                  type="date"
                  required
                  value={formData.installationDate}
                  onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
                  className="w-full p-2 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentList;
