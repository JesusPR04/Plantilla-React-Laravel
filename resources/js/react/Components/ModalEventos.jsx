import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getGenrers, getCiudades } from '../api/requests';

Modal.setAppElement('#root');

const ModalEventos = ({ isOpen, closeModal, applyFilters }) => {
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(200);
    const [categoria, setCategoria] = useState('');
    const [aforoMin, setAforoMin] = useState(0);
    const [aforoMax, setAforoMax] = useState(40000);
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

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Filtrar eventos"
            className="modal rounded-lg overflow-y-auto"
            overlayClassName="overlay fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
        >
            <section className="bg-white dark:bg-gray-950 py-8 md:py-8 lg:py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-950 dark:text-white mb-4">Busca tus eventos</h1>
                        <form className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                            htmlFor="start-date"
                                        >
                                            Fecha desde
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                id="start-date"
                                                type="date"
                                                value={fechaDesde}
                                                onChange={(e) => setFechaDesde(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="end-date">
                                            Fecha hasta
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                id="end-date"
                                                type="date"
                                                value={fechaHasta}
                                                onChange={(e) => setFechaHasta(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="min-capacity">
                                            Aforo mínimo {aforoMin}
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full h-1 bg-blue-500 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:scale-105 transition-transform"
                                                value={aforoMin}
                                                onChange={(e) => setAforoMin(e.target.value)}
                                                id="min-capacity"
                                                max="50000"
                                                min="0"
                                                step="10"
                                                type="range"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="max-capacity">
                                            Aforo máximo {aforoMax}
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="w-full h-1 bg-blue-500 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:scale-105 transition-transform"
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
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="min-price">
                                        Precio mínimo {precioMin}
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full h-1 bg-blue-500 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:scale-105 transition-transform"
                                            value={precioMin}
                                            onChange={handlePrecioMinChange}
                                            id="min-price"
                                            max="1000"
                                            min="0"
                                            step="10"
                                            type="range"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="max-price">
                                        Precio máximo {precioMax}
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full h-1 bg-blue-500 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:scale-105 transition-transform"
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
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="city">
                                        Ciudad
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="genre">
                                        Género
                                    </label>
                                    <div className="relative">
                                        <select
                                            className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md py-2 px-3 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            </div>
                            <div className="mt-6">
                                <button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg"
                                    type="submit"
                                >
                                    Buscar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Modal>
    );
};

export default ModalEventos;
