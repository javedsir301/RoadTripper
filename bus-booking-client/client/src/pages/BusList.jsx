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
        if (departure) {
          busesData = busesData.filter(bus => new Date(bus.departure).toLocaleDateString() === new Date(departure).toLocaleDateString());
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

  return (
    <section className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Buses</h1>
      <div className="flex flex-row gap-3 items-center">
        {buses.map((bus) => (
          <div key={bus.id} className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md mb-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{bus.companyName}</h2>
            <p className="text-gray-700"><strong>Bus Type:</strong> {bus.busType}</p>
            <p className="text-gray-700"><strong>From:</strong> {bus.startCity}</p>
            <p className="text-gray-700"><strong>To:</strong> {bus.destination}</p>
            <p className="text-gray-700"><strong>Total Seats:</strong> {bus.totalSeats}</p>
            <p className="text-gray-700"><strong>Available Seats:</strong> {bus.availableSeats}</p>
            <p className="text-gray-700"><strong>Price per Seat:</strong> {bus.pricePerSeat}</p>
            <Link
              to={{
                pathname: '/booking',
                state: { busId: bus.id, pricePerSeat: bus.pricePerSeat }
              }}
              className="mt-4 w-full bg-[#d84e55]text-white py-2 rounded-md hover:bg-red-600 transition text-center"
            >
              Book Ticket
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusList;
