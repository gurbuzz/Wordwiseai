"use client";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { darkMode, isLoggedIn, setIsLoggedIn, setShowSettings } = useApp();

  return (
    <nav className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm fixed w-full z-10`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 text-center">
            <span className={`text-3xl font-bold ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
              WORDWISE AI
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsLoggedIn(!isLoggedIn)}
            >
              <span className={`${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                {isLoggedIn ? "Logout" : "Login"}
              </span>
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowSettings(true)}
            >
              <svg 
                className={`w-7 h-7 ${darkMode ? "text-gray-200" : "text-gray-600"}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}