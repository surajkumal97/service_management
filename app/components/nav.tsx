import Link from "next/link";
import { Wrench } from "lucide-react";
import { User, LogOut } from "lucide-react";

const Nav = (): React.ReactNode => {
  return (
    <header className="bg-linear-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-white gap-2 mb-4 md:mb-0">
            <Wrench size={40} className="text-white" />
            <Link href="/">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span id="user" className="text-blue-100 hidden sm:inline">
              Hello, Sumit
            </span>
            <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-200">
              <User size={24} className="text-white" />
            </button>
            <a href="login.html">
              <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200">
                <LogOut size={20} className="mr-2" />
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
