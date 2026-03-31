'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Monitor, ClipboardCheck, Package, User, Home, Plus, Trash2, PenTool, CheckCircle, Wrench } from 'lucide-react';

interface PartRow {
  id: number;
  partName: string;
  partNumber: string;
  quantity: number;
}

export default function InstallationReport() {
  const [status, setStatus] = useState('complete');
  const [parts, setParts] = useState<PartRow[]>([
    { id: 1, partName: '', partNumber: '', quantity: 1 },
  ]);
  const [engineerSigned, setEngineerSigned] = useState(false);
  const [supervisorSigned, setSupervisorSigned] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    hospitalName: '',
    department: '',
    brandName: '',
    model: '',
    systemSN: '',
    softwareVersion: '',
    workPerformed: '',
    notes: '',
    engineerName: '',
    startDate: '',
    endDate: '',
    supervisorName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addPartRow = () => {
    const newId = parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1;
    setParts([...parts, { id: newId, partName: '', partNumber: '', quantity: 1 }]);
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
    console.log({ ...formData, parts, status });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/service"
          className="fixed bottom-6 left-6 z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all"
        >
          <Home size={24} />
        </Link>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Wrench className="text-blue-600" />
                Installation Report
              </h1>
              <p className="text-gray-600">Document your installation process</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Monitor className="text-blue-600 text-2xl" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <Monitor className="mr-2" size={20} /> Equipment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name <span className="text-red-500">*</span></label>
                  <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
                  <input type="text" name="department" value={formData.department} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name <span className="text-red-500">*</span></label>
                  <input type="text" name="brandName" value={formData.brandName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model <span className="text-red-500">*</span></label>
                  <input type="text" name="model" value={formData.model} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
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

            <div className="bg-white border border-gray-200 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <ClipboardCheck className="mr-2" size={20} /> Installation Details
              </h3>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Performed <span className="text-red-500">*</span></label>
                <textarea name="workPerformed" value={formData.workPerformed} onChange={handleInputChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Describe the installation activities performed..." />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">Installation Status <span className="text-red-500">*</span></label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="status" value="complete" checked={status === 'complete'} onChange={(e) => setStatus(e.target.value)} className="mr-2" />
                    <span className="text-gray-700">Complete</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" name="status" value="incomplete" checked={status === 'incomplete'} onChange={(e) => setStatus(e.target.value)} className="mr-2" />
                    <span className="text-gray-700">Incomplete</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="Any additional notes..." />
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Package className="mr-2" size={20} /> Parts Used
                </h3>
                <button type="button" onClick={addPartRow} className="flex items-center text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">
                  <Plus size={16} className="mr-1" /> Add Part
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Part Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parts.map((part) => (
                      <tr key={part.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="text" value={part.partName} onChange={(e) => updatePart(part.id, 'partName', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="text" value={part.partNumber} onChange={(e) => updatePart(part.id, 'partNumber', e.target.value)} className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="number" min="1" value={part.quantity} onChange={(e) => updatePart(part.id, 'quantity', parseInt(e.target.value))} className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
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

            <div className="bg-white border border-gray-200 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="mr-2" size={20} /> Engineer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Engineer Name <span className="text-red-500">*</span></label>
                  <input type="text" name="engineerName" value={formData.engineerName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date <span className="text-red-500">*</span></label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date <span className="text-red-500">*</span></label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <PenTool className="mr-2 text-purple-500" size={20} /> Verification
              </h3>

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

            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Save Draft</button>
              <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit Report</button>
            </div>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-20 left-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <CheckCircle size={24} className="mr-2" />
          <span>Installation report submitted successfully!</span>
        </div>
      )}
    </div>
  );
}
