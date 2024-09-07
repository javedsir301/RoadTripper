import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const busId = parseInt(searchParams.get('busId') || '1');
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bus/${busId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bus details');
        }
        const busData = await response.json();
        setBus(busData);
      } catch (error) {
        console.error('Error fetching bus details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [busId]);

  const totalCost = bus ? bus.pricePerSeat * seats : 0;

  const handleConfirm = () => {
    navigate(`/payment?total=${totalCost}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!bus) return <p>Bus not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <div className="border p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">{bus.name}</h3>
        <h2 className="text-xl font-semibold mb-2">{bus.companyName}</h2>
        <p>Departure: {bus.startCity}</p>
        <p>Arrival: {bus.destination}</p>
        <p className="font-bold mt-4">Price per seat: ₹ {bus.pricePerSeat}</p>
        <div className="mt-4">
          <label htmlFor="seats" className="block mb-2">Number of seats:</label>
          <input
            type="number"
            id="seats"
            min="1"
            max="10"
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value, 10))}
            className="border p-2 rounded w-full"
          />
        </div>
        <p className="font-bold text-lg mt-4">Total Cost: ₹ {totalCost}</p>
        <button
          onClick={handleConfirm}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
