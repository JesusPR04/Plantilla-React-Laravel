import React, { useState, useEffect } from 'react'
import { getCiudades, getGenrers } from '../../api/requests';
import Select from 'react-select'

function CrearEvento() {
    const [ciudades, setCiudades] = useState([]);
    const [genrers, setGenrers] = useState([]);
    useEffect(() => {
        let promesa = getCiudades();
        promesa.then((data) => setCiudades(data.ciudades));
        let promesaGeneros = getGenrers();
        promesaGeneros.then((data) => setGenrers(data.categorias));
    }, []);

    return (
        <main className='min-h-[calc(100vh-436px)] bg-gray-100'>
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
                        // onChange={(e) => cambiarNombre(e)}
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
                        // onChange={(e) => cambiarNombre(e)}
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
                        type="date"
                    //value={fechaDesde}
                    //onChange={(e) => setFechaDesde(e.target.value)}
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
                        // onChange={(e) => cambiarNombre(e)}
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
                        onChange={(e) => {
                            cambiarCiudad(e.label);
                        }}
                        placeholder="Ciudad"
                        isSearchable
                        noOptionsMessage={() => "Sin resultados"}
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
                        /* onChange={(e) => {
                            cambiarCiudad(e.label);
                        }} */
                        placeholder="Categoría"
                        isSearchable
                        noOptionsMessage={() => "Sin resultados"}
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
                        Aforo Total
                    </label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        //value={aforoMin}
                        //onChange={(e) => setAforoMin(e.target.value)}
                        id="aforoTotal"
                        max="50000"
                        min="0"
                        step="10"
                        type="range"
                    />
                </div>
                <div className='w-full col-span-2 sm:col-span-1'>
                    <label className="block text-sm font-medium text-colorFuente" htmlFor="aforoDisponible">
                        Aforo Disponible
                    </label>
                    <input
                        className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        //value={aforoMin}
                        //onChange={(e) => setAforoMin(e.target.value)}
                        id="aforoDisponible"
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
                        // onChange={(e) => cambiarNombre(e)}
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
                        // onChange={(e) => documento(e)}
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
                        onChange={(e) => cambiarComentarios(e)}
                        className='bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    />
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-1 flex justify-end'>
                    <input
                        type="submit" value="Crear Evento"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    // onClick={() => enviarPeticion()} 
                    />
                </div>
            </section>
        </main>
    )
}

export default CrearEvento