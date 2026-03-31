"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  AlertTriangle,
  ClipboardList,
  Wrench,
  RefreshCw,
  Home,
} from "lucide-react";

export default function WorkDonePage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ClipboardCheck className="text-white w-8 h-8 mr-3" />
              <h1 className="text-2xl font-bold text-white">Work Done Reports</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-indigo-100">{today}</span>
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                <Home className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <Link href="/workdone/breakdown">
            <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <AlertTriangle className="text-red-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Breakdown Report
              </h3>
              <p className="text-gray-500 mb-4">Document equipment failures</p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center">
                View
                <span className="ml-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </Link>

          <Link href="/workdone/pm">
            <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <ClipboardList className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                PM Report
              </h3>
              <p className="text-gray-500 mb-4">Preventive maintenance records</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center">
                View
                <span className="ml-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <Link href="/workdone/installation">
            <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Wrench className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Installation Report
              </h3>
              <p className="text-gray-500 mb-4">New equipment setup records</p>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center">
                View
                <span className="ml-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </Link>

          <Link href="/workdone/update">
            <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <RefreshCw className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Update Report
              </h3>
              <p className="text-gray-500 mb-4">Equipment upgrade records</p>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center">
                View
                <span className="ml-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </Link>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all duration-200"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
