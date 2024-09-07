import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departure = searchParams.get('departure') || '';

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bus'); 
        let busesData = response.data;
        if (from) {
          busesData = busesData.filter(bus => bus.startCity.toLowerCase().includes(from.toLowerCase()));
        }
        if (to) {
          busesData = busesData.filter(bus => bus.destination.toLowerCase().includes(to.toLowerCase()));
        }

        setBuses(busesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch buses');
        setLoading(false);
      }
    };

    fetchBuses();
  }, [from, to, departure]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (buses.length === 0) return <p className="text-gray-500">No buses available for the selected criteria.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Buses</h2>
      <div className="space-y-4">
        {buses.map((bus) => (
          <div key={bus.id} className="border p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <p className="text-gray-700"><strong>Bus Type:</strong> {bus.busType}</p>
              <p className="text-gray-700"><strong>From:</strong> {bus.startCity}</p>
              <p className="text-gray-700"><strong>To:</strong> {bus.destination}</p>
              <p className="text-gray-700"><strong>Total Seats:</strong> {bus.totalSeats}</p>
              <p className="text-gray-700"><strong>Available Seats:</strong> {bus.availableSeats}</p>
              <p className="text-gray-700"><strong>Price per Seat:</strong> {bus.pricePerSeat}</p>
            </div>
            <div>
              <Link
                to='/booking'
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusList;
