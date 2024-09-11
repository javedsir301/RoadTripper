import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import IMAGES from '../assets/profile-bg.jpg';

export default function Profile() {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedProfileDetails = localStorage.getItem('ProfileDetails');
    if (savedProfileDetails) {
      const details = JSON.parse(savedProfileDetails);
      setProfileDetails(details);
      setFormData(details); // Initialize formData with current profile details
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSave = () => {
    setProfileDetails(formData);
    localStorage.setItem('ProfileDetails', JSON.stringify(formData));
    setIsEditing(false);
  };

  if (!profileDetails) return <p>No profile details found</p>;

  return (
    <div className='bg-gray-400'>
    <div className="space-y-4 p-4 max-w-2xl mx-auto relative" style={{ backgroundImage: `url(${IMAGES})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Profile Card */}
      <div className="bg-white bg-opacity-70 shadow rounded-lg">
        <div className="flex flex-row items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">MY PROFILE</h2>
          <button onClick={handleEditClick} className="p-2 hover:bg-gray-100 rounded-full">
            <Pencil className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username:</label>
              <input
                id="name"
                value={isEditing ? formData.name : profileDetails.name}
                onChange={handleChange}
                readOnly={!isEditing}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
              <input
                id="gender"
                value={profileDetails.gender}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date Of Birth:</label>
              <input
                id="dob"
                value={profileDetails.dob}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile:</label>
              <input
                id="mobile"
                value={isEditing ? formData.mobile : profileDetails.mobile}
                onChange={handleChange}
                readOnly={!isEditing}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country:</label>
              <input
                id="country"
                value={profileDetails.country}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                id="email"
                value={profileDetails.email}
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-900"
              />
            </div>
          </div>
          {isEditing && (
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={handleSave} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Save</button>
              <button onClick={handleEditClick} className="bg-gray-100 py-2 px-4 rounded-lg hover:bg-gray-200">Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* Passwords Card */}
      <div className="bg-white bg-opacity-70 shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">PASSWORDS</h2>
        </div>
        <div className="p-4 flex justify-between items-center">
          <span>Change Login Password</span>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Pencil className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* IRCTC e-Wallet Card */}
      <div className="bg-white bg-opacity-70 shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">RoadTripper e-Wallet</h2>
        </div>
        <div className="p-4">
          <button className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700">REGISTER/REACTIVATE</button>
        </div>
      </div>
    </div>
    </div>
  );
}
