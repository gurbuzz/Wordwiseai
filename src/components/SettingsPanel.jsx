"use client";
import { useApp } from "../context/AppContext";

export default function SettingsPanel() {
  const { 
    darkMode, 
    setDarkMode, 
    isLoggedIn, 
    setIsLoggedIn, 
    showSettings, 
    setShowSettings 
  } = useApp();

  if (!showSettings) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowSettings(false)}
    >
      <div 
        className={`p-8 rounded-xl ${
          darkMode 
            ? "bg-gray-800/90 backdrop-blur border border-gray-700" 
            : "bg-white/90 backdrop-blur border border-gray-200"
        } w-96 transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Settings
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Dark Mode
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${
                darkMode ? "bg-indigo-600" : "bg-gray-300"
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform ${
                  darkMode ? "translate-x-5 bg-white" : "bg-gray-50"
                }`}></div>
              </div>
            </label>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              }`}
              onClick={() => setIsLoggedIn(!isLoggedIn)}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-white" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              onClick={() => setShowSettings(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}