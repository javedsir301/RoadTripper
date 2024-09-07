import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const busId = parseInt(searchParams.get('busId') || '1');
  const routeId = parseInt(searchParams.get('routeId') || '1');
  const [bus, setBus] = useState(null);
  const [route, setRoute] = useState(null);
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
      }
    };

    const fetchRouteDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/routes/${routeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch route details');
        }
        const routeData = await response.json();
        setRoute(routeData);
      } catch (error) {
        console.error('Error fetching route details:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBusDetails(), fetchRouteDetails()]);
      setLoading(false);
    };

    fetchData();
  }, [busId, routeId]);

  const handleSeatsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setSeats(value);
  };

  const totalCost = bus ? bus.pricePerSeat * seats : 0;

  const handleConfirm = () => {
    navigate(`/payment?total=${totalCost}`);
  };

  if (loading) return <p>Loading...</p>;
  if (!bus || !route) return <p>Data not found</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <div className="border p-4 rounded-lg shadow">
        <h3 className="font-bold text-lg mb-2">{bus.name}</h3>
        <h2 className="text-xl font-semibold mb-2">{bus.companyName}</h2>
        <p><span className='font-bold mt-4'>Departure: </span>{bus.startCity}</p>
        <p><span className='font-bold mt-4'>Arrival: </span>{bus.destination}</p>
        <p><span className='font-bold mt-4'>Distance: </span>{route.distance} km</p>
        <p><span className='font-bold mt-4'>Duration: </span>{route.duration}</p>
        <p className="font-bold mt-4">Price per seat: ₹ {bus.pricePerSeat}</p>
        <div className="mt-4">
          <label htmlFor="seats" className="block mb-2">Number of seats:</label>
          <input
            type="number"
            id="seats"
            min="1"
            max="10"
            value={seats}
            onChange={handleSeatsChange}
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
