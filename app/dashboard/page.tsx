"use client";

import { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";

interface DashboardStats {
  completed: number;
  incomplete: number;
  inProgress: number;
  pendingReview: number;
}

const statsData: DashboardStats = {
  completed: 65,
  incomplete: 15,
  inProgress: 10,
  pendingReview: 10,
};

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("day");
  const [activeView, setActiveView] = useState<string>("breakdown");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const views = [
    { id: "breakdown", title: "Task Completion", description: "Breakdown complete/incomplete" },
    { id: "pm-status", title: "PM Status", description: "PM complete/incomplete" },
    { id: "hours", title: "Working Hours", description: "Daily/weekly analysis" },
    { id: "location", title: "Live Location", description: "Employee tracking" },
  ];

  const periods = [
    { id: "day", label: "Today" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
  ];

  const chartTitle =
    activeView === "breakdown"
      ? "Task Completion Overview"
      : activeView === "pm-status"
      ? "PM Status Analysis"
      : activeView === "hours"
      ? "Working Hours Analysis"
      : "Employee Location Data";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-lg max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Analytics Dashboard
          </h1>
          <div className="text-gray-600 font-medium">{today}</div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 bg-gray-50 rounded-lg p-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Search ID/name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full px-4 py-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />

            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`rounded-lg p-3 text-left transition-colors ${
                  activeView === view.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{view.title}</div>
                <div className={`text-sm ${activeView === view.id ? "text-blue-100" : "text-gray-500"}`}>
                  {view.description}
                </div>
              </button>
            ))}
          </div>

          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">{chartTitle}</h2>

              <div className="flex gap-2 bg-gray-100 rounded-full p-1">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`rounded-full px-4 py-1 text-sm transition-colors ${
                      selectedPeriod === period.id
                        ? "bg-blue-500 text-white"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {statsData.completed}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Completed</div>
                </div>
                <div className="bg-red-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {statsData.incomplete}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Incomplete</div>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    {statsData.inProgress}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">In Progress</div>
                </div>
                <div className="bg-gray-200 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-gray-600">
                    {statsData.pendingReview}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Pending Review</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="overflow-hidden rounded-full bg-gray-200 h-6">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${statsData.completed}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Tasks</span>
                      <span className="font-medium">100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Completed</span>
                      <span className="font-medium text-green-600">65</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Remaining</span>
                      <span className="font-medium text-red-600">35</span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-2">Performance</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">This {selectedPeriod === "day" ? "Today" : selectedPeriod === "week" ? "Week" : "Month"}</span>
                      <span className="font-medium text-blue-600">
                        {selectedPeriod === "day" ? "85%" : selectedPeriod === "week" ? "78%" : "92%"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Change</span>
                      <span className="font-medium text-green-600">+5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target</span>
                      <span className="font-medium">90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button className="bg-white border border-gray-300 rounded-full px-6 py-2 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print
              </button>
              <Link href="/">
                <button className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
