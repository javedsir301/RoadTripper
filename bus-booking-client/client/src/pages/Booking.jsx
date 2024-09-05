import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  const location = useLocation();
  const { busId, pricePerSeat } = location.state || {};

  const [userId, setUserId] = useState('');
  const [totalSeats, setTotalSeats] = useState(1);
  const [totalPrice, setTotalPrice] = useState(pricePerSeat || 0);
  const [bus, setBus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/buses/${busId}`);
        setBus(response.data);
      } catch (err) {
        setError('Failed to fetch bus details');
      }
    };

    if (busId) {
      fetchBusDetails();
    }
  }, [busId]);

  const handleSeatsChange = (e) => {
    const seats = e.target.value;
    setTotalSeats(seats);
    setTotalPrice(seats * pricePerSeat);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/bookings', {
        userId,
        busId,
        totalSeats,
        totalPrice
      });
      alert('Booking successful!');
    } catch (err) {
      setError('Failed to book the tickets');
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Tickets</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        {bus && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Bus Details</h2>
            <p className="text-gray-700"><strong>Bus Name:</strong> {bus.companyName}</p>
            <p className="text-gray-700"><strong>From:</strong> {bus.startCity}</p>
            <p className="text-gray-700"><strong>To:</strong> {bus.destination}</p>
            <p className="text-gray-700"><strong>Total Seats:</strong> {bus.totalSeats}</p>
            <p className="text-gray-700"><strong>Available Seats:</strong> {bus.availableSeats}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="form-control rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Total Seats</label>
            <input
              type="text"
              value={totalSeats}
              onChange={handleSeatsChange}
              min="1"
              max={bus?.availableSeats || 0}
              className="form-control rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="form-group">
            <p className="text-gray-700"><strong>Total Price:</strong> {totalPrice}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#d84e55] text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Confirm Your Tickets
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingPage;
