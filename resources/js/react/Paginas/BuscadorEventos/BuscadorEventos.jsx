import React, { useEffect, useState } from "react";
import ModalEventos from "../../Components/ModalEventos";
import { getEventos, fetchUserData } from "../../api/requests";
import { Link } from "react-router-dom";
import concierto from "../../assets/concierto.jpg";
import eventodefecto from "../../assets/eventodefecto.jpg";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";

const BASE_URL = "http://localhost:";

const BuscadorEventos = () => {
    const token = localStorage.getItem('user-token')
    const [user, setUser] = useState({})
    useEffect(() => {
        if (token) {
            fetchUserData().then(data => setUser(data))
        }
    }, [token])
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
            const response = await fetch(
                `http://localhost/api/getEventos?${queryString}`
            );
            const data = await response.json();
            setEventos(data);
        } catch (error) {
            console.error(error);
            setError("Error fetching eventos");
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
                setError("Error fetching eventos");
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    if (loading) {
        return <div className='min-h-[calc(100vh-436px)] text-xl sm:text-4xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>Cargando...</div>;
    }

    if (error) {
        return <div className='min-h-[calc(100vh-436px)] text-xl sm:text-4xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>{error}</div>;
    }

    return (
        <main className="min-h-[calc(100vh-436px)] bg-gray-100 text-center">
            <div className="flex sm:px-16">
                <button
                    className={`bg-blue-500 font-bold hover:bg-blue-700
                    text-white py-2 px-4 rounded m-5 justify-start`}
                    onClick={openModal}
                >
                    Aplica los filtros
                </button>
            </div>

            <ModalEventos
                isOpen={modalIsOpen}
                closeModal={closeModal}
                applyFilters={applyFilters}
            />
            <div className={`grid grid-cols-1 px-4 py-10 sm:px-20 pt-0 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                {eventos.map((evento) => (
                    <div
                        key={evento.id}
                        className="relative group overflow-hidden rounded-lg"
                    >
                        <Link
                            className="absolute inset-0 z-10"
                            to={`/evento/${evento.id}`}
                        >
                            <span className="sr-only">Ver evento</span>
                        </Link>
                        <div className="relative">
                            <img
                                alt={evento.nombre}
                                className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                                height={400}
                                src={eventodefecto}
                                style={{
                                    aspectRatio: "600/400",
                                    objectFit: "cover",
                                }}
                                width={600}
                            />
                            {user.id === evento.idOrganizador && (
                                <span className="absolute top-2 left-2 bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block z-20">
                                    Tu evento
                                </span>
                            )}
                        </div>
                        <div className="border p-4 rounded shadow bg-gray-100">
                            <h3
                                className="font-bold text-lg md:text-xl text-colorFuente 
                        uppercase transition-colors group-hover:text-blue-500 md:group-hover:text-2xl group-hover:text-xl"
                            >
                                {evento.nombre}
                            </h3>
                            <p className="text-sm text-colorFuente line-clamp-2">
                                {evento.descripcion}
                            </p>
                            <div className="grid gap-2 pt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <FaCalendarAlt className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">
                                        {evento.fecha}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <FaClock className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">
                                        {evento.hora}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CiLocationOn className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">
                                        {evento.localizacion},{" "}
                                        {evento.ciudad.nombre}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <BsPeople className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">
                                        Total: {evento.aforoTotal} | Disponible:{" "}
                                        {evento.aforoDisponible}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <RiPriceTag3Line className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">
                                        {evento.precio} €
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default BuscadorEventos;
