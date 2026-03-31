"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Search, Plus, X } from "lucide-react";

interface PartData {
  id: number;
  hospital: string;
  partName: string;
  partNumber: string;
  requiredDate: string;
  quantity: number;
  status: string;
}

const partsData: PartData[] = [
  { id: 1, hospital: "City General Hospital", partName: "MRI Coil", partNumber: "MC-4500", requiredDate: "2025-05-15", quantity: 2, status: "Pending" },
  { id: 2, hospital: "Regional Medical Center", partName: "X-Ray Tube", partNumber: "XT-7800", requiredDate: "2025-04-28", quantity: 1, status: "Shipped" },
  { id: 3, hospital: "University Hospital", partName: "Ultrasound Probe", partNumber: "UP-3200", requiredDate: "2025-05-02", quantity: 3, status: "Processing" },
  { id: 4, hospital: "Children's Hospital", partName: "ECG Electrodes", partNumber: "EE-1120", requiredDate: "2025-04-20", quantity: 50, status: "Delivered" },
  { id: 5, hospital: "Veterans Hospital", partName: "Defibrillator Pads", partNumber: "DP-5500", requiredDate: "2025-05-10", quantity: 4, status: "Pending" },
  { id: 6, hospital: "Community Clinic", partName: "Blood Pressure Cuff", partNumber: "BP-2200", requiredDate: "2025-04-25", quantity: 8, status: "Processing" },
  { id: 7, hospital: "City General Hospital", partName: "Surgical Light Bulb", partNumber: "SL-4000", requiredDate: "2025-05-05", quantity: 6, status: "Shipped" },
];

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "processing": return "bg-blue-100 text-blue-800";
    case "shipped": return "bg-purple-100 text-purple-800";
    case "delivered": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function ReturnPartsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartData | null>(null);
  const [newPart, setNewPart] = useState({
    hospital: "",
    partName: "",
    partNumber: "",
    requiredDate: "",
    quantity: 0,
  });

  const filteredData = partsData.filter((item) =>
    item.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.partNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showDetails = (part: PartData) => {
    setSelectedPart(part);
    setShowDetailsModal(true);
  };

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Link href="/spareparts" className="text-blue-600 hover:text-blue-800 transition-colors">
              <Home className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Return Parts Management</h1>
          </div>
          <div className="text-gray-600 font-medium">
            <span className="bg-white px-3 py-1 rounded-lg shadow-sm">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search by hospital, part name or number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Parts
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parts Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parts Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.hospital}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.partName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.partNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.requiredDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(item.status)}`}>{item.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => showDetails(item)} className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 px-2">
            <div className="text-sm text-gray-600">
              Showing 1 to {filteredData.length} of {filteredData.length} entries
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add Return Parts</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAddPart} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                <input
                  type="text"
                  value={newPart.hospital}
                  onChange={(e) => setNewPart({ ...newPart, hospital: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Part Name</label>
                <input
                  type="text"
                  value={newPart.partName}
                  onChange={(e) => setNewPart({ ...newPart, partName: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Part Number</label>
                <input
                  type="text"
                  value={newPart.partNumber}
                  onChange={(e) => setNewPart({ ...newPart, partNumber: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                <input
                  type="date"
                  value={newPart.requiredDate}
                  onChange={(e) => setNewPart({ ...newPart, requiredDate: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  value={newPart.quantity || ""}
                  onChange={(e) => setNewPart({ ...newPart, quantity: Number(e.target.value) })}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailsModal && selectedPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Part Details</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-900">{selectedPart.partName} ({selectedPart.partNumber})</h4>
                  <p className="text-sm text-gray-600">{selectedPart.hospital}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Required Date</p>
                  <p className="font-medium">{selectedPart.requiredDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{selectedPart.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">
                    <span className={`${getStatusClass(selectedPart.status)} px-2 py-1 rounded-full text-xs`}>{selectedPart.status}</span>
                  </p>
                </div>
                <div className="col-span-2 pt-3">
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-sm text-gray-700 mt-1">No additional notes available for this part.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={() => setShowDetailsModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
