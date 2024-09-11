import { Printer, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function JourneyTabs() {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const savedBookingDetails = localStorage.getItem("bookingDetails");
    if (savedBookingDetails) {
      const details = JSON.parse(savedBookingDetails);
      setBookingDetails(details);
    }
  }, []);

  if (!bookingDetails) return <p>No booking details found</p>;

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="border-b border-gray-200">
        <div className="flex space-x-4">
          <button className="py-2 px-4 text-sm font-semibold text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900">
            ALL JOURNEYS
          </button>
          <button className="py-2 px-4 text-sm font-semibold text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900">
            UPCOMING
          </button>
          <button className="py-2 px-4 text-sm font-semibold text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-900">
            PAST JOURNEYS
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold">1-Trip</h2>
            <div className="flex items-center space-x-2">
              <Printer className="h-5 w-5 text-gray-500" />
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-bold">{bookingDetails.startCity}</p>
                {/* <p className="text-sm text-gray-500">Sun, 28 Jul</p> */}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">{bookingDetails.distance} Km / {bookingDetails.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{bookingDetails.destination}</p>
                {/* <p className="text-sm text-gray-500">Sun, 28 Jul</p> */}
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-green-600 font-bold">STATUS: BOOKED</p>
              <p className="text-sm text-gray-500">
                Boarding Station: {bookingDetails.startCity}
              </p>
            </div>
          </div>
        </div>

        {/* Uncomment this section if you need to handle upcoming and past journeys */}
        {/* 
        <div className="mt-4">
          <div className="border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 text-center text-gray-500">
              No upcoming journeys
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="border border-gray-200 rounded-lg shadow-sm">
            <div className="p-4 text-center text-gray-500">
              No past journeys
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
