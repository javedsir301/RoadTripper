import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Bell, Search, Bus, Users, DollarSign, Calendar, UserPlus, Route, Table, IndianRupee, PlusCircle, Edit, Trash2 } from 'lucide-react'

const mockData = [
  { name: 'Jan', income: 4000 },
  { name: 'Feb', income: 3000 },
  { name: 'Mar', income: 5000 },
  { name: 'Apr', income: 4500 },
  { name: 'May', income: 6000 },
  { name: 'Jun', income: 5500 },
]

const salesData = [
  { name: 'Jan', offline: 4000, online: 2400 },
  { name: 'Feb', offline: 3000, online: 1398 },
  { name: 'Mar', offline: 2000, online: 9800 },
  { name: 'Apr', offline: 2780, online: 3908 },
  { name: 'May', offline: 1890, online: 4800 },
  { name: 'Jun', offline: 2390, online: 3800 },
]

export default function Component() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'busManage':
        return <BusManagement />
      case 'routeManage':
        return <RouteManagement />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-indigo-600 mr-8">RoadTripper</h1>
          <div className="relative ml-300">
            <Search className="absolute ml-300 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search now"
              className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex items-center">
          <Bell className="text-gray-500 mr-4" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-indigo-700 text-white p-4">
          <nav className="space-y-2">
            <MenuItem icon={<Users />} text="Dashboard" onClick={() => setActiveSection('dashboard')} active={activeSection === 'dashboard'} />
            <MenuItem icon={<Bus />} text="Bus Manage" onClick={() => setActiveSection('busManage')} active={activeSection === 'busManage'} />
            <MenuItem icon={<Route />} text="Route Manage" onClick={() => setActiveSection('routeManage')} active={activeSection === 'routeManage'} />
            <MenuItem icon={<Users />} text="Charts" onClick={() => {}} />
            <MenuItem icon={<Table />} text="Tables" onClick={() => {}} />
            <MenuItem icon={<Users />} text="User Pages" onClick={() => {}} />
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function MenuItem({ icon, text, onClick, active }) {
  return (
    <button
      className={`flex items-center w-full px-4 py-2 rounded ${
        active ? 'bg-indigo-800' : 'hover:bg-indigo-600'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  )
}

function StatCard({ icon, title, value, subvalue, color = "bg-blue-100 text-blue-600" }) {
  return (
    <div className={`${color} p-6 rounded-lg`}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">{value}</div>
        {icon}
      </div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs mt-2">{subvalue}</div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  )
}

function Dashboard() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Welcome Admin</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<IndianRupee />} title="Today's Bookings" value="4006" subvalue="10.00% (30 days)" />
        <StatCard icon={<Users />} title="Total Bookings" value="61344" subvalue="22.00% (30 days)" color="bg-purple-100 text-purple-600" />
        <StatCard icon={<Calendar />} title="Number of Meetings" value="34040" subvalue="2.00% (30 days)" color="bg-indigo-100 text-indigo-600" />
        <StatCard icon={<UserPlus />} title="Number of Clients" value="47033" subvalue="0.22% (30 days)" color="bg-pink-100 text-pink-600" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Order Details">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Sales Report">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="offline" fill="#8884d8" />
              <Bar dataKey="online" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  )
}

function BusManagement() {
  const [buses, setBuses] = useState([
    { id: 1, number: 'BUS001', capacity: 50 },
    { id: 2, number: 'BUS002', capacity: 40 },
    { id: 3, number: 'BUS003', capacity: 60 },
  ])

  const [editingBus, setEditingBus] = useState(null)

  const handleAddBus = () => {
    const newBus = { id: Date.now(), number: `BUS${buses.length + 1}`.padStart(6, '0'), capacity: 50 }
    setBuses([...buses, newBus])
  }

  const handleUpdateBus = (id, updatedBus) => {
    setBuses(buses.map(bus => bus.id === id ? updatedBus : bus))
    setEditingBus(null)
  }

  const handleDeleteBus = (id) => {
    setBuses(buses.filter(bus => bus.id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Bus Management</h2>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4 flex items-center"
        onClick={handleAddBus}
      >
        <PlusCircle className="mr-2" /> Add New Bus
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Bus Number</th>
            <th className="border p-2">Capacity</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <tr key={bus.id}>
              <td className="border p-2">{bus.number}</td>
              <td className="border p-2">{bus.capacity}</td>
              <td className="border p-2">
                <button className="text-blue-500 mr-2" onClick={() => setEditingBus(bus)}><Edit size={18} /></button>
                <button className="text-red-500" onClick={() => handleDeleteBus(bus.id)}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingBus && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Bus</h3>
            <input
              type="text"
              value={editingBus.number}
              onChange={(e) => setEditingBus({...editingBus, number: e.target.value})}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="number"
              value={editingBus.capacity}
              onChange={(e) => setEditingBus({...editingBus, capacity: parseInt(e.target.value)})}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleUpdateBus(editingBus.id, editingBus)}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditingBus(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RouteManagement() {
  const [routes, setRoutes] = useState([
    { id: 1, name: 'Route A', start: 'City Center', end: 'Airport' },
    { id: 2, name: 'Route B', start: 'Suburb', end: 'Downtown' },
    { id: 3, name: 'Route C', start: 'University', end: 'Shopping Mall' },
  ])

  const [editingRoute, setEditingRoute] = useState(null)

  const handleAddRoute = () => {
    const newRoute = { id: Date.now(), name: `Route ${routes.length + 1}`, start: 'Start Point', end: 'End Point' }
    setRoutes([...routes, newRoute])
  }

  const handleUpdateRoute = (id, updatedRoute) => {
    setRoutes(routes.map(route => route.id === id ? updatedRoute : route))
    setEditingRoute(null)
  }

  const handleDeleteRoute = (id) => {
    setRoutes(routes.filter(route => route.id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Route Management</h2>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md mb-4 flex items-center"
        onClick={handleAddRoute}
      >
        <PlusCircle className="mr-2" /> Add New Route
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Route Name</th>
            <th className="border p-2">Start Point</th>
            <th className="border p-2">End Point</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map(route => (
            <tr key={route.id}>
              <td className="border p-2">{route.name}</td>
              <td className="border p-2">{route.start}</td>
              <td className="border p-2">{route.end}</td>
              <td className="border p-2">
                <button className="text-blue-500 mr-2" onClick={() => setEditingRoute(route)}><Edit size={18} /></button>
                <button className="text-red-500" onClick={() => handleDeleteRoute(route.id)}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingRoute && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Route</h3>
            <input
              type="text"
              value={editingRoute.name}
              onChange={(e) => setEditingRoute({...editingRoute, name: e.target.value})}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingRoute.start}
              onChange={(e) => setEditingRoute({...editingRoute, start: e.target.value})}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingRoute.end}
              onChange={(e) => setEditingRoute({...editingRoute, end: e.target.value})}
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleUpdateRoute(editingRoute.id, editingRoute)}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditingRoute(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}