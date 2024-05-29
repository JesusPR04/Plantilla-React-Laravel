import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getGenrers, getCiudades } from '../api/requests';

Modal.setAppElement('#root');

const ModalEventos = ({ isOpen, closeModal, applyFilters }) => {
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(300);
    const [categoria, setCategoria] = useState('');
    const [aforoMin, setAforoMin] = useState(0);
    const [aforoMax, setAforoMax] = useState(100000);
    const [ciudad, setCiudad] = useState('');

    const [ciudades, setCiudades] = useState([]);
    const [genrers, setGenrers] = useState([]);

    useEffect(() => {
        let promesaCiudades = getCiudades();
        promesaCiudades.then((data) => setCiudades(data.ciudades));
        let promesaGeneros = getGenrers();
        promesaGeneros.then((data) => setGenrers(data.categorias));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters({
            fechaDesde,
            fechaHasta,
            precioMin,
            precioMax,
            categoria,
            aforoMin,
            aforoMax,
            ciudad,
        });
        closeModal();
    };

    const handlePrecioMinChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value <= precioMax) {
            setPrecioMin(value);
        }
    };

    const handlePrecioMaxChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= precioMin) {
            setPrecioMax(value);
        }
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            borderRadius: '0.375rem',
            maxWidth: '600px',
            width: '90%',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Filtrar eventos"
            style={customStyles}
        >
            <div className='flex flex-row justify-between'>
                <h1 
                    style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}
                    className='text-colorFuente'
                >
                    Busca tus <span className='text-blue-500'>eventos</span>
                </h1>
                <button
                    onClick={() => closeModal(true)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm
                     text-colorFuente rounded-lg hover:bg-[#eeedf2]
                      focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-search"
                    aria-expanded="false"
                >
                    <span className="sr-only">Close main menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 256 256"
                    >
                        <path
                            fill="#333333"
                            d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
                        />
                    </svg>
                </button>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className='sm:gap-4' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                        <label className="block text-sm font-medium text-colorFuente" htmlFor="start-date">
                            Fecha desde
                        </label>
                        <input
                            className="mt-1 block w-11/12 sm:w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="start-date"
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-colorFuente" htmlFor="end-date">
                            Fecha hasta
                        </label>
                        <input
                            className="mt-1 block w-11/12 sm:w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="end-date"
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                        <label className="block text-sm font-medium text-colorFuente" htmlFor="min-capacity">
                            Aforo mínimo {aforoMin}
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={aforoMin}
                            onChange={(e) => setAforoMin(e.target.value)}
                            id="min-capacity"
                            max="50000"
                            min="0"
                            step="10"
                            type="range"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-colorFuente" htmlFor="max-capacity">
                            Aforo máximo {aforoMax}
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={aforoMax}
                            onChange={(e) => setAforoMax(e.target.value)}
                            id="max-capacity"
                            max="50000"
                            min="0"
                            step="10"
                            type="range"
                        />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                        <label className="block text-sm font-medium text-colorFuente" htmlFor="min-price">
                            Precio mínimo {precioMin}
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={precioMin}
                            onChange={handlePrecioMinChange}
                            id="min-price"
                            max="1000"
                            min="0"
                            step="10"
                            type="range"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-colorFuente" htmlFor="max-price">
                            Precio máximo {precioMax}
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={precioMax}
                            onChange={handlePrecioMaxChange}
                            id="max-price"
                            max="1000"
                            min="0"
                            step="10"
                            type="range"
                        />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                        <label className="block text-sm font-medium text-colorFuente" htmlFor="city">
                            Ciudad
                        </label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="city"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                        >
                            <option value="">Selecciona una ciudad</option>
                            {ciudades.map((city) => (
                                <option key={city.id} value={city.id}>{city.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-colorFuente" htmlFor="genre">
                            Género
                        </label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border bg-gray-50 border-gray-300 
                            rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="genre"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">Selecciona un género</option>
                            {genrers.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={{ marginTop: '1rem' }} className='flex justify-end'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Buscar
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalEventos;
