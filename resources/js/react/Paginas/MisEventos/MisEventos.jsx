import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eventodefecto from "../../assets/eventodefecto.png";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";
import { comprobarAccesoEventos, eliminarEvento, getMisEventos } from "../../api/requests";
import img from '../../assets/misEventos.jpg';
import { fetchUserData } from "../../api/requests";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MisEventos = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('user-token');
    const [eventos, setEventos] = useState([])
    const [permiso, setPermiso] = useState(false)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            fetchUserData().then(data => setUser(data)).catch(console.error);
        }
    }, [token]);

    useEffect(() => {    
        comprobarAccesoEventos()
        .then((respuesta) => {
            if (!respuesta.status) {
                toast.error(respuesta.message)
                setTimeout(() => {navigate('/')}, 2000)
            }else{
                setPermiso(true)
            }
        })
        .catch(error => {
            toast.error(error.message)
            setTimeout(() => {navigate('/')}, 2000)
        })
    }, [])

    useEffect(() => {
        getMisEventos()
        .then((respuesta) => {
            setEventos(respuesta)
            setLoading(false)
        })
    }, [permiso])

    const borrarEvento = (id) => {
        eliminarEvento(id)
        .then(respuesta => comprobarRespuesta(respuesta))
        .catch(error => toast.error(error))
    }
    const comprobarRespuesta = (respuesta) =>{
        if (respuesta.status) {
            toast.success(respuesta.message)
            setTimeout(()=> {navigate(0)}, 2000)
        }else{
            toast.error(respuesta.message)
        }
    }
    if (loading && !permiso) {
        return (
            <div className="min-h-[calc(100vh-436px)] text-center mt-10 text-colorFuente text-xl sm:text-4xl font-bold uppercase">
                Cargando...
            </div>
        )
    }

    if (eventos.length === 0 && permiso) {
        return (
            <div className="text-center p-10 min-h-[calc(100vh-436px)]">
                <ToastContainer />
                <p className="text-3xl sm:text-4xl pt-3 font-bold tracking-tight text-colorFuente uppercase">
                    PROMOCIONA TU {" "}
                    <span className="text-blue-500 uppercase">EVENTO</span>
                </p>
                <p className="px-14 sm:px-0 pb-2 pt-6 font-semibold text-colorFuente text-center">
                    No esperes más y da a conocer tus <span className="text-blue-500 uppercase font-bold">EVENTOS</span>
                </p>
                <p className="px-14 sm:px-0 pb-2 pt-2 font-semibold text-colorFuente text-center">
                    Si tienes algún problema no dudes en{" "}
                    <Link to='/ayuda' className="text-blue-500 hover:underline cursor-pointer font-bold">
                        contactar
                    </Link> con nosotros
                </p>
                <div className="flex justify-center pt-6">
                    <img
                        src={img}
                        alt="Promociona tu evento"
                        className="mb-4 rounded-lg shadow-lg w-96 h-52"
                    />
                </div>
                <div className="flex justify-center items-center pt-6">
                    <Link
                        to='/crearEvento'
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Promociona tu Evento
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <section className="bg-gray-100 min-h-[calc(100vh-436px)] py-12">
            <ToastContainer />
            <h1 className="text-3xl md:text-4xl font-bold text-colorFuente mb-6 text-center uppercase">
                    Tus <span className="text-blue-500">eventos</span>
            </h1>
            <div className="grid grid-cols-1 px-4 py-10 sm:px-20 pt-0 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventos.map((evento) => (
                    <div key={evento.id} className="relative group overflow-hidden rounded-lg shadow bg-gray-100">
                        <Link className="absolute inset-0 z-1" to={`/evento/${evento.id}`}>
                            <span className="sr-only">Ver evento</span>
                        </Link>
                        <div className="relative">
                            <img
                                className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                                src={evento.imagenes.length !== 0 ? `../../../../../public/${evento.imagenes[0].ruta}` : eventodefecto}
                                style={{ aspectRatio: "600/400", objectFit: "cover" }}
                                width={600}
                                height={400}
                            />
                            {user && user.id === evento.idOrganizador && (
                                <span className="absolute top-2 left-2 bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block z-20">
                                    Tu evento
                                </span>
                            )}
                        </div>
                        <div className="p-4">
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
                                    <span className="text-colorFuente font-semibold">{evento.localizacion}, {evento.ciudad.nombre}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <BsPeople className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">Total: {evento.aforoTotal} | Disponible: {evento.aforoDisponible}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <RiPriceTag3Line className="w-4 h-4 text-blue-500" />
                                    <span className="text-colorFuente font-semibold">{evento.precio} €</span>
                                </div>
                                {user && user.id === evento.idOrganizador && (
                                    <div className="flex justify-end items-center gap-2">
                                        <button onClick={() => navigate('/editarEvento', { state: { evento } })}  
                                        className=" bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full inline-block z-20 cursor-pointer">
                                            Editar
                                        </button>
                                        <button onClick={()=> borrarEvento(evento.id)} 
                                        className=" bg-red-500 text-white font-semibold px-2 py-1
                                        text-xs rounded-full inline-block z-20 cursor-pointer hover:scale-105 duration-100">
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MisEventos;
