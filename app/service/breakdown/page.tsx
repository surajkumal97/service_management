'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Monitor, Bug, ClipboardCheck, Package, User, Clock, UserCheck, Home, Plus, Trash2, PenTool, CheckCircle, AlertTriangle } from 'lucide-react';

interface PartRow {
  id: number;
  partName: string;
  partNumber: string;
  quantity: number;
  status: 'replaced' | 'required';
}

export default function BreakdownReport() {
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  const [repairStatus, setRepairStatus] = useState('complete');
  const [parts, setParts] = useState<PartRow[]>([
    { id: 1, partName: '', partNumber: '', quantity: 1, status: 'replaced' },
  ]);
  const [engineerSigned, setEngineerSigned] = useState(false);
  const [supervisorSigned, setSupervisorSigned] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    brandName: '',
    systemModel: '',
    systemSN: '',
    softwareVersion: '',
    problemDescription: '',
    workPerformed: '',
    partialDetails: '',
    engineerName: '',
    startTime: '',
    endTime: '',
    supervisorName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addPartRow = () => {
    const newId = parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1;
    setParts([...parts, { id: newId, partName: '', partNumber: '', quantity: 1, status: 'replaced' }]);
  };

  const removePartRow = (id: number) => {
    if (parts.length > 1) {
      setParts(parts.filter(p => p.id !== id));
    }
  };

  const updatePart = (id: number, field: keyof PartRow, value: string | number) => {
    setParts(parts.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    console.log({ ...formData, parts, repairStatus });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/service"
          className="fixed bottom-6 left-6 z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all"
        >
          <Home size={24} />
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Breakdown Report</h1>
                <p className="text-blue-100 mt-1">{currentDate}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <AlertTriangle size={28} />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                <Monitor className="mr-2 text-blue-600" size={22} /> Equipment Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name <span className="text-red-500">*</span></label>
                  <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name <span className="text-red-500">*</span></label>
                  <input type="text" name="brandName" value={formData.brandName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">System Model <span className="text-red-500">*</span></label>
                  <input type="text" name="systemModel" value={formData.systemModel} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">System S/N <span className="text-red-500">*</span></label>
                  <input type="text" name="systemSN" value={formData.systemSN} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Software Version</label>
                  <input type="text" name="softwareVersion" value={formData.softwareVersion} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                <Bug className="mr-2 text-red-500" size={22} /> Problem Details
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Problem Description <span className="text-red-500">*</span></label>
                <textarea name="problemDescription" value={formData.problemDescription} onChange={handleInputChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Describe the problem encountered..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Performed <span className="text-red-500">*</span></label>
                <textarea name="workPerformed" value={formData.workPerformed} onChange={handleInputChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Describe the work done to resolve the issue..." />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                <ClipboardCheck className="mr-2 text-green-500" size={22} /> Repair Status
              </h2>

              <div className="flex flex-wrap gap-4">
                {[
                  { value: 'complete', label: 'Complete', color: 'text-green-600' },
                  { value: 'incomplete', label: 'Incomplete', color: 'text-red-600' },
                  { value: 'partially_working', label: 'Partially Working', color: 'text-yellow-600' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input type="radio" name="repairStatus" value={option.value} checked={repairStatus === option.value} onChange={(e) => setRepairStatus(e.target.value)} className="mr-2" />
                    <span className={`text-sm font-medium ${repairStatus === option.value ? option.color : 'text-gray-600'}`}>{option.label}</span>
                  </label>
                ))}
              </div>

              {repairStatus === 'partially_working' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partial Work Details</label>
                  <textarea name="partialDetails" value={formData.partialDetails} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Describe what parts are working and what still needs attention..." />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                  <Package className="mr-2 text-yellow-500" size={22} /> Parts Used/Replaced
                </h2>
                <button type="button" onClick={addPartRow} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center hover:bg-blue-700 transition-all">
                  <Plus size={16} className="mr-1" /> Add Part
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part Number</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parts.map((part) => (
                      <tr key={part.id}>
                        <td className="px-4 py-3">
                          <input type="text" value={part.partName} onChange={(e) => updatePart(part.id, 'partName', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="text" value={part.partNumber} onChange={(e) => updatePart(part.id, 'partNumber', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" min="1" value={part.quantity} onChange={(e) => updatePart(part.id, 'quantity', parseInt(e.target.value))} className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-4">
                            <label className="flex items-center">
                              <input type="radio" checked={part.status === 'replaced'} onChange={() => updatePart(part.id, 'status', 'replaced')} className="mr-1" />
                              <span className="text-sm">Replaced</span>
                            </label>
                            <label className="flex items-center">
                              <input type="radio" checked={part.status === 'required'} onChange={() => updatePart(part.id, 'status', 'required')} className="mr-1" />
                              <span className="text-sm">Required</span>
                            </label>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button type="button" onClick={() => removePartRow(part.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                <User className="mr-2 text-green-500" size={22} /> Engineer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Engineer Name <span className="text-red-500">*</span></label>
                  <input type="text" name="engineerName" value={formData.engineerName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time <span className="text-red-500">*</span></label>
                  <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time <span className="text-red-500">*</span></label>
                  <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                <UserCheck className="mr-2 text-purple-500" size={22} /> Verification
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Engineer's Verification</label>
                  <div onClick={() => setEngineerSigned(true)} className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                    {engineerSigned ? (
                      <span className="text-green-600 flex items-center"><CheckCircle size={20} className="mr-2" />Signed</span>
                    ) : (
                      <span className="text-gray-500 flex items-center"><PenTool size={16} className="mr-2" />Click to sign</span>
                    )}
                  </div>
                  <input type="text" name="engineerName" placeholder="Engineer's name" value={formData.engineerName} onChange={handleInputChange} required className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor's Verification</label>
                  <div onClick={() => setSupervisorSigned(true)} className="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                    {supervisorSigned ? (
                      <span className="text-green-600 flex items-center"><CheckCircle size={20} className="mr-2" />Signed</span>
                    ) : (
                      <span className="text-gray-500 flex items-center"><PenTool size={16} className="mr-2" />Click to sign</span>
                    )}
                  </div>
                  <input type="text" name="supervisorName" placeholder="Supervisor's name" value={formData.supervisorName} onChange={handleInputChange} className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button type="reset" className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all">Reset Form</button>
              <button type="submit" className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center transition-all">
                <CheckCircle size={20} className="mr-2" /> Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-pulse">
          <CheckCircle size={24} className="mr-2" />
          <span>Report submitted successfully!</span>
        </div>
      )}
    </div>
  );
}
