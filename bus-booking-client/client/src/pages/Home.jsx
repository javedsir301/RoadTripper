import { Bus, Calendar, ChevronDown, Headphones, User } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-4">
              <button className="text-black px-4 py-1 rounded text-3xl item-center">RoadTripper</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4 gap-12">
            <button className="flex items-center">
              <Headphones size={20} className="mr-1" />
              Help
            </button>
            <button className="flex items-center">
              English
              <ChevronDown size={16} className="ml-1" />
            </button>
            <button className="flex items-center">
              <User size={20} className="mr-1" />
              Account
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="bg-[#d84e55] text-white py-8 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">India's No. 1 Online Bus Ticket Booking Site</h1>
            <div className="bg-white rounded-lg shadow-lg p-4 flex">
              <div className="flex-1 flex items-center border-r border-gray-300 px-4 text-black">
                <Bus size={24} className="text-gray-400 mr-2" />
                <input type="text" placeholder="From" className="w-full outline-none" />
              </div>
              <div className="flex-1 flex items-center border-r border-gray-300 px-4 text-black">
                <Bus size={24} className="text-gray-400 mr-2" />
                <input type="text" placeholder="To" className="w-full outline-none" />
              </div>
              <div className="flex-1 flex items-center px-4 text-black">
                <Calendar size={24} className="text-gray-400 mr-2"  />
                <input placeholder="Date" className="w-full outline-none" />
              </div>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-[#d84e55] transition">
                SEARCH BUSES
              </button>
            </div>
            <p className="text-2xl font-light mt-6 text-center text-yellow-300">
              Apno ko, Sapno ko Kareeb Laaye.
            </p>
          </div>
         
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold ml-30">TRENDING OFFERS</h2>
            <button className="text-blue-600 mr-10">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { color: 'bg-blue-600', title: 'Save up to Rs 250 on bus tickets', code: 'FIRST', valid: 'Valid till 01 Oct' },
              { color: 'bg-teal-600', title: 'Save up to Rs 300 on AP, TS routes', code: 'SUPERHIT', valid: 'Valid till 01 Oct' },
              { color: 'bg-red-800', title: 'Save up to Rs 300 on Delhi, North, MP, RJ...', code: 'BUS300', valid: 'Valid till 01 Oct' },
              { color: 'bg-green-600', title: 'Save up to Rs 300 on Chartered Bus', code: 'CHARTERED', valid: 'Valid till 01 Oct' },
            ].map((offer, index) => (
              <div key={index} className={`${offer.color} text-white p-4 rounded-lg`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-white text-black text-xs px-2 py-1 rounded">BUS</span>
                </div>
                <h3 className="font-bold mb-2">{offer.title}</h3>
                <p className="text-sm mb-2">{offer.valid}</p>
                <div className="flex items-center">
                  <span className="border border-white text-xs px-2 py-1 rounded mr-2">Coupan Code : {offer.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}