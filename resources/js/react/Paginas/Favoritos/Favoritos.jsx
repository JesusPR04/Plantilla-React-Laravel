import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import eventodefecto from "../../assets/eventodefecto.png";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";
import { fetchUserData, getMisFavoritos } from '../../api/requests';

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [ciudad, setCiudad] = useState(0)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMisFavoritos()
            .then(respuesta => {
                setFavoritos(respuesta.favoritos);
                setLoading(false); // Cambia el estado de carga a falso cuando se completa la obtención de los favoritos
            })
            .catch(error => {
                console.error("Error obteniendo favoritos:", error);
                setLoading(false); // Cambia el estado de carga a falso en caso de error
            });
    }, []);

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
    // Muestra un indicador de carga si loading es verdadero
    if (loading) {
        return <div className='min-h-[calc(100vh-436px)] text-xl sm:text-4xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>Cargando...</div>;
    }

    // Si no hay eventos favoritos, muestra un mensaje indicando que no hay favoritos
    if (favoritos.length === 0) {
        return <div className='bg-gray-100 text-center min-h-[calc(100vh-436px)] py-12'>
            <p className='text-3xl sm:text-4xl font-bold tracking-tight text-colorFuente uppercase'>
                NO TIENE <span className='text-blue-500 uppercase'>EVENTOS FAVORITOS</span>
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
                                    className="object-cover w-full h-60 group-hover:scale-105 duration-100 transition-transform"
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
        </div>;
    }

    // Si hay eventos favoritos, muestra la lista de eventos
    return (
        <section className="bg-gray-100 text-center min-h-[calc(100vh-436px)] py-12">
            <p className='text-3xl sm:text-4xl pt-3 font-bold tracking-tight text-colorFuente uppercase'>
                TUS EVENTOS <span className='text-blue-500 uppercase'>FAVORITOS</span>
            </p>
            <p className='px-14 sm:px-0 pt-6 pb-6 font-semibold text-colorFuente text-center'>
                ¡ Aquí podrás encontrar todos tus eventos favoritos cuando quieras !
            </p>
            <div className="grid grid-cols-1 px-4 py-10 sm:px-20 pt-0 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritos.map((evento) => (
                    <div key={evento.id} className="relative group overflow-hidden rounded-lg">
                        <Link className="absolute inset-0 z-10" to={`/evento/${evento.id}`}>
                            <span className="sr-only">Ver evento</span>
                        </Link>
                        <div className="relative">
                            <img
                                className="object-cover w-full h-60 group-hover:scale-105 transition-transform duration-100"
                                src={evento.imagenes.length !== 0 ? `../../../../../public/${evento.imagenes[0].ruta}` : eventodefecto}
                                style={{ aspectRatio: "600/400", objectFit: "cover" }}
                                width={600}
                                height={400}
                            />
                        </div>
                        <div className="border p-4 rounded shadow bg-gray-100">
                            <h3 className="font-bold text-lg md:text-xl text-colorFuente uppercase transition-colors group-hover:text-blue-500 md:group-hover:text-2xl group-hover:text-xl">
                                {evento.nombre}
                            </h3>
                            <p className="text-sm text-colorFuente line-clamp-2">
                                {evento.descripcion}
                            </p>
                            <div className="grid gap-2 pt-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <FaCalendarAlt className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">{evento.fecha}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <FaClock className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">{evento.hora}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <CiLocationOn className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">{evento.localizacion}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <BsPeople className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">Total: {evento.aforoTotal} | Disponible: {evento.aforoDisponible}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <RiPriceTag3Line className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">{evento.precio} €</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Favoritos;
