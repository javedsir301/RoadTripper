import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const state = location.state || {};
    setTotal(state.total || 0);
    setLoading(false);
  }, [location.state]);

  const handlePayment = () => {
    alert('Payment successful!');
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <div className="border p-4 rounded-lg shadow">
        <p className="font-bold text-lg mb-4">Total Amount: ₹ {total.toFixed(2)}</p>
        <button
          onClick={handlePayment}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
