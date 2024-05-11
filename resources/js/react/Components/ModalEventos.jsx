import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from "react-select";
import { getGenrers, getCiudades } from '../api/requests';

Modal.setAppElement('#root');

const ModalEventos = ({ isOpen, closeModal, applyFilters }) => {
    const [fechaDesde, setFechaDesde] = useState(null);
    const [fechaHasta, setFechaHasta] = useState(null);
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(200);
    const [categoria, setCategoria] = useState('');
    const [aforoMin, setAforoMin] = useState(0);
    const [aforoMax, setAforoMax] = useState(40000);

    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters({ ciudades, fechaDesde, fechaHasta, precioMin, precioMax, categoria, aforoMin, aforoMax });
        closeModal();
    };

    const [ciudades, setCiudades] = useState([]);
    const [genrers, setGenrers] = useState([]);
    useEffect(() => {
        let promesaCiudades = getCiudades();
        promesaCiudades.then((data) => setCiudades(data.ciudades));
        let promesaGeneros = getGenrers();
        promesaGeneros.then((data) => setGenrers(data.categorias));
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Filtrar eventos"
            className="modal rounded-lg overflow-y-auto"
            overlayClassName="overlay fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
        >
            <div className="modal-content text-colorFuente bg-white p-8 w-96">
                <h2 className="text-2xl font-bold mb-4">Filtrar Eventos</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <Select
                        options={ciudades.map((ciudad) => ({
                            value: ciudad.id,
                            label: ciudad.nombre,
                        }))}
                        placeholder="Ciudad"
                        isSearchable
                        noOptionsMessage={() => "Sin resultados"}
                        classNames={{
                            control: () =>  "!text-sm !bg-gray-50 !border !border-gray-300 !text-colorFuente !sm:text-sm !rounded-lg !focus:ring-blue-500 !focus:border-blue-500 !w-full !p-0.5",
                            input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                            menuList: () => '!bg-gray-50'
                        }}
                    />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaDesde" className="block text-sm font-medium mb-1">Fecha Desde:</label>
                        <DatePicker
                            id="fechaDesde"
                            selected={fechaDesde}
                            onChange={date => setFechaDesde(date)}
                            wrapperClassName="w-full"
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaHasta" className="block text-sm font-medium mb-1">Fecha Hasta:</label>
                        <DatePicker
                            id="fechaHasta"
                            selected={fechaHasta}
                            onChange={date => setFechaHasta(date)}
                            wrapperClassName="w-full"
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="precioMin" className="block text-sm font-medium mb-1">Precio Mínimo: {precioMin} €</label>
                        <input
                            id="precioMin"
                            type="range"
                            min="0"
                            max={precioMax}
                            value={precioMin}
                            onChange={(e) => setPrecioMin(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="precioMax" className="block text-sm font-medium mb-1">Precio Máximo: {precioMax} €</label>
                        <input
                            id="precioMax"
                            type="range"
                            min={precioMin}
                            max="200"
                            value={precioMax}
                            onChange={(e) => setPrecioMax(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <Select
                            options={genrers.map((genrer) => ({
                                value: genrer.id,
                                label: genrer.nombre,
                            }))}
                            placeholder="Géneros"
                            isSearchable
                            noOptionsMessage={() => "Sin resultados"}
                            classNames={{
                                control: () => "!text-sm !bg-gray-50 !border !border-gray-300 !text-colorFuente !sm:text-sm !rounded-lg !focus:ring-blue-500 !focus:border-blue-500 !w-full !p-0.5",
                                input: (state) => state.isFocused ? "!ring-0 !shadow-none" : "",
                                menuList: () => '!bg-gray-50'
                            }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="aforoMin" className="block text-sm font-medium mb-1">Aforo Mínimo: {aforoMin}</label>
                        <input
                            id="aforoMin"
                            type="range"
                            min="0"
                            max={aforoMax}
                            value={aforoMin}
                            onChange={(e) => setAforoMin(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="aforoMax" className="block text-sm font-medium mb-1">Aforo Máximo: {aforoMax}</label>
                        <input
                            id="aforoMax"
                            type="range"
                            min={aforoMin}
                            max="40000"
                            value={aforoMax}
                            onChange={(e) => setAforoMax(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <button type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md">Aplicar filtros</button>
                </form>
            </div>
        </Modal>
    );
};

export default ModalEventos;