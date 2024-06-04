// src/components/Perfil.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../api/requests';
import image from '../../assets/img_perfil.jpg'

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
    return <div className="min-h-[calc(100vh-436px)] flex items-center justify-center">Cargando...</div>;
  }

  const handleEditProfile = () => {
    navigate('/editar-perfil');
  };

  return (
    <div className="min-h-[calc(100vh-436px)] bg-gray-100 flex flex-col items-center p-6 text-colorFuente">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-cover bg-no-repeat bg-center h-64" style={{ backgroundImage: `url(${image})`}}></div>
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{userData.nombre} {userData.apellidos}</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-evenly mt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold uppercase">Ciudad</h3>
              <p className=" mt-2">{userData.ciudad || 'No hay ciudad especificada.'}</p>
            </div>
            <div>
              <h3 className="text-lg text-center font-semibold uppercase">Contacto</h3>
              <div className="mt-2 flex flex-row justify-center md:justify-between gap-2">
                <span className="bg-blue-200 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
                  Email
                </span> 
                <span>{userData.email || 'No hay correo electrónico especificado.'}</span>
              </div>
              <div className="mt-2 flex flex-row justify-center md:justify-between gap-12 md:gap-2">
                <span className="bg-blue-200 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
                  Teléfono
                </span> 
                <span>{userData.telefono || 'No hay teléfono especificado.'}</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold uppercase">Rol</h3>
              <span className="bg-blue-200 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full">
                {userData.rol}
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-center md:justify-end">
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
