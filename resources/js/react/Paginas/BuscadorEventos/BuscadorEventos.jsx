import React, { useEffect, useState } from 'react';
import ModalEventos from '../../Components/ModalEventos';
import { getEventos } from '../../api/requests';
import { Link } from 'react-router-dom';
import concierto from '../../assets/concierto.jpg';
import eventodefecto from '../../assets/eventodefecto.jpg';
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";

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
                    <div key={evento.id} className="relative group overflow-hidden rounded-lg">
                        <Link className="absolute inset-0 z-10" href="#">
                            <span className="sr-only">View event</span>
                        </Link>
                        <img
                            alt= {evento.nombre}
                            className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                            height={400}
                            src={eventodefecto}
                            style={{
                                aspectRatio: "600/400",
                                objectFit: "cover",
                            }}
                            width={600}
                        />
                        <div className="bg-white p-4 dark:bg-gray-950">
                            <h3 className="font-semibold text-lg md:text-xl">{evento.nombre}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {evento.descripcion}
                            </p>
                            <div className="grid gap-2 pt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <FaCalendarAlt className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    <span>{evento.fecha}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <FaClock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    <span>{evento.hora}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CiLocationOn className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    <span>{evento.localizacion}, {evento.ciudad}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <BsPeople  className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    <span>Total: {evento.aforoTotal} | Disponible: {evento.aforoDisponible}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <RiPriceTag3Line  className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    <span>${evento.precio}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
        </main >
    );
};

export default BuscadorEventos;
