// src/components/Entradas.jsx
import React, { useEffect, useState } from "react";
import { cancelarEntrada, getEntradas } from "../../api/requests";
import eventodefecto from "../../assets/eventodefecto.png";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../api/requests";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";

const BASE_URL = "http://localhost:";

const Entrada = () => {
    const [entradas, setEntradas] = useState([])
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [ciudad, setCiudad] = useState(0)
    const navigate = useNavigate()

    const fetchEntradas = async () => {
        const token = localStorage.getItem("user-token"); // Asegúrate de tener el token almacenado en localStorage
        if (token) {
            try {
                const data = await getEntradas(token);
                setEntradas(data);
            } catch (error) {
                setError("Error fetching entradas");
            } finally {
                setLoading(false);
            }
        } else {
            setError("Usuario no autenticado");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntradas();
    }, []);

    const cancelar = (id) => {
        cancelarEntrada(id)
            .then((respuesta) => {
                // Eliminar la entrada del estado de entradas
                setEntradas(prevEntradas => prevEntradas.filter(entrada => entrada.id !== id));
                toast.success(respuesta.message);
                navigate(0)
            })
            .catch((error) => {
                console.log(error);
                toast.error('Error al cancelar la entrada');
            });
    };

    useEffect(() => {
        fetchUserData()
            .then(respuesta => setCiudad(respuesta.ciudad_id))
            .catch(error => console.log(error))

        const fetchEventos = async () => {
            try {
                const response = await fetch(
                    `http://localhost/api/getEventos?ciudad=` +
                    ciudad +
                    ""
                );
                const data = await response.json();
                setEventos(data);
            } catch (error) {
                setError("Error fetching eventos");
            }
        };

        fetchEventos();
    }, [ciudad]);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-436px)] text-center mt-10 text-colorFuente text-xl sm:text-4xl font-bold uppercase">
                Cargando...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-436px)] text-center mt-10 text-red-500 text-2xl font-bold">
                {error}
            </div>
        );
    }

    if (entradas.length === 0) {
        return (
            <div className='bg-gray-100 text-center min-h-[calc(100vh-436px)] py-12'>
                <p className='text-3xl sm:text-4xl font-bold tracking-tight text-colorFuente uppercase'>
                    NO TIENE <span className='text-blue-500 uppercase'>ENTRADAS</span>
                </p>
                <p className='px-14 sm:px-0 pt-6 pb-2 font-semibold text-colorFuente text-center'>
                    Para solucionar esto le dejamos una serie de eventos que pueden interesarle
                </p>
                <article className="pb-14" id="eventosTuCiudad">
                    <div
                        className={`grid grid-cols-1 px-4 pt-6 sm:px-20 md:grid-cols-2 lg:grid-cols-3 gap-6`}
                    >
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
                                        src={evento.imagenes.length !== 0 ? `../../../../../public/${evento.imagenes[0].ruta}` : eventodefecto}
                                        style={{
                                            aspectRatio: "600/400",
                                            objectFit: "cover",
                                        }}
                                        width={600}
                                    />
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
                                                Total: {evento.aforoTotal} |
                                                Disponible:{" "}
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
                    <div className="flex justify-center pt-10">
                        <Link
                            to="/buscadoreventos"
                            className="bg-blue-500 font-bold hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Más eventos ...
                        </Link>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <section className="bg-gray-100 py-12 md:py-16 lg:py-20 min-h-[calc(100vh-436px)]">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-colorFuente mb-6 text-center uppercase">
                    Tus <span className="text-blue-500">Entradas</span>
                </h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {entradas.map((entrada) => (
                        <div
                            key={entrada.id}
                            className="border p-4 rounded shadow text-colorFuente bg-gray-100"
                        >
                            <div className="mb-4">
                                <img
                                    src={
                                        entrada.evento.imagenes.length !== 0 ? 
                                            `../../../../../public/${entrada.evento.imagenes[0].ruta}` 
                                            : eventodefecto
                                    }
                                    alt={entrada.evento.nombre}
                                    className="w-full h-48 object-cover rounded"
                                />
                            </div>
                            <h2 className="text-xl font-bold mb-2 uppercase">
                                {entrada.evento.nombre}
                            </h2>
                            <div className="grid grid-cols-2 xl:gap-x-4">
                                <div className="col-span-2 xl:col-span-1 flex justify-between">
                                    <span className="text-blue-500 font-bold">
                                        Fecha
                                    </span>
                                    <span>{entrada.evento.fecha}</span>
                                </div>
                                <div className="col-span-2 xl:col-span-1 flex justify-between">
                                    <span className="text-blue-500 font-bold">
                                        Hora
                                    </span>
                                    <span>{entrada.evento.hora}</span>
                                </div>
                                <div className="col-span-2 xl:col-span-1 flex justify-between">
                                    <span className="text-blue-500 font-bold">
                                        Ubicación
                                    </span>
                                    <span>{entrada.evento.localizacion}</span>
                                </div>
                                <div className="col-span-2 xl:col-span-1 flex justify-between">
                                    <span className="text-blue-500 font-bold">
                                        Cantidad
                                    </span>
                                    <span>{entrada.cantidad}</span>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-red-500 hover hover:bg-red-700 text-white 
                                    font-bold py-2 px-4 rounded mt-4 flex gap-3"
                                    onClick={() => cancelar(entrada.idEvento)}
                                >
                                    Cancelar
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-trash-2"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" x2="10" y1="11" y2="17" />
                                        <line x1="14" x2="14" y1="11" y2="17" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Entrada;
