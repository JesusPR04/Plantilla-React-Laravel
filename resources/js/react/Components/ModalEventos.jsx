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
            padding: '2rem',
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
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Busca tus <span style={{ color: '#1e40af' }}>eventos</span>
            </h1>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="start-date">
                            Fecha desde
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #e2e8f0',
                                backgroundColor: '#f7fafc',
                                fontSize: '0.875rem',
                            }}
                            id="start-date"
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="end-date">
                            Fecha hasta
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #e2e8f0',
                                backgroundColor: '#f7fafc',
                                fontSize: '0.875rem',
                            }}
                            id="end-date"
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="min-capacity">
                            Aforo mínimo {aforoMin}
                        </label>
                        <input
                            style={{ width: '100%' }}
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
                        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="max-capacity">
                            Aforo máximo {aforoMax}
                        </label>
                        <input
                            style={{ width: '100%' }}
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
                        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="min-price">
                            Precio mínimo {precioMin}
                        </label>
                        <input
                            style={{ width: '100%' }}
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
                        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="max-price">
                            Precio máximo {precioMax}
                        </label>
                        <input
                            style={{ width: '100%' }}
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
                        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="city">
                            Ciudad
                        </label>
                        <select
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #e2e8f0',
                                backgroundColor: '#f7fafc',
                                fontSize: '0.875rem',
                            }}
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
                        <label style={{ display: 'block', marginBottom: '0.5rem' }} htmlFor="genre">
                            Género
                        </label>
                        <select
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #e2e8f0',
                                backgroundColor: '#f7fafc',
                                fontSize: '0.875rem',
                            }}
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
                <div style={{ marginTop: '1rem' }}>
                    <button
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '0.375rem',
                            backgroundColor: '#1e40af',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 'medium',
                            border: 'none',
                            cursor: 'pointer',
                        }}
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
