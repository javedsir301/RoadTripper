import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, ChevronDown } from 'lucide-react';

const data = [
  { name: 'Aug', value: 30 },
  { name: 'Sep', value: 25 },
  { name: 'Oct', value: 15 },
  { name: 'Nov', value: 20 },
  { name: 'Dec', value: 45 },
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 75 },
  { name: 'Mar', value: 70 },
  { name: 'Apr', value: 35 },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-500">MaterialM</h1>
        </div>
        <nav className="mt-4">
          <a href="#" className="block py-2 px-4 bg-blue-100 text-blue-700">Dashboard</a>
          <div className="mt-4 px-4">
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">UI COMPONENTS</h2>
            <a href="#" className="block py-2 text-gray-700">Add Bus</a>
            <a href="#" className="block py-2 text-gray-700">Add Route</a>
          </div>
          <div className="mt-4 px-4">
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">AUTH</h2>
            <a href="#" className="block py-2 text-gray-700">Login</a>
            <a href="#" className="block py-2 text-gray-700">Register</a>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">HOME</h1>
            <div className="flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Download Free
              </button>
              <img className="ml-3 h-8 w-8 rounded-full" src="/placeholder.svg" alt="User avatar" />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Sales Profit</h2>
                  <div className="relative">
                    <select className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <option>March 2024</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-pink-100 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-pink-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">4,562</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <span className="sr-only">Increased by</span>
                          +23% last month
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-pink-50 px-5 py-3">
                <div className="text-sm">
                  <a href="#" className="font-medium text-pink-700 hover:text-pink-900">View all</a>
                </div>
              </div>
            </div>
            <div className="bg-purple-100 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Income</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">6,280</div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <span className="sr-only">Increased by</span>
                          +18% last month
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 px-5 py-3">
                <div className="text-sm">
                  <a href="#" className="font-medium text-purple-700 hover:text-purple-900">View all</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
