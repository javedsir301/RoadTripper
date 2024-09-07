import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import IMAGES from "../assets/home-bus.png";
// import AppLogo from "../assets/a.png";

const App = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [departure, setDeparture] = React.useState("");

  const handleLoginandRegister = () => {
    navigate("/register");
  };

  const handleSearch = () => {
    if (!username) {
      alert("Please Login to Search.");
      navigate("/login");
      return;
    }

    if (!from || !to || !departure) {
      alert("Please fill out all search fields.");
      return;
    }

    navigate(
      `/bus?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&departure=${encodeURIComponent(departure)}`
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  React.useEffect(() => {
    if (window.location.pathname === "/bus" && !username) {
      navigate("/login");
    }
  }, [navigate, username]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <nav className="flex justify-between items-center mb-12">
        {/* <img src={AppLogo} alt="RoadTripper Logo" className="w-20 h-auto" />{" "} */}
        <div className="text-2xl font-bold text-blue-400">RoadTripper</div>
        <div className="space-x-6">
          <a href="#" className="text-sm hover:text-red-400">
            BUS TICKET
          </a>
          <a href="#" className="text-sm hover:text-red-400">
            LIVE TRACKING
          </a>
          <a href="#" className="text-sm hover:text-red-400">
            OFFERS
          </a>
          <a href="#" className="text-sm hover:text-red-400">
            CONTACT US
          </a>
        </div>
        {username ? (
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLoginandRegister}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            LOGIN / REGISTER
          </button>
        )}
      </nav>

      <main className="flex">
        <div className="w-1/2 pr-4">
          <h1 className="text-5xl font-bold mb-4">
            STOP LOOKING.
            <br />
            <span className="text-red-500">START TRACKING!</span>
          </h1>
          <p className="mb-8 text-gray-400">
            India's largest online bus ticketing platform,
            <br />
            trusted by over 6 million Indians.
          </p>
          <div className="bg-white p-6 rounded-lg text-black">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">From</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Chandigarh"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destination
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Bangalore"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Return - Optional
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-600 text-white text-2xl rounded-md font-bold"
              >
                Search
              </button>
            </div>
            <div className="mt-4 flex items-center">
              <button className="text-blue-500 mr-4">Have offers Code?</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                VIEW OFFERS
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src={IMAGES}
            alt="Modern bus at night"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </main>

      <footer className="mt-8 flex justify-center space-x-4">
        <a href="#" className="text-gray-400 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
        </a>
      </footer>
    </div>
  );
};

export default App;
