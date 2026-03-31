"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Home,
  Filter,
  MapPin,
  Edit2,
  Trash2,
  X,
} from "lucide-react";

interface Tool {
  id: number;
  name: string;
  category: string;
  location: string;
  lastUsed: string;
  status: "available" | "in-use" | "maintenance";
}

const toolsData: Tool[] = [
  {
    id: 1,
    name: "Cordless Drill",
    category: "Installation",
    location: "Toolbox A",
    lastUsed: "2024-05-15",
    status: "available",
  },
  {
    id: 2,
    name: "Impact Wrench",
    category: "Installation",
    location: "Job Site 3",
    lastUsed: "2024-05-18",
    status: "in-use",
  },
  {
    id: 3,
    name: "Torque Wrench",
    category: "Installation",
    location: "Toolbox B",
    lastUsed: "2024-05-10",
    status: "available",
  },
  {
    id: 4,
    name: "Hammer Drill",
    category: "Installation",
    location: "Maintenance",
    lastUsed: "2024-04-28",
    status: "maintenance",
  },
  {
    id: 5,
    name: "Screwdriver Set",
    category: "General",
    location: "Toolbox C",
    lastUsed: "2024-05-17",
    status: "available",
  },
  {
    id: 6,
    name: "Pipe Wrench",
    category: "Plumbing",
    location: "Job Site 2",
    lastUsed: "2024-05-19",
    status: "in-use",
  },
  {
    id: 7,
    name: "Multimeter",
    category: "Electrical",
    location: "Toolbox A",
    lastUsed: "2024-05-14",
    status: "available",
  },
  {
    id: 8,
    name: "Circular Saw",
    category: "Installation",
    location: "Job Site 1",
    lastUsed: "2024-05-16",
    status: "in-use",
  },
  {
    id: 9,
    name: "Level",
    category: "Installation",
    location: "Toolbox B",
    lastUsed: "2024-05-12",
    status: "available",
  },
  {
    id: 10,
    name: "Pliers Set",
    category: "General",
    location: "Toolbox C",
    lastUsed: "2024-05-11",
    status: "available",
  },
  {
    id: 11,
    name: "Wire Stripper",
    category: "Electrical",
    location: "Toolbox A",
    lastUsed: "2024-05-13",
    status: "available",
  },
  {
    id: 12,
    name: "Pipe Cutter",
    category: "Plumbing",
    location: "Toolbox B",
    lastUsed: "2024-05-08",
    status: "available",
  },
  {
    id: 13,
    name: "Safety Goggles",
    category: "General",
    location: "Toolbox C",
    lastUsed: "2024-05-20",
    status: "available",
  },
  {
    id: 14,
    name: "Voltage Tester",
    category: "Electrical",
    location: "Job Site 1",
    lastUsed: "2024-05-19",
    status: "in-use",
  },
  {
    id: 15,
    name: "Adjustable Wrench",
    category: "General",
    location: "Toolbox A",
    lastUsed: "2024-05-14",
    status: "available",
  },
  {
    id: 16,
    name: "Hacksaw",
    category: "Installation",
    location: "Maintenance",
    lastUsed: "2024-04-25",
    status: "maintenance",
  },
  {
    id: 17,
    name: "Allen Key Set",
    category: "General",
    location: "Toolbox B",
    lastUsed: "2024-05-16",
    status: "available",
  },
  {
    id: 18,
    name: "Utility Knife",
    category: "General",
    location: "Toolbox C",
    lastUsed: "2024-05-18",
    status: "available",
  },
  {
    id: 19,
    name: "Measuring Tape",
    category: "Installation",
    location: "Toolbox A",
    lastUsed: "2024-05-17",
    status: "available",
  },
  {
    id: 20,
    name: "Flashlight",
    category: "General",
    location: "Job Site 2",
    lastUsed: "2024-05-19",
    status: "in-use",
  },
  {
    id: 21,
    name: "Clamp Set",
    category: "Installation",
    location: "Toolbox B",
    lastUsed: "2024-05-11",
    status: "available",
  },
  {
    id: 22,
    name: "Pliers Set",
    category: "Electrical",
    location: "Toolbox C",
    lastUsed: "2024-05-15",
    status: "available",
  },
  {
    id: 23,
    name: "Heat Gun",
    category: "Electrical",
    location: "Maintenance",
    lastUsed: "2024-04-20",
    status: "maintenance",
  },
  {
    id: 24,
    name: "Socket Set",
    category: "Installation",
    location: "Toolbox A",
    lastUsed: "2024-05-16",
    status: "available",
  },
];

