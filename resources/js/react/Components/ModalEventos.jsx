import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const ModalEventos = ({ isOpen, closeModal, applyFilters }) => {
    const [ciudad, setCiudad] = useState('');
    const [fechaDesde, setFechaDesde] = useState(null);
    const [fechaHasta, setFechaHasta] = useState(null);
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(200);
    const [categoria, setCategoria] = useState('');
    const [aforoMin, setAforoMin] = useState(0);
    const [aforoMax, setAforoMax] = useState(40000);

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters({ ciudad, fechaDesde, fechaHasta, precioMin, precioMax, categoria, aforoMin, aforoMax });
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Filtrar eventos"
            className="modal rounded-lg overflow-hidden"
            overlayClassName="overlay fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
        >
            <div className="modal-content bg-white p-8 w-96">
                <h2 className="text-2xl font-bold mb-4">Filtrar Eventos</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="ciudad" className="block text-sm font-medium mb-1">Ciudad:</label>
                        <select
                            id="ciudad"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Seleccionar Ciudad</option>
                            <option value="ciudad1">Ciudad 1</option>
                            <option value="ciudad2">Ciudad 2</option>
                            <option value="ciudad3">Ciudad 3</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaDesde" className="block text-sm font-medium mb-1">Fecha Desde:</label>
                        <DatePicker
                            id="fechaDesde"
                            selected={fechaDesde}
                            onChange={date => setFechaDesde(date)}
                            className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fechaHasta" className="block text-sm font-medium mb-1">Fecha Hasta:</label>
                        <DatePicker
                            id="fechaHasta"
                            selected={fechaHasta}
                            onChange={date => setFechaHasta(date)}
                            className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
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
                        <label htmlFor="categoria" className="block text-sm font-medium mb-1">Categoría:</label>
                        <select
                            id="categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="input w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                        >
                            <option value="">Seleccionar Categoría</option>
                            <option value="categoria1">Categoría 1</option>
                            <option value="categoria2">Categoría 2</option>
                            <option value="categoria3">Categoría 3</option>
                        </select>
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
