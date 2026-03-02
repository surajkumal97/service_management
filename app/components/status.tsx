import { Clock } from "lucide-react";

const StatsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-400">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500">Pending PM</p>
            <h3 className="text-2xl font-bold mt-1">24</h3>
          </div>
          <div className="bg-blue-400 text-blue-700 p-3 rounded-lg">
            <Clock />
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            65% increase from last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;
