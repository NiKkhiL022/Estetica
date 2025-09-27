import React from "react"
import { Search, Bell, User } from "lucide-react"

interface HeaderProps {
  onSearch?: (query: string) => void
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Estetica
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48 lg:w-80"
              onChange={e => onSearch?.(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-1 sm:space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg sm:block hidden">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                AD
              </span>
              <div className="flex flex-col hidden sm:block">
                <span className="text-xs sm:text-sm font-medium text-gray-900">
                  Profile
                </span>
              </div>
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          Welcome Back, Rajesh
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Hello, here you can manage your orders by zone
        </p>
      </div>
    </header>
  )
}

export default Header
