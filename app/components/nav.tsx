import Image from "next/image";
const Nav = (): React.ReactNode => {
  return (
    <header className="bg-linear-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-white gap-2 mb-4 md:mb-0">
            <Image src="/service.svg" alt="service" width="40" height="40" />
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span id="user" className="text-blue-100 hidden sm:inline">
              Hello, Sumit
            </span>
            <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <a href="login.html">
              <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200">
                <span className="hidden sm:inline">Logout</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Nav;
