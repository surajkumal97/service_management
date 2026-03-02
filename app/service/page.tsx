import React from "react";

const Service = () => {
  const services = [
    { title: "BreakDown", desc: "Analyze system breakdowns and fixes." },
    { title: "Installation", desc: "Set up apps and systems quickly." },
    { title: "PM Status", desc: "Track project management updates." },
    { title: "Update", desc: "Keep systems and apps updated." },
  ];

  return (
    <div className="min-h-screen py-16 px-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Our Services
      </h1>

      {/* 2x2 Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {services.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 bg-white"
          >
            {/* Circle placeholder */}
            <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-gray-200">
              <span className="font-bold text-2xl text-gray-800">
               { /* First 2 characters, uppercase */}
                {item.title.slice(0, 2).toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
              {item.title}
            </h2>
            <p className="text-gray-600 text-center">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Service;
