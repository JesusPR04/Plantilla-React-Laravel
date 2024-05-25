// src/components/Perfil.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../api/requests';

const Perfil = () => {
  const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

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
    return <div className="min-h-[calc(100vh-436px)] flex items-center justify-center">Loading...</div>;
  }

  const handleEditProfile = () => {
    navigate('/editar-perfil');
  };

  return (
    <div className="min-h-[calc(100vh-436px)] bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover bg-center h-64" style={{ backgroundImage: `url(${userData.coverImage || 'https://source.unsplash.com/random'})` }}></div>
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{userData.nombre} {userData.apellidos}</h2>
            <p className="text-gray-600">{userData.email}</p>
          </div>
          <div className="flex justify-around mt-6">
            <div className="w-1/3">
              <h3 className="text-lg font-semibold">Ciudad</h3>
              <p className="text-gray-700 mt-2">{userData.ciudad || 'No hay ciudad especificada.'}</p>
            </div>
            <div className="w-1/3">
              <h3 className="text-lg font-semibold">Contacto</h3>
              <p className="text-gray-700 mt-2">{userData.email || 'No hay correo electrónico especificado.'}</p>
              <p className="text-gray-700 mt-2">{userData.telefono || 'No hay teléfono especificado.'}</p>
            </div>
            <div className="w-1/3">
              <h3 className="text-lg font-semibold">Rol</h3>
              <span className="bg-blue-200 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
                {userData.role === 'admin' ? 'Administrador' : 'Usuario'}
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={handleEditProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
