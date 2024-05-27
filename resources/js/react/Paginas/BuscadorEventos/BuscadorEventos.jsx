import React, { useEffect, useState } from 'react';
import ModalEventos from '../../Components/ModalEventos';
import { getEventos } from '../../api/requests';
import { Link } from 'react-router-dom';
import concierto from '../../assets/concierto.jpg';
import eventodefecto from '../../assets/eventodefecto.jpg';

const BASE_URL = 'http://localhost:';

const BuscadorEventos = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const applyFilters = async (filters) => {
        console.log(filters);
        try {
            const queryString = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost/api/getEventos?${queryString}`);
            const data = await response.json();
            setEventos(data);
        } catch (error) {
            console.error(error);
            setError('Error fetching eventos');
        }
    };

    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const data = await getEventos();
                setEventos(data);
            } catch (error) {
                setError('Error fetching eventos');
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className='min-h-[calc(100vh-436px)] bg-gray-100 text-center'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-5' onClick={openModal}>Aplica los filtros</button>
            <ModalEventos
                isOpen={modalIsOpen}
                closeModal={closeModal}
                applyFilters={applyFilters}
            />
            <div className="grid grid-cols-1 p-20 pt-0 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventos.map((evento) => (
                    <div key={evento.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <Link to={`/evento/${evento.id}`}>
                            <img className="w-full h-64 object-cover object-center" src={evento.ruta ? `${BASE_URL}${evento.ruta}` : eventodefecto} alt={evento.nombre} />
                        </Link>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{evento.nombre}</h2>
                            <p className="text-gray-700">{evento.descripcion}</p>
                            <p className="mt-2">Fecha: {evento.fecha}</p>
                            <p>Hora: {evento.hora}</p>
                            <p>Localización: {evento.localizacion}</p>
                            <p>Aforo Total: {evento.aforoTotal}</p>
                            <p>Aforo Disponible: {evento.aforoDisponible}</p>
                            <p>Precio: {evento.precio}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default BuscadorEventos;
