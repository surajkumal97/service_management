'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Laptop, 
  ClipboardCheck, 
  Boxes, 
  UserCog, 
  Signature, 
  Home, 
  Plus, 
  Trash2, 
  Check, 
  PenTool,
  Loader2
} from 'lucide-react';

interface Part {
  id: string;
  partName: string;
  partNumber: string;
  quantity: number;
  replaced: boolean;
  required: boolean;
}

const PMReport = () => {
  const [parts, setParts] = useState<Part[]>([
    { id: '1', partName: '', partNumber: '', quantity: 1, replaced: false, required: false }
  ]);
  const [formData, setFormData] = useState({
    hospitalName: '',
    department: '',
    brandName: '',
    model: '',
    systemSN: '',
    softwareVersion: '',
    workPerformed: '',
    status: 'complete',
    findings: '',
    recommendations: '',
    engineerName: '',
    startTime: '',
    endTime: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: string) => {
    setFormData(prev => ({ ...prev, status }));
  };

  const addPart = () => {
    const newPart: Part = {
      id: Date.now().toString(),
      partName: '',
      partNumber: '',
      quantity: 1,
      replaced: false,
      required: false
    };
    setParts([...parts, newPart]);
  };

  const removePart = (id: string) => {
    if (parts.length > 1) {
      setParts(parts.filter(part => part.id !== id));
    }
  };

  const updatePart = (id: string, field: keyof Part, value: string | number | boolean) => {
    setParts(parts.map(part => 
      part.id === id ? { ...part, [field]: value } : part
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form Data:', formData);
    console.log('Parts:', parts);
    
    setIsSubmitting(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', { formData, parts });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Link
        href="/service"
        className="fixed bottom-6 left-6 z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
      >
        <Home size={24} />
      </Link>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Preventive Maintenance Report</h1>
              <p className="text-gray-600">Fill out the form to document maintenance activities</p>
            </div>
            <div className="bg-sky-100 p-3 rounded-lg">
              <Laptop className="w-8 h-8 text-sky-600" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-sky-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-sky-800 mb-4 flex items-center gap-2">
                <Laptop size={20} />
                Equipment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    System S/N <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="systemSN"
                    value={formData.systemSN}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Software Version
                  </label>
                  <input
                    type="text"
                    name="softwareVersion"
                    value={formData.softwareVersion}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ClipboardCheck size={20} />
                Maintenance Details
              </h3>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Performed <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="workPerformed"
                  value={formData.workPerformed}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Describe the maintenance activities performed..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Maintenance Status <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-6">
                  {[
                    { value: 'complete', label: 'Completed' },
                    { value: 'incomplete', label: 'Incomplete' },
                    { value: 'partial', label: 'Partially Completed' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={() => handleStatusChange(option.value)}
                        className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                      />
                      <span className="ml-2 text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Findings</label>
                  <textarea
                    name="findings"
                    value={formData.findings}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any issues found during maintenance..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations</label>
                  <textarea
                    name="recommendations"
                    value={formData.recommendations}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Recommendations for future maintenance..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Boxes size={20} />
                  Parts Used/Replaced
                </h3>
                <button
                  type="button"
                  onClick={addPart}
                  className="flex items-center text-sm bg-sky-600 text-white px-3 py-1.5 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  <Plus size={16} className="mr-1" />
                  Add Part
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Part Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Part Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Replaced
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Required
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parts.map(part => (
                      <tr key={part.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={part.partName}
                            onChange={(e) => updatePart(part.id, 'partName', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={part.partNumber}
                            onChange={(e) => updatePart(part.id, 'partNumber', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            min="1"
                            value={part.quantity}
                            onChange={(e) => updatePart(part.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            type="button"
                            onClick={() => updatePart(part.id, 'replaced', !part.replaced)}
                            className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                              part.replaced 
                                ? 'bg-sky-600 border-sky-600 text-white' 
                                : 'border-gray-300 hover:border-sky-400'
                            }`}
                          >
                            {part.replaced && <Check size={14} />}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            type="button"
                            onClick={() => updatePart(part.id, 'required', !part.required)}
                            className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                              part.required 
                                ? 'bg-sky-600 border-sky-600 text-white' 
                                : 'border-gray-300 hover:border-sky-400'
                            }`}
                          >
                            {part.required && <Check size={14} />}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            type="button"
                            onClick={() => removePart(part.id)}
                            disabled={parts.length === 1}
                            className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
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
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <UserCog size={20} />
                Engineer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Engineer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="engineerName"
                    value={formData.engineerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Any additional comments..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Signature size={20} />
                Verification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Engineer&apos;s Signature</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-20 flex items-center justify-center hover:border-sky-400 transition-colors cursor-pointer">
                    <button type="button" className="text-sky-600 hover:text-sky-800 flex items-center">
                      <PenTool size={18} className="mr-2" />
                      Click to sign
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor&apos;s Signature</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-20 flex items-center justify-center hover:border-sky-400 transition-colors cursor-pointer">
                    <button type="button" className="text-sky-600 hover:text-sky-800 flex items-center">
                      <PenTool size={18} className="mr-2" />
                      Click to sign
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-20 left-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center">
            <Check size={20} className="mr-2" />
            <span>Report submitted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PMReport;
