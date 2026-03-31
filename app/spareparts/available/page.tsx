"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Search, Eye, Edit, Trash2, X, Plus, Box } from "lucide-react";

interface PartData {
  id: number;
  partName: string;
  partNumber: string;
  quantity: number;
  location: string;
  description: string;
}

const availablePartsData: PartData[] = [
  { id: 101, partName: "ECG Leads", partNumber: "ECG-456", quantity: 15, location: "Main Storage", description: "12-lead ECG cable set with patient connectors" },
  { id: 102, partName: "Infusion Pump", partNumber: "INF-789", quantity: 8, location: "ICU Storage", description: "Large volume infusion pump for critical care" },
  { id: 103, partName: "Nebulizer Kit", partNumber: "NEB-101", quantity: 25, location: "Pediatric Ward", description: "Pediatric nebulizer kit with mask and tubing" },
  { id: 104, partName: "Surgical Light Bulb", partNumber: "LIGHT-2023", quantity: 12, location: "OR Storage", description: "Halogen bulb for surgical light fixtures" },
  { id: 105, partName: "Wheelchair Caster", partNumber: "WC-789", quantity: 6, location: "Rehab Center", description: "Heavy-duty wheelchair caster wheel assembly" },
];

export default function AvailablePartsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPart, setSelectedPart] = useState<PartData | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [partsData, setPartsData] = useState<PartData[]>(availablePartsData);
  const [newPart, setNewPart] = useState({ partName: "", partNumber: "", quantity: 0, description: "" });

  const filteredData = partsData.filter((item) =>
    item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const showDetails = (part: PartData) => {
    setSelectedPart(part);
    setShowDetailsModal(true);
  };

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...partsData.map(p => p.id)) + 1;
    setPartsData([
      { ...newPart, id: newId, location: "Main Storage" },
      ...partsData,
    ]);
    setNewPart({ partName: "", partNumber: "", quantity: 0, description: "" });
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start mb-6 flex-col md:flex-row">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <Link href="/spareparts" className="text-blue-500 hover:text-blue-700 mr-3">
                  <Home className="w-6 h-6" />
                </Link>
                Parts Management System
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Part
              </button>
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <span className="text-sm font-medium">A</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <label className="mr-2 text-gray-700">Rows:</label>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Part Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Part Number</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Quantity</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Location</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{row.id}</td>
                    <td className="py-3 px-4">{row.partName}</td>
                    <td className="py-3 px-4">{row.partNumber}</td>
                    <td className="py-3 px-4">{row.quantity}</td>
                    <td className="py-3 px-4">{row.location}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => showDetails(row)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let page = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  page = currentPage - 2 + i;
                }
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : ""}`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetailsModal && selectedPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Part Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Part Information</h3>
                <p className="mt-1"><span className="font-medium">Name:</span> {selectedPart.partName}</p>
                <p className="mt-1"><span className="font-medium">Number:</span> {selectedPart.partNumber}</p>
                <p className="mt-1"><span className="font-medium">Quantity:</span> {selectedPart.quantity}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <p className="mt-1">{selectedPart.location}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-semibold text-gray-700">Description</h3>
                <p className="mt-1">{selectedPart.description}</p>
              </div>
            </div>
            <div className="pt-4 flex justify-end space-x-3">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Print
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Box className="w-4 h-4 mr-2 inline" /> Check Inventory
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Part</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddPart} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Part Name</label>
                <input
                  type="text"
                  value={newPart.partName}
                  onChange={(e) => setNewPart({ ...newPart, partName: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Part Number</label>
                <input
                  type="text"
                  value={newPart.partNumber}
                  onChange={(e) => setNewPart({ ...newPart, partNumber: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={newPart.quantity || ""}
                  onChange={(e) => setNewPart({ ...newPart, quantity: Number(e.target.value) })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newPart.description}
                  onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Add Part
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
