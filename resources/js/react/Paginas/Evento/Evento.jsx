import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getEventoById,
    fetchUserData,
    comprarEntrada,
} from "../../api/requests";
import eventodefecto from "../../assets/eventodefecto.png";

const BASE_URL = "http://localhost:";

const Evento = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [evento, setEvento] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1); // Para manejar la cantidad de entradas a comprar

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const data = await getEventoById(id);
                setEvento(data);
            } catch (error) {
                setError("Error fetching evento");
            } finally {
                setLoading(false);
            }
        };

        fetchEvento();
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("user-token"); // Asegúrate de tener el token almacenado en localStorage
            if (token) {
                try {
                    const userData = await fetchUserData(token);
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching user:", error.message);
                }
            }
        };

        fetchUser();
    }, []);

    const handleCompra = async () => {
        if (!user) {
            alert("Debes estar logueado para comprar entradas");
            return navigate('/login')
        }

        try {
            const data = await comprarEntrada({
                idUsuario: user.id,
                idEvento: id,
                cantidad,
            });
            alert("Compra realizada con éxito");
            navigate('/entradas')
        } catch (error) {
            console.error("Error comprando entrada:", error);
            alert("Error comprando entrada");
        }
    };

    if (loading) {
        return <div className='min-h-[calc(100vh-436px)] text-xl sm:text-4xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>Cargando...</div>;
    }

    if (error) {
        return <div className='min-h-[calc(100vh-436px)] text-xl sm:text-4xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>{error}</div>;
    }

    if (!evento) {
        return <div className='min-h-[calc(100vh-436px)] text-xl sm:text-4xl pt-12 font-bold tracking-tight text-colorFuente uppercase text-center'>No se encontró el evento</div>;
    }

    return (
        <section className="bg-gray-100 min-h-[calc(100vh-436px)] py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={
                                evento.ruta
                                    ? `${BASE_URL}${evento.ruta}`
                                    : eventodefecto
                            }
                            alt={evento.nombre}
                            className="w-full h-full object-cover mb-4"
                        />
                    </div>
                    <div className="space-y-6 border p-4 rounded shadow bg-gray-100">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-colorFuente uppercase">
                                {evento.nombre}
                            </h1>
                            <p className="text-colorFuente mt-2">
                                {/* Descripcion Corta */}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-medium text-colorFuente">
                                    Fecha
                                </h3>
                                <p className="text-colorFuente">
                                    {evento.fecha}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-colorFuente">
                                    Hora
                                </h3>
                                <p className="text-colorFuente">
                                    {evento.hora}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-colorFuente">
                                    Ubicación
                                </h3>
                                <p className="text-colorFuente">
                                    {evento.localizacion},{" "}
                                    {evento.ciudad.nombre}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-colorFuente">
                                    Aforo
                                </h3>
                                <p className="text-colorFuente">
                                    {evento.aforoTotal}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-colorFuente">
                                Descripción
                            </h3>
                            <p className="text-colorFuente">
                                {evento.descripcion}
                            </p>
                        </div>
                        <div className="flex flex-col xl:flex-row gap-4">
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                min="1"
                                className="bg-gray-50 border border-gray-300 text-colorFuente sm:text-sm rounded-lg
                                  focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                            />
                            <button
                                onClick={handleCompra}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Comprar Entradas
                            </button>
                            <button 
                                className="bg-[#93C5FD] hover:bg-[#A5B4FC] text-colorFuente 
                                font-bold py-2 px-4 rounded flex flex-row gap-3 justify-center xl:justify-start"
                            >
                                <span>Añadir a Favoritos</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-star cursor-pointer"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Evento;
