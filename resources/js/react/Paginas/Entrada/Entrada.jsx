// src/components/Entradas.jsx
import React, { useEffect, useState } from "react";
import { cancelarEntrada, getEntradas } from "../../api/requests";
import eventodefecto from "../../assets/eventodefecto.png";

const BASE_URL = "http://localhost:";

const Entrada = () => {
    const [entradas, setEntradas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchEntradas();
    }, []);

    const cancelar = (id) =>{
        cancelarEntrada(id)
        .then(respuesta => console.log(respuesta))
        .catch(error => console.log(error))

    }
    if (loading) {
        return (
            <div className="min-h-[calc(100vh-436px)] text-center mt-10 text-colorFuente text-2xl font-bold">
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
            <div className="min-h-[calc(100vh-436px)] text-center mt-10 text-colorFuente text-2xl font-bold">
                No tienes entradas
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
                                        entrada.evento.ruta
                                            ? `${BASE_URL}${entrada.evento.ruta}`
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
        </section>
    );
};

export default Entrada;
