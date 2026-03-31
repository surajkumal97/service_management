"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Search, Eye, Edit, X, Check } from "lucide-react";

interface PartData {
  id: number;
  hospital: string;
  partName: string;
  partNumber: string;
  requiredDate: string;
  quantity: number;
  status: string;
  description: string;
}

const sampleData: PartData[] = [
  { id: 1, hospital: "City General Hospital", partName: "MRI Coil", partNumber: "MRI-2023-001", requiredDate: "2023-11-15", quantity: 2, status: "Pending", description: "High-resolution MRI coil for neurological imaging" },
  { id: 2, hospital: "Regional Medical Center", partName: "X-Ray Tube", partNumber: "XRAY-4567", requiredDate: "2023-11-20", quantity: 1, status: "Approved", description: "High-capacity X-ray tube for radiography systems" },
  { id: 3, hospital: "Children's Hospital", partName: "Ultrasound Probe", partNumber: "US-7890", requiredDate: "2023-12-05", quantity: 3, status: "Shipped", description: "Pediatric ultrasound probe with small footprint" },
  { id: 4, hospital: "University Hospital", partName: "CT Scanner Gantry", partNumber: "CT-2023-004", requiredDate: "2023-12-10", quantity: 1, status: "Delivered", description: "64-slice CT scanner gantry assembly" },
  { id: 5, hospital: "Veterans Hospital", partName: "Defibrillator Pads", partNumber: "DEFIB-123", requiredDate: "2023-11-25", quantity: 10, status: "Pending", description: "Adult defibrillator pads, box of 10 pairs" },
  { id: 6, hospital: "City General Hospital", partName: "ECG Leads", partNumber: "ECG-456", requiredDate: "2023-12-01", quantity: 5, status: "Approved", description: "12-lead ECG cable set with patient connectors" },
  { id: 7, hospital: "Regional Medical Center", partName: "Infusion Pump", partNumber: "INF-789", requiredDate: "2023-11-30", quantity: 2, status: "Pending", description: "Large volume infusion pump for critical care" },
  { id: 8, hospital: "Children's Hospital", partName: "Nebulizer Kit", partNumber: "NEB-101", requiredDate: "2023-12-15", quantity: 20, status: "Approved", description: "Pediatric nebulizer kit with mask and tubing" },
  { id: 9, hospital: "University Hospital", partName: "Surgical Light Bulb", partNumber: "LIGHT-2023", requiredDate: "2023-11-28", quantity: 4, status: "Shipped", description: "Halogen bulb for surgical light fixtures" },
  { id: 10, hospital: "Veterans Hospital", partName: "Wheelchair Caster", partNumber: "WC-789", requiredDate: "2023-12-20", quantity: 6, status: "Pending", description: "Heavy-duty wheelchair caster wheel assembly" },
];

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "approved": return "bg-blue-100 text-blue-800";
    case "shipped": return "bg-purple-100 text-purple-800";
    case "delivered": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function RequiredPartsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPart, setSelectedPart] = useState<PartData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredData = sampleData.filter((item) => {
    const matchesSearch =
      item.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? item.requiredDate === dateFilter : true;
    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const showDetails = (part: PartData) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <Link href="/spareparts" className="text-blue-500 hover:text-blue-700 mr-3">
                <Home className="w-6 h-6" />
              </Link>
              Parts Required Dashboard
            </h1>
            <div className="flex items-center space-x-4">
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

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center">
                <label className="mr-2 text-gray-700">Date Range:</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">S.n</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Hospital name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Parts name</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Parts number</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Required date</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Quantity</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{row.id}</td>
                    <td className="py-3 px-4">{row.hospital}</td>
                    <td className="py-3 px-4">{row.partName}</td>
                    <td className="py-3 px-4">{row.partNumber}</td>
                    <td className="py-3 px-4">{row.requiredDate}</td>
                    <td className="py-3 px-4">{row.quantity}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => showDetails(row)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                        <Edit className="w-4 h-4" />
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

      {showModal && selectedPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Part Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Hospital Information</h3>
                <p className="mt-1">{selectedPart.hospital}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Part Information</h3>
                <p className="mt-1"><span className="font-medium">Name:</span> {selectedPart.partName}</p>
                <p className="mt-1"><span className="font-medium">Number:</span> {selectedPart.partNumber}</p>
                <p className="mt-1"><span className="font-medium">Quantity:</span> {selectedPart.quantity}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Dates</h3>
                <p className="mt-1"><span className="font-medium">Required by:</span> {selectedPart.requiredDate}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Status</h3>
                <p className="mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(selectedPart.status)}`}>
                    {selectedPart.status}
                  </span>
                </p>
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
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
