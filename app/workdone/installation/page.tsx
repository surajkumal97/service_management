"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Home, Calendar, Filter, Eye, Printer } from "lucide-react";

interface ReportRecord {
  id: number;
  hospitalName: string;
  hospitalCity: string;
  brand: string;
  model: string;
  serialNumber: string;
  date: string;
  icon: "hospital" | "clinic" | "procedures";
}

const installationData: ReportRecord[] = [
  {
    id: 1,
    hospitalName: "Example Hospital",
    hospitalCity: "New York, NY",
    brand: "Brand A",
    model: "Model X",
    serialNumber: "SN123456",
    date: "2025-04-03",
    icon: "hospital",
  },
  {
    id: 2,
    hospitalName: "City Medical",
    hospitalCity: "Boston, MA",
    brand: "Brand B",
    model: "Model Y",
    serialNumber: "SN987654",
    date: "2025-03-25",
    icon: "clinic",
  },
  {
    id: 3,
    hospitalName: "General Clinic",
    hospitalCity: "Chicago, IL",
    brand: "Brand C",
    model: "Model Z",
    serialNumber: "SN111222",
    date: "2025-04-01",
    icon: "procedures",
  },
];

export default function InstallationReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRecords = installationData.filter((record) => {
    const matchesSearch =
      record.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.hospitalName.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesDate = true;
    const recordDate = new Date(record.date);
    const today = new Date();

    if (dateFilter === "today") {
      matchesDate = recordDate.toDateString() === today.toDateString();
    } else if (dateFilter === "month") {
      matchesDate =
        recordDate.getMonth() === today.getMonth() &&
        recordDate.getFullYear() === today.getFullYear();
    }

    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRelativeDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "hospital":
        return (
          <svg
            className="w-5 h-5 text-sky-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        );
      case "clinic":
        return (
          <svg
            className="w-5 h-5 text-sky-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-sky-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Installation Records
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Track and manage medical equipment information
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="text-gray-400 w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
                    placeholder="Search by S.N..."
                  />
                </div>
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Quick Filters:
                </span>
                <button
                  onClick={() => setDateFilter("today")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === "today"
                      ? "bg-sky-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Today
                </button>
                <button
                  onClick={() => setDateFilter("month")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === "month"
                      ? "bg-sky-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="w-4 h-4 inline mr-2" />
                  This Month
                </button>
                <button
                  onClick={() => setDateFilter("all")}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    dateFilter === "all"
                      ? "bg-sky-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Reset
                </button>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Record
                </button>
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                  <svg
                    className="w-4 h-4 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No records found
                    </td>
                  </tr>
                ) : (
                  paginatedRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-sky-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center">
                            {getIcon(record.icon)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {record.hospitalName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {record.hospitalCity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.brand}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {record.model}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.serialNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(record.date)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {getRelativeDate(record.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded text-sm font-medium">
                          <Eye className="w-4 h-4 inline mr-1" />
                          View
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium">
                          <Printer className="w-4 h-4 inline mr-1" />
                          Print
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredRecords.length}</span> of{" "}
              <span className="font-medium">{filteredRecords.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              {[1].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === page
                      ? "bg-sky-50 border-sky-500 text-sky-600"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/workdone"
        className="fixed bottom-4 left-4 z-50 flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 transition-colors"
      >
        <Home className="w-5 h-5" />
      </Link>
    </div>
  );
}
