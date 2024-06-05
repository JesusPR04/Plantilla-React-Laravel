import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { getCiudades, getGenrers } from '../../api/requests';

function EditarEvento() {
    const location = useLocation()
    const [evento, setEvento] = useState({})
    const [ciudades, setCiudades] = useState([]);
    const [genrers, setGenrers] = useState([]);
    const [eventGenrer, setEventGenrer] = useState({});
    const [eventCity, setEventCity] = useState({});
    const cambiarCiudad = (selectedOption) => {
        setEvento({
            ...evento,
            ciudad: {
                id: selectedOption.value,
                nombre: selectedOption.label
            }
        });
        setEventCity(selectedOption);
    };
    const cambiarCategoria = (selectedOption) => {
        setEvento({
            ...evento,
            categoria: {
                id: selectedOption.value,
                nombre: selectedOption.label
            }
        });
        setEventGenrer(selectedOption);
    };
    const handleChange = (e) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value
        });
    };

    // Para establecer en los select los datos del evento y obtener todas las ciudades y categorias
    useEffect(() => {
        if (location.state && location.state.evento) {
            setEvento(location.state.evento);
            setEventCity({
                value: location.state.evento.ciudad.id,
                label: location.state.evento.ciudad.nombre
            })
            setEventGenrer({
                value: location.state.evento.categoria.id,
                label: location.state.evento.categoria.nombre
            })
        }
        getCiudades().then((data) => setCiudades(data.ciudades));
        getGenrers().then((data) => setGenrers(data.categorias));
    }, []);

    const [imagenes, setImagenes] = useState([]);
    const [imagenesEliminadas, setImagenesEliminadas] = useState([]);

    return (
        <main className='bg-gray-100 min-h-[calc(100vh-436px)] py-12'>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-colorFuente uppercase text-center">
                Edita tu
                <span className='text-blue-500 uppercase'> evento</span>
            </h2>
            <h2 className='px-14 sm:px-0 pb-2 pt-6 font-semibold text-colorFuente text-center'>
                ¡ <span className='text-blue-500'>Importante</span> todos los campos son <span
                    className="bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block"
                > Requeridos</span> !
            </h2>
            <section className='pb-12 px-14 sm:px-0 space-y-4 md:space-y-6 mx-auto max-w-xl md:max-w-3xl grid grid-cols-3 gap-x-8 justify-start items-end'>
                <div className="w-full col-span-3 sm:col-span-1">
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
                        //style={{ borderColor: nombre.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Nombre del evento"
                        value={evento.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-3 sm:col-span-1">
                    <label
                        htmlFor="hora"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Hora
                    </label>
                    <input
                        type="time"
                        name="hora"
                        id="hora"
                        //style={{ borderColor: hora.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Hora del evento"
                        value={evento.hora}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-3 sm:col-span-1">
                    <label
                        htmlFor="fecha"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Fecha
                    </label>
                    <input
                        //style={{ borderColor: fecha.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        id="fecha"
                        name='fecha'
                        type="date"
                        value={evento.fecha}
                    onChange={handleChange}
                    />
                </div>
                <div className="w-full col-span-3 sm:col-span-1">
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
                        //style={{ borderColor: localizacion.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Localización del evento"
                        value={evento.localizacion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-3 sm:col-span-1">
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
                        value={eventCity}
                        onChange={cambiarCiudad}
                        classNames={{
                            control: () => `!text-sm !bg-gray-50 !border  !text-colorFuente 
                                    !sm:text-sm !rounded-lg !focus:ring-blue-500 
                                    !focus:border-blue-500 !w-full !p-0.5 
                                    ${/* ciudad1.estado ? "!border-red-500" : */"!border-gray-300"}`,
                            input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                            menuList: () => '!bg-gray-50'
                        }}
                    />
                </div>
                <div className="w-full col-span-3 sm:col-span-1">
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
                        value={eventGenrer}
                        onChange={cambiarCategoria}
                        classNames={{
                            control: () => `!text-sm !bg-gray-50 !border  !text-colorFuente 
                                    !sm:text-sm !rounded-lg !focus:ring-blue-500 
                                    !focus:border-blue-500 !w-full !p-0.5 
                                    ${/* categoria.estado ? "!border-red-500" :*/ "!border-gray-300"}`,
                            input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                            menuList: () => '!bg-gray-50'
                        }}
                    />
                </div>
                <div className='w-full col-span-3 sm:col-span-1'>
                    <label className="block text-sm font-medium text-colorFuente" htmlFor="aforoTotal">
                        Aforo Total {evento.aforoTotal}
                    </label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                        rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={evento.aforoTotal}
                        onChange={handleChange}
                        id="aforoTotal"
                        name='aforoTotal'
                        max="50000"
                        min="0"
                        step="10"
                        type="range"
                    />
                </div>
                <div className='w-full col-span-3 sm:col-span-1'>
                    <label className="block text-sm font-medium text-colorFuente" htmlFor="aforoDisponible">
                        Aforo Disponible {evento.aforoDisponible}
                    </label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                        rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={evento.aforoDisponible}
                        onChange={handleChange}
                        id="aforoDisponible"
                        name='aforoDisponible'
                        max="50000"
                        min="0"
                        step="10"
                        type="range"
                    />
                </div>
                <div className="w-full col-span-3 sm:col-span-1">
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
                        min={0}
                        //style={{ borderColor: precio.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Precio del evento"
                        value={evento.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="w-full col-span-3 flex flex-wrap justify-center sm:justify-between gap-y-1">
                    {evento.imagenes && evento.imagenes.map((imagen, index) => (
                        <div key={index} className='relative'>
                            <img className='w-60 h-44 rounded-lg' src={`../../../../../public/${imagen.ruta}`} alt={`Imagen ${index}`} />
                            <span className="absolute top-2 left-2 bg-blue-500 text-white font-semibold text-xs rounded-full inline-block z-1 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                            </span>
                        </div>
                    ))}
                </div>
                <div className="w-full col-span-3">
                    <label
                        htmlFor="imagenes"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Imágenes <span className='text-red-500 font-bold'>*</span>
                    </label>
                    <input
                        type="file"
                        name="imagenes"
                        id="imagenes"
                        accept="image/png, image/jpeg, image/jpg"
                        //style={{ borderColor: nombre.estado ? 'red' : '#D3D3D3' }}
                        className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full"
                        //onChange={handleFileChange}
                        multiple
                        required
                    />
                </div>
                <div className="w-full col-span-3">
                    <label
                        htmlFor="descripcion"
                        className="block mb-2 text-sm font-medium text-colorFuente"
                    >
                        Descripción
                    </label>
                    <textarea
                        name='descripcion' id='descripcion' cols={50} rows={5}
                        //style={{ borderColor: nombre.estado ? 'red' : '#D3D3D3' }}
                        placeholder='Aporte información esenciál para su evento...'
                        className='bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        value={evento.descripcion}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-span-3 sm:col-span-2'>
                    <p className='font-semibold'><span className='text-red-500 font-bold'>*</span> La primera foto será la elegida como portada</p>
                </div>
                <div className='col-end-4 sm:col-span-1 flex justify-end'>
                    <input
                        type="submit" value="Editar Evento"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    //onClick={() => enviarEvento()}
                    />
                </div>
            </section>
        </main>
    )
}

export default EditarEvento