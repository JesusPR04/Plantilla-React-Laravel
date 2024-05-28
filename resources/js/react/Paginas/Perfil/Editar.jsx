// src/components/Editar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData, updateUserData } from '../../api/requests';
import { getCiudades } from '../../api/requests';
import Select from "react-select";


const Editar = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        ciudad: '',
        role: ''
    });

    const [ciudades, setCiudades] = useState([]);
    const [userCity, setUserCity] = useState('')

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData(); // Implementa la función fetchUserData para obtener los datos del usuario
                setUserData(data);
                setUserCity(ciudad => ciudad = data.ciudad); // Recoger la ciudad del usuario
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
    }, []);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const cambiarCiudad = (e) => {
        setUserData({
            ...userData,
            ciudad: e.label,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Implementa la función updateUserData para enviar los datos actualizados del usuario al servidor
            await updateUserData(userData);
            navigate('/perfil'); // Redirige al perfil después de la actualización exitosa
        } catch (error) {
            console.error('Error updating user data:', error);
            // Aquí puedes manejar el error según tus necesidades
        }
    };

    useEffect(() => {
        let promesa = getCiudades();
        promesa.then((data) => setCiudades(data.ciudades));
    }, []);

    if (!userData) {
        return <div className="min-h-[calc(100vh-436px)] flex items-center justify-center">Cargando...</div>;
    }


    return (
        <div className="min-h-[calc(100vh-436px)] bg-gray-100 flex flex-col items-center p-6 text-colorFuente">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-4 uppercase">Editar <span className='text-blue-500'>Perfil</span></h2>
                    <form className='mx-auto space-y-4 md:space-y-6 grid grid-cols-2 gap-x-8 items-end' 
                        onSubmit={handleSubmit}
                    >
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="nombre" className="block text-sm font-medium text-colorFuente">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={userData.nombre}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="apellidos" className="block text-sm font-medium text-colorFuente">Apellidos</label>
                            <input
                                type="text"
                                id="apellidos"
                                name="apellidos"
                                value={userData.apellidos}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium text-colorFuente">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="telefono" className="block text-sm font-medium text-colorFuente">Teléfono</label>
                            <input
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={userData.telefono}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="ciudad" className="block text-sm font-medium text-colorFuente">Ciudad</label>
                            <Select
                                options={ciudades.map((ciudad) => ({
                                    value: ciudad.id,
                                    label: ciudad.nombre,
                                }))}
                                onChange={(e) => {
                                    cambiarCiudad(e.label);
                                }}
                                value={userCity}
                                placeholder="Ciudad"
                                isSearchable
                                noOptionsMessage={() => "Sin resultados"}
                                classNames={{
                                    control: () => "!text-sm !bg-gray-50 !border !border-gray-300 !text-colorFuente !sm:text-sm !rounded-lg !focus:ring-blue-500 !focus:border-blue-500 !w-full !p-0.5 mt-1",
                                    input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                                    menuList: () => '!bg-gray-50'
                                }}
                            />
                        </div>
                        <div className='col-span-1'></div>
                        <div className="flex justify-end col-span-1">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editar;
