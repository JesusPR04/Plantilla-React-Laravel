import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import eventodefecto from "../../assets/eventodefecto.png";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { BsPeople } from "react-icons/bs";
import { RiPriceTag3Line } from "react-icons/ri";
import { getMisEventos } from '../../api/requests'

const MisEventos = () => {
    const [eventos, setEventos] = useState([])

    useEffect(() => {
        getMisEventos()
            .then(respuesta => {
                setEventos(respuesta)
                console.log(respuesta)
            })

    }, [])
    return (
        <section className="bg-gray-100 min-h-[calc(100vh-436px)] py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 px-4 py-10 sm:px-20 pt-0 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventos.length === 0 ?
                    (
                        <div>Cargando...</div>
                    )
                    :
                    (
                        <div>
                            {eventos.map((evento) => (
                                <div key={evento.id} className="relative group overflow-hidden rounded-lg">
                                    <Link className="absolute inset-0 z-10" to={`/evento/${evento.id}`}>
                                        <span className="sr-only">Ver evento</span>
                                    </Link>
                                    <div className="relative">
                                        <img
                                            className="object-cover w-full h-60 group-hover:scale-105 transition-transform"
                                            src={evento.imagen || eventodefecto}
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
                    )
                }
            </div>
        </section>
    )
}

export default MisEventos