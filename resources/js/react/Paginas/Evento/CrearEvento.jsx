import React, { useState, useEffect } from 'react';
import { getCiudades, getGenrers, fetchUserData, crearEvento } from '../../api/requests';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CrearEvento() {
    const token = localStorage.getItem('user-token');
    const [idUser, setIdUser] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            fetchUserData().then(data => data.rol === 'Organizador' && setIdUser(data.id));
        }
    }, [token]);

    const [ciudades, setCiudades] = useState([]);
    const [genrers, setGenrers] = useState([]);

    useEffect(() => {
        getCiudades().then((data) => setCiudades(data.ciudades));
        getGenrers().then((data) => setGenrers(data.categorias));
    }, []);

    const [formData, setFormData] = useState({
        nombre: '',
        hora: '',
        fecha: '',
        localizacion: '',
        idOrganizador: 0,
        idCiudad: 0,
        aforoTotal: 0,
        aforoDisponible: 0,
        idCategoria: 0,
        descripcion: '',
        precio: 0,
        imagenes: [],
    });

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            idOrganizador: idUser
        }));
    }, [idUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData({
            ...formData,
            [name]: selectedOption.value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: Array.from(files)
        });
    };

    function enviarEvento() {
        const data = new FormData();
        data.append('nombre', formData.nombre);
        data.append('hora', formData.hora);
        data.append('fecha', formData.fecha);
        data.append('localizacion', formData.localizacion);
        data.append('idOrganizador', formData.idOrganizador);
        data.append('idCiudad', formData.idCiudad);
        data.append('aforoTotal', formData.aforoTotal);
        data.append('aforoDisponible', formData.aforoDisponible);
        data.append('idCategoria', formData.idCategoria);
        data.append('descripcion', formData.descripcion);
        data.append('precio', formData.precio);
        for (let i = 0; i < formData.imagenes.length; i++) {
            data.append(`imagenes[${i}]`, formData.imagenes[i]);
        }

        crearEvento(data)
            .then(response => {
                toast.success('Evento creado con éxito');
                navigate('/misEventos')
            })
            .catch(err => {
                toast.error('Error al crear el evento');
                console.error(err);
            });
    }

    return (
        <main className='min-h-[calc(100vh-436px)] bg-gray-100'>
            <ToastContainer />
            <h2 className="text-3xl sm:text-4xl pt-10 font-bold tracking-tight text-colorFuente uppercase text-center">
                Patrocina tu
                <span className='text-blue-500 uppercase'> evento</span>
            </h2>
            <h2 className='px-14 sm:px-0 pb-2 pt-6 font-semibold text-colorFuente text-center'>
                Aprobecha la <span className='text-blue-500'>oportunidad</span> para dar a conocer tu
                <span className='text-blue-500 uppercase'> evento</span>
            </h2>
            <h2 className='px-14 sm:px-0 pb-2 pt-6 font-semibold text-colorFuente text-center'>
                ¡ <span className='text-blue-500'>Importante</span> todos los campos son <span
                    className="bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block"
                > Requeridos</span> !
            </h2>
            <section className='pb-12 px-14 sm:px-0 space-y-4 md:space-y-6 mx-auto max-w-xl md:max-w-3xl grid grid-cols-2 gap-x-8 justify-start items-end'>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="nombre"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Nombre del evento"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="hora"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Hora
                    </label>
                    <input
                        type="text"
                        name="hora"
                        id="hora"
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Hora del evento"
                        value={formData.hora}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="fecha"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Fecha
                    </label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="fecha"
                        name='fecha'
                        type="date"
                        value={formData.fecha}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="localizacion"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Localización
                    </label>
                    <input
                        type="text"
                        name="localizacion"
                        id="localizacion"
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Localización del evento"
                        value={formData.localizacion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="ciudad"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Ciudad
                    </label>
                    <Select
                        options={ciudades.map((ciudad) => ({
                            value: ciudad.id,
                            label: ciudad.nombre,
                        }))}
                        placeholder="Ciudad"
                        isSearchable
                        noOptionsMessage={() => "Sin resultados"}
                        onChange={(selectedOption) => handleSelectChange('idCiudad', selectedOption)}
                        classNames={{
                            control: () => `!text-sm !bg-gray-50 !border  !text-colorFuente 
                                        !sm:text-sm !rounded-lg !focus:ring-blue-500 
                                        !focus:border-blue-500 !w-full !p-0.5`,
                            input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                            menuList: () => '!bg-gray-50'
                        }}
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-colorFuente" htmlFor="genrer">
                        Categoría
                    </label>
                    <Select
                        options={genrers.map((genrer) => ({
                            value: genrer.id,
                            label: genrer.nombre,
                        }))}
                        placeholder="Categoría"
                        isSearchable
                        noOptionsMessage={() => "Sin resultados"}
                        onChange={(selectedOption) => handleSelectChange('idCategoria', selectedOption)}
                        classNames={{
                            control: () => `!text-sm !bg-gray-50 !border  !text-colorFuente 
                                        !sm:text-sm !rounded-lg !focus:ring-blue-500 
                                        !focus:border-blue-500 !w-full !p-0.5`,
                            input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                            menuList: () => '!bg-gray-50'
                        }}
                    />
                </div>
                <div className='w-full col-span-2 sm:col-span-1'>
                    <label className="block text-sm font-medium text-colorFuente" htmlFor="aforoTotal">
                        Aforo Total {formData.aforoTotal}
                    </label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.aforoTotal}
                        onChange={handleChange}
                        id="aforoTotal"
                        name='aforoTotal'
                        max="50000"
                        min="0"
                        step="10"
                        type="range"
                    />
                </div>
                <div className='w-full col-span-2 sm:col-span-1'>
                    <label className="block text-sm font-medium text-colorFuente" htmlFor="aforoDisponible">
                        Aforo Disponible {formData.aforoDisponible}
                    </label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.aforoDisponible}
                        onChange={handleChange}
                        id="aforoDisponible"
                        name='aforoDisponible'
                        max="50000"
                        min="0"
                        step="10"
                        type="range"
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="precio"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Precio
                    </label>
                    <input
                        type="number"
                        name="precio"
                        id="precio"
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Precio del evento"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-2 sm:col-span-1">
                    <label
                        htmlFor="imagenes"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Imágenes
                    </label>
                    <input
                        type="file"
                        name="imagenes"
                        id="imagenes"
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full"
                        onChange={handleFileChange}
                        multiple
                        required
                    />
                </div>
                <div className="w-full col-span-2">
                    <label
                        htmlFor="descripcion"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Descripción
                    </label>
                    <textarea
                        name='descripcion' id='descripcion' cols={50} rows={5}
                        placeholder='Aporte información esenciál para su evento...'
                        className='bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        value={formData.descripcion}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-1 flex justify-end'>
                    <input
                        type="submit" value="Crear Evento"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                        onClick={() => enviarEvento()}
                    />
                </div>
            </section>
        </main>
    )
}

export default CrearEvento
