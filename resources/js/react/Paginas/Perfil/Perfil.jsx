// src/components/Perfil.jsx
import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../../api/requests';

const Perfil = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${userData.coverImage || 'https://source.unsplash.com/random'})` }}></div>
        <div className="flex flex-col items-center p-6">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden -mt-16">
            <img src={userData.profileImage || 'https://randomuser.me/api/portraits/men/75.jpg'} alt="User avatar" className="w-full h-full object-cover" />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-600">City: {userData.city}</p>
          </div>
          <div className="mt-6 w-full">
            <h3 className="text-lg font-semibold text-center">About Me</h3>
            <p className="text-gray-700 text-center mt-2">{userData.about || 'No information provided.'}</p>
          </div>
          <div className="mt-6 w-full">
            <h3 className="text-lg font-semibold text-center">Interests</h3>
            <div className="flex justify-center mt-2 flex-wrap">
              {userData.interests && userData.interests.length > 0 ? (
                userData.interests.map((interest, index) => (
                  <span key={index} className="bg-blue-200 text-blue-800 text-sm font-semibold mr-2 px-4 py-1 rounded-full">
                    {interest}
                  </span>
                ))
              ) : (
                <span className="text-gray-700">No interests specified.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;