const categories = [
  "All Categories",
  "Installation Tools",
  "General Tools",
  "Electrical Tools",
  "Plumbing Tools",
];

const locations = [
  "All Locations",
  "Toolbox A",
  "Toolbox B",
  "Toolbox C",
  "Job Site 1",
  "Job Site 2",
  "Job Site 3",
  "Maintenance",
];

export default function InstallationToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");
  const [locationFilter, setLocationFilter] = useState<string>("All Locations");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTools = toolsData.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tool.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All Categories" ||
      tool.category.toLowerCase() === categoryFilter.split(" ")[0].toLowerCase();
    const matchesLocation =
      locationFilter === "All Locations" || tool.location === locationFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesLocation;
  });

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Available
          </span>
        );
      case "in-use":
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            In Use
          </span>
        );
      case "maintenance":
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            Maintenance
          </span>
        );
      default:
        return null;
    }
  };

  const availableCount = toolsData.filter((t) => t.status === "available").length;
  const inUseCount = toolsData.filter((t) => t.status === "in-use").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/tools"
          className="fixed bottom-6 left-6 z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
        >
          <Home className="w-5 h-5" />
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Installation Tools</h1>
            <p className="text-gray-600 mt-2">
              Manage and track your installation tools inventory
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Tool
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                  statusFilter === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                All Tools{" "}
                <span className="ml-2 bg-indigo-500 text-white px-2 py-1 rounded-full text-xs">
                  {toolsData.length}
                </span>
              </button>
              <button
                onClick={() => setStatusFilter("available")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                  statusFilter === "available"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Available{" "}
                <span className="ml-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                  {availableCount}
                </span>
              </button>
              <button
                onClick={() => setStatusFilter("in-use")}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                  statusFilter === "in-use"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                In Use{" "}
                <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                  {inUseCount}
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowLocationDropdown(false);
                  }}
                  className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
                >
                  <Filter className="text-gray-500 w-4 h-4 mr-2" />
                  <span>{categoryFilter}</span>
                  <svg
                    className="ml-2 w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showCategoryDropdown && (
                  <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategoryFilter(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setShowLocationDropdown(!showLocationDropdown);
                    setShowCategoryDropdown(false);
                  }}
                  className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
                >
                  <MapPin className="text-gray-500 w-4 h-4 mr-2" />
                  <span>{locationFilter}</span>
                  <svg
                    className="ml-2 w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showLocationDropdown && (
                  <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 max-h-60 overflow-y-auto">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocationFilter(loc);
                          setShowLocationDropdown(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600">
                  <th className="px-6 py-3 font-medium">Tool Name</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Location</th>
                  <th className="px-6 py-3 font-medium">Last Used</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedTools.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No tools found matching your filters
                    </td>
                  </tr>
                ) : (
                  paginatedTools.map((tool) => (
                    <tr
                      key={tool.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {tool.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{tool.category}</td>
                      <td className="px-6 py-4 text-gray-600">{tool.location}</td>
                      <td className="px-6 py-4 text-gray-600">{tool.lastUsed}</td>
                      <td className="px-6 py-4">{getStatusBadge(tool.status)}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredTools.length)}
              </span>{" "}
              of <span className="font-medium">{filteredTools.length}</span>{" "}
              results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded-lg ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold">Add New Tool</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowAddModal(false);
                }}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Tool Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select Category</option>
                    <option value="Installation">Installation Tools</option>
                    <option value="General">General Tools</option>
                    <option value="Electrical">Electrical Tools</option>
                    <option value="Plumbing">Plumbing Tools</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Status</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="available">Available</option>
                    <option value="in-use">In Use</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Save Tool
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
